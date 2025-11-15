import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const cashSans = localFont({
  src: [
    {
      path: "./fonts/CashSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/CashSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-cash-sans",
  display: "swap",
});

const exactBlock = localFont({
  src: "./fonts/ExactBlock-Regular.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-exact-block",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Local Business Insights | Square",
  description: "Get local with your business insights. Discover hidden patterns in your neighborhood market with data from millions of Square merchants.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cashSans.variable} ${exactBlock.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
