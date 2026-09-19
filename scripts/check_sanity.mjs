async function check() {
  const query = '*[_type in ["category", "product"]]{ _id, _type, name, title }';
  const url = `https://am64tc6i.api.sanity.io/v2024-01-01/data/query/production?query=${encodeURIComponent(query)}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log('Result count:', data.result?.length);
  console.log('Sample docs:', data.result?.slice(0, 10));
}
check().catch(console.error);
