import { Chewy, Poppins } from 'next/font/google';

export const chewy = Chewy({
    subsets: ['latin'],
    weight: ['400'],
});

export const poppins = Poppins({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['devanagari', 'latin'],
});
