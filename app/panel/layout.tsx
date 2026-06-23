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
            <body className={`${dmSans.className}`}>
                <div className='flex'>
                    <div className='h-screen w-60 bg-gray-50'>
                        <nav className='w-full'>
                            {[
                                { label: 'Dzisiaj', href: '' },
                                { label: 'Wizyty', href: '' },
                                { label: 'Klienci', href: '/panel/customers' },
                                { label: 'Zespół', href: '/panel/team' },
                                { label: 'Oferta', href: '/panel/services' },
                                { label: 'Strona klienta', href: '' },
                                { label: 'Ustawienia', href: '/panel/settings' },
                            ].map(({ label, href }, i) => (
                                <Link
                                    key={i}
                                    href={href}
                                    className='flex w-full px-4 py-2 hover:bg-white'>
                                    {label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                    <div className='flex-1'>{children}</div>
                </div>
            </body>
        </html>
    );
}
