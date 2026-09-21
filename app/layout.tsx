import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/lib/cart-context"
import { AnnouncementBar } from "@/components/announcement-bar"
import { Header } from "@/components/header"
import { CartDrawer } from "@/components/cart-drawer"
import { Footer } from "@/components/footer"
import { cn } from "@/lib/utils"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })
const fontMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#00703c",
}

export const metadata: Metadata = {
  title: "Avaiya Farm — Farm से Kitchen तक | 100% Pure Vedic Produce",
  description:
    "Authentic stone-ground flours, wood kolhu virgin oils, and sun-dried spices delivered directly from Saurashtra / Gir farmlands to your family's table. Order directly via WhatsApp at +91 84698 26209.",
  icons: {
    icon: "/logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased overflow-x-hidden", fontMono.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-screen w-full max-w-full overflow-x-hidden bg-background text-foreground flex flex-col">
        <ThemeProvider>
          <CartProvider>
            <AnnouncementBar />
            <Header />
            <main className="flex-1 w-full max-w-full overflow-x-hidden">{children}</main>
            <Footer />
            <CartDrawer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
