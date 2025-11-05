import type { Metadata } from 'next';
import localFont from 'next/font/local'; 
import '@/styles/globals.css';
import AppProviders from '@/providers/AppProviders';
import Header from '@/components/layout/Header';


const grotesque = localFont({
  src: [
    {
      path: '../../public/fonts/BricolageGrotesque-VariableFont_opsz,wdth,wght.ttf', 
      weight: '100 900', 
      style: 'normal',
    },
  ],
  variable: '--font-grotesque',
});

const dmSans = localFont({
    src: [
        {
            path: '../../public/fonts/DMSans-VariableFont_opsz,wght.ttf',
            weight: '400 700', 
            style: 'normal',
        }
    ],
    variable: '--font-dm-sans', 
});


export const metadata: Metadata = {
  title: 'Weather Now',
  description: 'Your real-time weather companion.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${grotesque.variable}`}>
      <body className="bg-neutral-900 text-neutral-0 font-grotesque antialiased">
        <AppProviders>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
