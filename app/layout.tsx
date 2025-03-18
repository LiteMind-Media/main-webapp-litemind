import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const font = Poppins({
  subsets: ["latin"],
  weight: '400',
  variable: "--font-poppins-400",
});

export const metadata: Metadata = {
  title: "LiteMind Media",
  description: "Created by LiteMind Media",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={font.className}>{children}</body>
    </html>
  );
}
