import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Diabeto - Take Control of Your Diabetes",
  description: "Monitor your blood sugar, track your habits, and live healthier every day with Diabeto app",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon/favicon-16x16.svg', sizes: '16x16', type: 'image/svg+xml' },
      { url: '/favicon/favicon-32x32.svg', sizes: '32x32', type: 'image/svg+xml' },
      { url: '/favicon/logo.svg', sizes: '512x512', type: 'image/svg+xml' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [
      { url: '/favicon/logo.svg', sizes: '180x180', type: 'image/svg+xml' }
    ],
    other: [
      {
        rel: 'manifest',
        url: '/favicon/site.webmanifest',
      },
    ],
  },
  themeColor: '#1a73e8',
  manifest: '/favicon/site.webmanifest',
  metadataBase: new URL('https://diabeto.com'),
  appleWebApp: {
    title: "Diabeto",
    statusBarStyle: "default"
  },
  openGraph: {
    title: "Diabeto - Take Control of Your Diabetes",
    description: "Monitor your blood sugar, track your habits, and live healthier every day with Diabeto app",
    images: [{ url: '/favicon/logo.svg' }],
  },
  twitter: {
    card: 'summary',
    title: "Diabeto - Take Control of Your Diabetes",
    description: "Monitor your blood sugar, track your habits, and live healthier every day with Diabeto app",
    images: [{ url: '/favicon/logo.svg' }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon/favicon-16x16.svg" sizes="16x16" type="image/svg+xml" />
        <link rel="icon" href="/favicon/favicon-32x32.svg" sizes="32x32" type="image/svg+xml" />
        <link rel="icon" href="/favicon/logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon/logo.svg" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
        <meta name="theme-color" content="#1a73e8" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
