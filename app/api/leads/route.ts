import { NextRequest, NextResponse } from 'next/server';
import { appendWhatsAppLead } from '@/lib/googleSheets';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, city, productName, price, phone, source } = body || {};

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'Customer name is required' },
        { status: 400 }
      );
    }

    if (!city) {
      return NextResponse.json(
        { error: 'Delivery city is required' },
        { status: 400 }
      );
    }

    const result = await appendWhatsAppLead({
      name: name.trim(),
      city,
      productName: productName || 'Fresh Flowers',
      price: price ? Number(price) : undefined,
      phone: phone || '',
      source: source || 'WhatsApp Order Modal',
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Lead captured successfully',
      data: result,
    });
  } catch (error: any) {
    console.error('Error handling lead submission API:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to record lead' },
      { status: 500 }
    );
  }
}
