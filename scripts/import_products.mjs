import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

// Parse .env.local for credentials
function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf-8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx > 0) {
        const key = trimmed.slice(0, idx).trim();
        let val = trimmed.slice(idx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        process.env[key] = val;
      }
    }
  }
}

loadEnv();

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'am64tc6i';
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const TOKEN = process.env.SANITY_API_TOKEN || process.env.SANITY_WRITE_TOKEN;

function cleanHtml(html) {
  if (!html) return '';
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<br\s*[\/]?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<li>/gi, '• ')
    .replace(/<\/li>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function determineCategory(product) {
  const text = (product.title + ' ' + (product.tags || []).join(' ')).toLowerCase();
  if (text.includes('cake') || text.includes('bakery')) return 'cakes';
  if (text.includes('chocolate') || text.includes('box') || text.includes('perfume') || text.includes('jewelry') || text.includes('gift')) return 'gifts';
  return 'flowers';
}

function extractOccasions(tags) {
  const list = ['Birthday', 'Anniversary', 'Love & Romance', 'Congratulation', "Mother's Day", 'Valentine', 'Get Well Soon'];
  const lower = tags.map(t => t.toLowerCase());
  const found = [];
  for (const occ of list) {
    const oLower = occ.toLowerCase();
    if (lower.some(t => t.includes(oLower) || (oLower.includes('valentine') && t.includes('valentin')) || (oLower.includes('anniversary') && t.includes('anniversary')))) {
      found.push(occ);
    }
  }
  return found.length ? found : ['Love & Romance'];
}

function extractFlowerTypes(tags, title) {
  const list = ['Red Roses', 'Lilies', 'Tulips', 'Carnations', 'Mix Flowers', 'Orchids', 'Sunflowers'];
  const text = (title + ' ' + tags.join(' ')).toLowerCase();
  const found = [];
  if (text.includes('rose')) found.push('Red Roses');
  if (text.includes('lili') || text.includes('lily')) found.push('Lilies');
  if (text.includes('tulip')) found.push('Tulips');
  if (text.includes('carnation')) found.push('Carnations');
  if (text.includes('orchid')) found.push('Orchids');
  if (text.includes('sunflower')) found.push('Sunflowers');
  return found.length ? found : ['Mix Flowers'];
}

export async function runImport({ dryRun = false, limit = 10, page = 1, fetchAll = false } = {}) {
  console.log(`\n======================================================`);
  console.log(`🌺 FlowerBouquet.pk -> Sanity Importer`);
  console.log(`Project: ${PROJECT_ID} | Dataset: ${DATASET}`);
  console.log(`DryRun: ${dryRun} | Limit per page: ${limit} | FetchAll: ${fetchAll}`);
  console.log(`======================================================\n`);

  if (!dryRun && !TOKEN) {
    console.error('\n❌ [SANITY_API_TOKEN MISSING]');
    console.error('Sanity database mein likhne aur images upload karne ke liye Token zaroori hai.');
    console.error('1. Link open karein: https://sanity.io/manage/personal/project/' + PROJECT_ID + '/api');
    console.error('2. "Add API token" par click karein -> Role "Editor" select karein.');
    console.error('3. Token copy karke .env.local mein SANITY_API_TOKEN="sk..." add karein ya chat mein send karein.\n');
    process.exit(1);
  }

  const client = dryRun ? null : createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: '2024-01-01',
    token: TOKEN,
    useCdn: false,
  });

  // Step 1: Base categories
  if (!dryRun) {
    console.log('📦 Checking base categories in Sanity...');
    const categories = [
      { _id: 'cat-flowers', _type: 'category', name: 'Flowers', slug: { _type: 'slug', current: 'flowers' }, group: 'flowers' },
      { _id: 'cat-cakes', _type: 'category', name: 'Cakes', slug: { _type: 'slug', current: 'cakes' }, group: 'cakes' },
      { _id: 'cat-gifts', _type: 'category', name: 'Gifts', slug: { _type: 'slug', current: 'gifts' }, group: 'gifts' },
    ];
    for (const cat of categories) {
      await client.createOrReplace(cat);
    }
    console.log('✅ Categories ready in Sanity.\n');
  }

  let currentPage = page;
  let totalImported = 0;
  let hasMore = true;

  while (hasMore) {
    const url = `https://flowerbouquet.pk/products.json?limit=${limit}&page=${currentPage}`;
    console.log(`📥 Fetching page ${currentPage}: ${url}`);
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`Failed to fetch: HTTP ${res.status}`);
      break;
    }

    const data = await res.json();
    const products = data.products || [];
    if (products.length === 0) {
      console.log('No more products found on page ' + currentPage);
      break;
    }

    console.log(`Processing ${products.length} products on page ${currentPage}...`);

    for (let i = 0; i < products.length; i++) {
      const p = products[i];
      const categoryGroup = determineCategory(p);
      const categoryId = `cat-${categoryGroup}`;
      const cleanDesc = cleanHtml(p.body_html);
      const shortDesc = cleanDesc.slice(0, 160).replace(/\n/g, ' ').trim();
      const price = parseFloat(p.variants[0]?.price) || 0;
      const originalPrice = p.variants[0]?.compare_at_price ? parseFloat(p.variants[0].compare_at_price) : undefined;
      const imageUrl = p.images[0]?.src;
      const occasions = extractOccasions(p.tags || []);
      const flowerTypes = extractFlowerTypes(p.tags || [], p.title);
      const isBestSeller = (p.tags || []).some(t => t.toLowerCase().includes('best selling') || t.toLowerCase().includes('premium'));

      console.log(` [${totalImported + 1}] ${p.title}`);
      console.log(`     Price: PKR ${price} | Cat: ${categoryGroup} | Occasions: ${occasions.join(', ')}`);

      if (dryRun) {
        totalImported++;
        continue;
      }

      try {
        let imageAssetRef = null;
        if (imageUrl) {
          const imgRes = await fetch(imageUrl);
          if (imgRes.ok) {
            const imgBuffer = Buffer.from(await imgRes.arrayBuffer());
            const asset = await client.assets.upload('image', imgBuffer, {
              filename: `${p.handle || p.id}.jpg`,
            });
            imageAssetRef = asset._id;
          }
        }

        const doc = {
          _id: `product-${p.id}`,
          _type: 'product',
          name: p.title,
          slug: { _type: 'slug', current: p.handle || `product-${p.id}` },
          price: price,
          originalPrice: originalPrice,
          shortDescription: shortDesc,
          description: cleanDesc,
          category: {
            _type: 'reference',
            _ref: categoryId,
          },
          flowerTypes: flowerTypes,
          occasions: occasions,
          cities: ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'All'],
          inStock: p.variants.some(v => v.available),
          isBestSeller: isBestSeller,
          isFeatured: false,
          seo: {
            metaTitle: `${p.title} | FlowerDeliveryPK`,
            metaDescription: shortDesc,
          },
        };

        if (imageAssetRef) {
          doc.images = [
            {
              _type: 'image',
              _key: `img-${p.id}`,
              asset: {
                _type: 'reference',
                _ref: imageAssetRef,
              },
            },
          ];
        }

        await client.createOrReplace(doc);
        console.log(`     ✨ Imported to Sanity: product-${p.id}`);
        totalImported++;
      } catch (err) {
        console.error(`     ⚠️ Failed to import:`, err.message);
      }
    }

    if (!fetchAll) {
      hasMore = false;
    } else {
      currentPage++;
      // Polite rate-limiting between page requests
      await new Promise(r => setTimeout(r, 1000));
    }
  }

  console.log(`\n🎉 Completed! Total products processed: ${totalImported}\n`);
}

const args = process.argv.slice(2);
const isDry = args.includes('--dry-run');
const fetchAll = args.includes('--all');
const limitArg = args.find(a => a.startsWith('--limit='));
const pageArg = args.find(a => a.startsWith('--page='));
const limit = limitArg ? parseInt(limitArg.split('=')[1], 10) : 250;
const page = pageArg ? parseInt(pageArg.split('=')[1], 10) : 1;

runImport({ dryRun: isDry, limit, page, fetchAll }).catch(console.error);
