import type { Metadata } from "next";

import App from "@/components/App";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "@fontsource/noto-sans-thai/300.css";
import "@fontsource/noto-sans-thai/400.css";
import "@fontsource/noto-sans-thai/500.css";
import "@fontsource/noto-sans-thai/700.css";

import "./globals.scss";

import "react-perfect-scrollbar/dist/css/styles.css";

export const metadata: Metadata = {
  title: "WIN WIN Construction",
  description: "โปรแกรมบริหารงานก่อสร้าง สำหรับผู้รับเหมาก่อสร้าง และผู้ว่าจ้าง"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* <link rel="icon" type="image/x-icon" href="/favicon_io/favicon.ico" /> */}
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon_io/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png" />
        <link rel="manifest" href="/favicon_io/site.webmanifest" />

        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@40,300,0,0"
        />
      </head>
      <body style={{ backgroundColor: "#F5F6F8" }}>
        <App>{children}</App>
      </body>
    </html>
  );
}
