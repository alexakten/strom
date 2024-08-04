import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "./components/ThemeContext";
import Head from "next/head";

export const metadata = {
  title: "Strōm",
  description: "Write with zero distractions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content="/thumbnail.webp" />
        <meta property="og:url" content="https://use-strom.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content="/thumbnail.webp" />
      </Head>
      <ThemeProvider>
        <body>
          {children}
          <Analytics />
        </body>
      </ThemeProvider>
    </html>
  );
}
