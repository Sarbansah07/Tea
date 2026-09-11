import type { Metadata } from 'next';
import { CursorAtmosphere } from '@/components/CursorAtmosphere';
import './globals.css';

export const metadata: Metadata = { title: 'Kettle & Leaf | Specialty Tea, Direct from Source', description: 'Verified bulk tea lots for makers, plus carefully blended tea for everyday cups.' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><CursorAtmosphere />{children}</body></html>; }
