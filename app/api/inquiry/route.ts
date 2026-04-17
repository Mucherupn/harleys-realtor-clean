import { NextResponse } from 'next/server';
import { inquirySchema } from '@/lib/validators/inquiry';

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
  return NextResponse.json({ success: true });
}
