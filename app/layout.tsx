import './globals.css';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import Header from '@/components/Header';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ModeToggle } from '@/components/ModeToggle';
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'John - An ai chatbot',
  description:
    'John is a chatbot helping to find information from the database and not only.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={`${inter.className}`}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <div className='relative min-h-screen'>
              <Header />
              {children}
              <ModeToggle />
            </div>
          </ThemeProvider>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
