import "./globals.css";
import { ThemeProvider } from "./components/ThemeContext";

export const metadata = {
  title: "strōm",
  description: "Minimalistic writing tool.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body>{children}</body>
      </ThemeProvider>
    </html>
  );
}
