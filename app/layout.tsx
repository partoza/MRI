import type { Metadata } from 'next';
import { Poppins, DM_Serif_Display } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

const dmSerif = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'Market Reach International Resources',
  description: "15 Years of Bringing Filipino Brands Within an Arm's Reach Globally. Trusted FMCG logistics, sourcing, and distribution across 4 continents.",
  keywords: 'Filipino brands, FMCG logistics, global distribution, Philippine export, Market Reach',
  openGraph: {
    title: 'Market Reach International Resources',
    description: "15 Years of Bringing Filipino Brands Within an Arm's Reach Globally.",
    url: 'https://marketreach.global',
    siteName: 'Market Reach International',
    locale: 'en_PH',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${dmSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
