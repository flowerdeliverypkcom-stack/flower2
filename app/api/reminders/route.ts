import { NextRequest, NextResponse } from 'next/server';
import { appendOccasionReminder } from '@/lib/googleSheets';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, whatsappNumber, occasion, date } = body || {};

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    if (!whatsappNumber || !whatsappNumber.trim()) {
      return NextResponse.json(
        { error: 'WhatsApp number is required' },
        { status: 400 }
      );
    }

    if (!occasion) {
      return NextResponse.json(
        { error: 'Occasion type is required' },
        { status: 400 }
      );
    }

    if (!date) {
      return NextResponse.json(
        { error: 'Occasion date is required' },
        { status: 400 }
      );
    }

    const result = await appendOccasionReminder({
      name: name.trim(),
      whatsappNumber: whatsappNumber.trim(),
      occasion,
      date,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Reminder captured successfully',
      data: result,
    });
  } catch (error: any) {
    console.error('Error handling occasion reminder API:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to record occasion reminder' },
      { status: 500 }
    );
  }
}
