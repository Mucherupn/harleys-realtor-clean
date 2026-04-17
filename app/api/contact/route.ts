import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validators/contact';

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
  return NextResponse.json({ success: true });
}
