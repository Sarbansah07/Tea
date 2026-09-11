import { NextResponse } from 'next/server';

const requests = new Map<string, { count: number; resetAt: number }>();
const allowedGrades = new Set(['Primary Dust', 'Coarse Dust', 'Green Tea Waste', 'Tea Dust']);
const allowedQuantities = new Set(['500kg–1MT', '1–5MT', '5MT+', 'Regular monthly']);

export async function POST(request: Request) {
 try {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const address = forwardedFor?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'local';
  const now = Date.now();
  const record = requests.get(address);
  if (record && record.resetAt > now && record.count >= 5) return NextResponse.json({ error: 'Too many enquiries. Please try again later.' }, { status: 429 });
  if (!record || record.resetAt <= now) requests.set(address, { count: 1, resetAt: now + 10 * 60 * 1000 });
  else record.count += 1;

  const formData = await request.formData();
  const name = String(formData.get('name') ?? '').trim();
  const company = String(formData.get('company') ?? '').trim();
  const phone = String(formData.get('phone') ?? '').trim();
  const grade = String(formData.get('grade') ?? '').trim();
  const quantity = String(formData.get('quantity') ?? '').trim().replace(/-/g, '–');
  const state = String(formData.get('state') ?? '').trim();

  if (!name || !company || !phone || !grade || !quantity || !state || name.length > 80 || company.length > 120 || state.length > 60 || !/^[6-9]\d{9}$/.test(phone) || !allowedGrades.has(grade) || !allowedQuantities.has(quantity)) {
    return NextResponse.json({ error: 'Please complete all required enquiry fields.' }, { status: 400 });
  }
  const message = String(formData.get('message') ?? '').trim().slice(0, 500);

  const whatsappNumber = process.env.WHATSAPP_NUMBER?.replace(/\D/g, '');
  const whatsappMessage = `Hello Priyanka, I am ${name} from ${company}. I am interested in ${grade} for ${quantity}. Delivery state: ${state}. ${message}`;
  const whatsappUrl = whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}` : null;

  console.info('New tea enquiry received', { name, company, grade, quantity, state });
  return NextResponse.json({ success: true, whatsappUrl });
 } catch {
  return NextResponse.json({ error: 'We could not process that enquiry right now.' }, { status: 500 });
 }
}
