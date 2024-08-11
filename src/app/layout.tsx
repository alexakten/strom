import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "./components/ThemeContext";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mendly",
  description: "Write with zero distractions.",
  openGraph: {
    title: "Mendly",
    description: "Write with zero distractions.",
    url: "https://mendly.app/",
    type: "website",
    images: [
      {
        url: "https://mendly.app/thumbnail.webp",
        width: 1200,
        height: 630,
        alt: "Mendly Thumbnail",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mendly",
    description: "Write with zero distractions.",
    images: ["https://mendly.app/thumbnail.webp"],
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
