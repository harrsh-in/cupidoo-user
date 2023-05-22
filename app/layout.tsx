'use client';

import { poppins } from '@/utils/fonts';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { Metadata } from 'next';
import './globals.css';

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

const theme = createTheme({
    palette: {
        mode: 'light',
    },
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <ThemeProvider theme={theme}>
                <CssBaseline />

                <body className={poppins.className}>{children}</body>
            </ThemeProvider>
        </html>
    );
}
