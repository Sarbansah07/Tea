import { Leaf } from 'lucide-react';

export function BrandMark({ dark = false }: { dark?: boolean }) {
  return <span className={`flex items-center gap-2 font-display text-2xl ${dark ? 'text-[#13241d]' : 'text-white'}`}><span className="grid h-9 w-9 place-items-center rounded-full bg-[#d5a84b] text-[#13241d]"><Leaf size={18} /></span>Kettle<span className="text-[#d5a84b]">&</span>Leaf</span>;
}
