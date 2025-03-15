import { Geist } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import '@/app/globals.css';
import { Toaster } from '@/components/ui/sonner';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Make it Work',
  description: 'Defina seus objetivos atráves de Inteligência Artifical',
};

const geistSans = Geist({
  display: 'swap',
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background dark:bg-grid-white/[0.2] bg-grid-black/[0.2] text-foreground">
      
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen   flex flex-col gap-y-6">
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
