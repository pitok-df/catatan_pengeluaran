import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import RootLayout from "./components/Layout";
import Sidebar from "./components/utilities/sidebar/Sidebar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Pencatatan Pengeluaran",
  description: "Web untuk mencatat pengeluaran dan pemasukan anda.",
  icons: "https://cdn-icons-png.flaticon.com/512/8910/8910710.png"
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RootLayout>
          {children}
        </RootLayout>
      </body>
    </html>
  );
}
