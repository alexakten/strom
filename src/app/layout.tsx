// app/layout.tsx
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "./components/ThemeContext";

export const metadata = {
  title: "Mendly",
  description: "Minimalistic writing.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body>
          {children}
          <Analytics />
        </body>
      </ThemeProvider>
    </html>
  );
}
