import { NextResponse } from 'next/server';
import { quoteSchema } from '@/lib/validators/quote';

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
  return NextResponse.json({ success: true });
}
