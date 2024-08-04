import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "./components/ThemeContext";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Strōm",
  description: "Write with zero distractions.",
  openGraph: {
    title: "Strōm",
    description: "Write with zero distractions.",
    url: "https://use-strom.vercel.app/",
    type: "website",
    images: [
      {
        url: "https://use-strom.vercel.app/thumbnail.webp",
        width: 1200,
        height: 630,
        alt: "Strōm Thumbnail",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Strōm",
    description: "Write with zero distractions.",
    images: ["https://use-strom.vercel.app/thumbnail.webp"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
