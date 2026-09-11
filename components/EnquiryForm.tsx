'use client';

import { FormEvent, useState } from 'react';
import { ArrowUpRight, Check, MessageCircle } from 'lucide-react';

type Result = { success: boolean; whatsappUrl?: string | null; error?: string };

export function EnquiryForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('We could not send that enquiry. Please try again.');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus('sending');
    try {
      const response = await fetch('/api/enquiries', { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      const raw = await response.text();
      let result: Result;
      try { result = JSON.parse(raw) as Result; } catch { throw new Error('The enquiry service returned an invalid response.'); }
      if (!response.ok || !result.success) throw new Error(result.error ?? 'We could not send that enquiry.');
      setWhatsappUrl(result.whatsappUrl ?? null);
      setStatus('success');
      form.reset();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'We could not send that enquiry. Please try again.');
      setStatus('error');
    }
  }

  if (status === 'success') return <div className="animate-pop rounded-3xl bg-[#1d392c] p-8 text-[#f3eee4]"><div className="grid h-12 w-12 place-items-center rounded-full bg-[#d5a84b] text-[#13241d]"><Check size={24} /></div><h3 className="mt-6 font-display text-3xl">Enquiry received.</h3><p className="mt-3 leading-7 text-[#c4d4c7]">Priyanka Sah will review your requirement and reply within 4 business hours.</p>{whatsappUrl ? <a href={whatsappUrl} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center rounded-xl bg-[#25d366] px-5 py-3 font-bold text-[#102519]"><MessageCircle className="mr-2" size={18} /> Continue on WhatsApp</a> : <p className="mt-6 text-sm text-[#9db89f]">WhatsApp is not connected yet. Add WHATSAPP_NUMBER to enable direct messaging.</p>}<button type="button" onClick={() => setStatus('idle')} className="mt-5 block text-sm text-[#d5a84b] underline">Send another enquiry</button></div>;

  return <form onSubmit={submit} className="animate-pop grid gap-4 rounded-3xl border border-[#d8cbb5] bg-[#fffaf0] p-7 shadow-[0_18px_50px_rgba(65,46,24,.08)] md:grid-cols-2"><input required name="name" className="rounded-xl border border-[#cdbfa7] bg-[#fffdf8] px-4 py-4 outline-none focus:border-[#9a6b38]" placeholder="Your name" /><input required name="company" className="rounded-xl border border-[#cdbfa7] bg-[#fffdf8] px-4 py-4 outline-none focus:border-[#9a6b38]" placeholder="Company name" /><input required name="phone" type="tel" pattern="[6-9][0-9]{9}" title="Enter a valid 10-digit Indian mobile number" className="rounded-xl border border-[#cdbfa7] bg-[#fffdf8] px-4 py-4 outline-none focus:border-[#9a6b38]" placeholder="Phone number" /><select required name="grade" defaultValue="" className="rounded-xl border border-[#cdbfa7] bg-[#fffdf8] px-4 py-4 text-[#617263] outline-none focus:border-[#9a6b38]"><option value="">Grade interested in</option><option>Primary Dust</option><option>Coarse Dust</option><option>Green Tea Waste</option><option>Tea Dust</option></select><select required name="quantity" defaultValue="" className="rounded-xl border border-[#cdbfa7] bg-[#fffdf8] px-4 py-4 text-[#617263] outline-none focus:border-[#9a6b38]"><option value="">Approx. quantity</option><option>500kg–1MT</option><option>1–5MT</option><option>5MT+</option><option>Regular monthly</option></select><input required name="state" className="rounded-xl border border-[#cdbfa7] bg-[#fffdf8] px-4 py-4 outline-none focus:border-[#9a6b38]" placeholder="Delivery state" /><textarea name="message" className="min-h-32 rounded-xl border border-[#cdbfa7] bg-[#fffdf8] px-4 py-4 outline-none focus:border-[#9a6b38] md:col-span-2" placeholder="Tell us what you are making" /><button disabled={status === 'sending'} type="submit" className="rounded-xl bg-[#8b4f2f] px-6 py-4 text-left font-bold text-white transition hover:bg-[#6f3d27] disabled:cursor-wait disabled:opacity-60 md:col-span-2">{status === 'sending' ? 'Sending enquiry…' : 'Send enquiry'} <ArrowUpRight className="float-right" size={18} /></button>{status === 'error' && <p className="text-sm text-red-700 md:col-span-2">{errorMessage}</p>}<p className="text-xs text-[#829282] md:col-span-2">We reply within 4 business hours. Your details stay between us.</p></form>;
}
