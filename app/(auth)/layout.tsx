import type { Metadata } from 'next';
import { DM_Sans, DM_Mono } from 'next/font/google';
import '../globals.css';
import Link from 'next/link';

const dmSans = DM_Sans({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const dmMono = DM_Mono({
    subsets: ['latin'],
    weight: ['300', '400', '500'],
});

export const metadata: Metadata = {
    title: 'Moja aplikacja',
    description: 'Opis aplikacji',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='pl'>
            <body className={`${dmSans.className}`}>{children}</body>
        </html>
    );
}
