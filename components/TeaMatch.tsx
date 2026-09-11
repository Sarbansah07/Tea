'use client';

import { ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { useState } from 'react';

const questions = [
  { prompt: 'What kind of cup are you after?', options: ['A bright wake-up', 'A slow afternoon', 'A proper chai'] },
  { prompt: 'Milk or no milk?', options: ['Always milk', 'Sometimes', 'Never'] },
  { prompt: 'Choose your intensity.', options: ['Bold and brisk', 'Smooth and balanced', 'Light and aromatic'] },
];

export function TeaMatch() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const recommendations = answers.includes('A slow afternoon') ? ['Sunday Blend', 'Honeyed, round and soft'] : answers.includes('Always milk') || answers.includes('A proper chai') ? ['Office Chai', 'Bright, spicy and steady'] : ['House Strong', 'Malty, brisk and deep'];

  function choose(answer: string) { const next = [...answers, answer]; setAnswers(next); if (step === questions.length - 1) setResult(recommendations[0]); else setStep(step + 1); }
  function reset() { setStep(0); setAnswers([]); setResult(null); }

  return <section className="relative overflow-hidden rounded-[2rem] bg-[#173127] p-7 text-[#fffaf0] shadow-[0_25px_70px_rgba(23,49,39,.16)] md:p-10"><div className="absolute -right-8 -top-10 font-display text-[12rem] leading-none text-[#e7b85c]/10">?</div>{result ? <div className="relative animate-pop"><div className="flex items-center gap-2 text-[#e7b85c]"><Sparkles size={18} /><span className="eyebrow">Your tea match</span></div><h2 className="mt-5 font-display text-5xl">{result}</h2><p className="mt-3 text-lg text-[#cfdbcf]">{recommendations[1]}</p><div className="mt-7 flex flex-wrap gap-3"><a href="#shop-products" className="rounded-full bg-[#e7b85c] px-5 py-3 text-sm font-bold text-[#173127]">Shop this blend <ArrowRight className="ml-1 inline" size={15} /></a><button type="button" onClick={reset} className="inline-flex items-center rounded-full border border-white/20 px-5 py-3 text-sm font-bold"><RotateCcw className="mr-2" size={15} /> Try again</button></div></div> : <div className="relative"><div className="flex items-center justify-between"><div><p className="eyebrow">Tea Match · 30 seconds</p><h2 className="mt-4 font-display text-4xl md:text-5xl">Let us find your cup.</h2></div><span className="text-sm text-[#9fb4a2]">{step + 1}/{questions.length}</span></div><div className="mt-7 h-1 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-[#e7b85c] transition-all duration-500" style={{ width: `${((step + 1) / questions.length) * 100}%` }} /></div><p className="mt-8 text-lg text-[#cfdbcf]">{questions[step].prompt}</p><div className="mt-5 grid gap-3 md:grid-cols-3">{questions[step].options.map(option => <button key={option} type="button" onClick={() => choose(option)} className="rounded-2xl border border-white/15 bg-white/5 px-4 py-4 text-left text-sm font-bold transition hover:-translate-y-1 hover:border-[#e7b85c] hover:bg-[#e7b85c] hover:text-[#173127]">{option}<ArrowRight className="float-right" size={16} /></button>)}</div></div>}</section>;
}
