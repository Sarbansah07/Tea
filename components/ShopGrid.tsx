'use client';

import { ArrowUpRight, Minus, Plus, ShoppingBag, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export type ShopProduct = { name: string; note: string; strength: string; price: number; image: string; flavor: string };

const products: ShopProduct[] = [
  { name: 'House Strong', note: 'A brisk Assam-forward cup for early starts and second rounds.', strength: 'Strong', price: 220, flavor: 'Malty · brisk · deep', image: '/images/tea/brew.jpg' },
  { name: 'Sunday Blend', note: 'Round, malty and quietly aromatic. Made for slower mornings.', strength: 'Medium', price: 240, flavor: 'Honeyed · round · soft', image: '/images/tea/green-cup.jpg' },
  { name: 'Office Chai', note: 'Bright enough for milk, steady enough for the whole meeting.', strength: 'Strong', price: 210, flavor: 'Bright · spicy · steady', image: '/images/tea/brew.jpg' },
];

type CartItem = ShopProduct & { quantity: number };

export function ShopGrid() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('kl-cart');
      const parsed = saved ? JSON.parse(saved) : [];
      if (Array.isArray(parsed)) setCart(parsed.filter(item => item && typeof item.name === 'string' && Number.isInteger(item.quantity) && item.quantity > 0 && item.quantity <= 20) as CartItem[]);
    } catch { window.localStorage.removeItem('kl-cart'); }
  }, []);

  useEffect(() => { window.localStorage.setItem('kl-cart', JSON.stringify(cart)); }, [cart]);

  function add(product: ShopProduct) {
    setCart(current => current.some(item => item.name === product.name) ? current.map(item => item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { ...product, quantity: 1 }]);
    setOpen(true);
  }

  function change(name: string, amount: number) { setCart(current => current.flatMap(item => item.name === name ? (item.quantity + amount > 0 ? [{ ...item, quantity: item.quantity + amount }] : []) : [item])); }
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return <><div className="mt-14 grid gap-6 md:grid-cols-3">{products.map((product, index) => <article key={product.name} className="group rounded-[2rem] bg-white/70 p-5 shadow-[0_18px_50px_rgba(65,46,24,.06)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(65,46,24,.14)]"><div className="relative h-72 overflow-hidden rounded-[1.4rem]"><img src={product.image} alt={`${product.name} tea leaves and brewed tea`} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#13241d]/50 via-transparent to-transparent" /><span className="absolute bottom-4 left-4 rounded-full bg-[#fffaf0]/90 px-3 py-1 text-xs font-bold text-[#1d392c]">{product.flavor}</span><span className="absolute right-4 top-4 rounded-full bg-[#d5a84b] px-3 py-1 text-xs font-bold text-[#13241d]">0{index + 1}</span></div><div className="px-2 pb-2 pt-6"><div className="flex justify-between gap-3"><h2 className="font-display text-3xl text-[#1d392c]">{product.name}</h2><span className="pt-2 text-xs text-[#8f6828]">{product.strength}</span></div><p className="mt-3 min-h-14 text-sm leading-6 text-[#617263]">{product.note}</p><div className="mt-6 flex items-center justify-between"><span className="font-bold text-[#1d392c]">From ₹{product.price}</span><button type="button" onClick={() => add(product)} className="rounded-full bg-[#1d392c] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#8b4f2f]">Add to cart <ArrowUpRight className="ml-1 inline" size={14} /></button></div></div></article>)}</div><button type="button" onClick={() => setOpen(true)} className="fixed bottom-6 right-6 z-20 rounded-full bg-[#8b4f2f] px-5 py-3 font-bold text-white shadow-xl hover:bg-[#6f3d27]"><ShoppingBag className="mr-2 inline" size={17} /> Cart · {count}</button>{open && <div className="fixed inset-0 z-30"><button aria-label="Close cart" type="button" className="absolute inset-0 bg-[#13241d]/40" onClick={() => setOpen(false)} /><aside className="animate-pop absolute bottom-0 right-0 top-0 w-full max-w-md overflow-y-auto bg-[#fffaf0] p-7 shadow-2xl"><div className="flex items-center justify-between"><h2 className="font-display text-4xl text-[#1d392c]">Your tea shelf</h2><button aria-label="Close cart" type="button" onClick={() => setOpen(false)}><X /></button></div>{cart.length === 0 ? <div className="py-20 text-center text-[#617263]"><ShoppingBag className="mx-auto mb-4" size={32} /><p>Your cart is waiting for its first blend.</p></div> : <><div className="mt-8 space-y-5">{cart.map(item => <div key={item.name} className="flex gap-4 border-b border-[#d8cbb5] pb-5"><img src={item.image} alt="" className="h-20 w-20 rounded-xl object-cover" /><div className="flex-1"><p className="font-bold text-[#1d392c]">{item.name}</p><p className="mt-1 text-sm text-[#8f6828]">₹{item.price} · 250g</p><div className="mt-3 flex items-center gap-3"><button aria-label={`Remove one ${item.name}`} type="button" onClick={() => change(item.name, -1)} className="rounded-full border p-1"><Minus size={13} /></button><span className="text-sm font-bold">{item.quantity}</span><button aria-label={`Add one ${item.name}`} type="button" onClick={() => change(item.name, 1)} className="rounded-full border p-1"><Plus size={13} /></button></div></div></div>)}</div><div className="mt-8 flex justify-between text-lg font-bold text-[#1d392c]"><span>Total</span><span>₹{total}</span></div><a href="/checkout" className="mt-6 block rounded-xl bg-[#1d392c] py-4 text-center font-bold text-white hover:bg-[#8b4f2f]">Proceed to checkout <ArrowUpRight className="ml-1 inline" size={17} /></a></>}</aside></div>}</>;
}
