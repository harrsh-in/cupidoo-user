import { poppins } from '@/utils/fonts';
import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cupidoo | Connect. Discover. Love.',
    description: 'Connect. Discover. Love.',
    icons: {
        icon: './favicon.ico',
        apple: './apple-touch-icon.png',
    },
    manifest: './site.webmanifest',
    colorScheme: 'light dark',
    authors: [
        {
            name: 'Harrsh Patel',
            url: 'https://harrsh.com',
        },
    ],
    creator: 'Harrsh Patel',
    themeColor: '#ffffff',
    viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={poppins.className}>{children}</body>
        </html>
    );
}
