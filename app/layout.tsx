import type { Metadata } from "next";
import "./globals.css";
import { AppChrome } from "@/components/AppChrome";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://crown-cavalier.example";

export const metadata: Metadata = {
  title: { default: "Crown & Cavalier | Premium Men's Fashion in Hyderabad", template: "%s | Crown & Cavalier" },
  description: "Premium men's fashion, co-ords, cotton linen and sharp everyday style from Hyderabad, India.",
  keywords: ["men's clothing store Hyderabad", "men's fashion Hyderabad", "co-ord sets Hyderabad", "cotton linen shirts"],
  metadataBase: new URL(siteUrl),
  openGraph: { title: "Crown & Cavalier — Legacy Woven into Every Stitch", description: "Premium men's fashion. Great quality. Honest prices.", type: "website", images: [{ url: "/og.png", width: 1672, height: 940, alt: "Crown & Cavalier — Legacy Woven into Every Stitch" }] },
  twitter: { card: "summary_large_image", title: "Crown & Cavalier — Legacy Woven into Every Stitch", description: "Premium men's fashion. Great quality. Honest prices.", images: ["/og.png"] },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><AppChrome>{children}</AppChrome></body></html>;
}
