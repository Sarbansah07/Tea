import Link from 'next/link';
import { ArrowLeft, Check, Leaf } from 'lucide-react';

export default function ThankYouPage() {
  return <main className="grid min-h-screen place-items-center bg-[#13241d] px-6 text-[#f3eee4]"><div className="max-w-xl text-center"><div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#d5a84b] text-[#13241d]"><Check size={30} /></div><p className="mt-8 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[.25em] text-[#d5a84b]"><Leaf size={15} /> Kettle & Leaf</p><h1 className="mt-5 font-display text-6xl">Enquiry received.</h1><p className="mt-6 text-lg leading-8 text-[#c4d4c7]">Thank you. Priyanka Sah and the Kettle & Leaf team will review your requirement and respond within 4 business hours.</p><Link href="/" className="mt-10 inline-flex items-center rounded-full bg-[#d5a84b] px-6 py-3 font-bold text-[#13241d]"><ArrowLeft className="mr-2" size={16} /> Back to home</Link></div></main>;
}
