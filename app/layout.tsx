
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  applicationName: "LinkBytez Player",
  title: {
    default: "LinkBytez Player",
    template: "%s | LinkBytez Player",
  },
  description:
    "Abre y reproduce proyectos musicales compartidos mediante LinkBytez. Accede a tus proyectos con su código de acceso.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "LinkBytez",
  },
  formatDetection: {
    telephone: false,
  },
 
  openGraph: {
    title: "LinkBytez Player",
    description:
      "Tu espacio para abrir y escuchar proyectos musicales compartidos.",
    siteName: "LinkBytez Player",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkBytez Player",
    description:
      "Abre y escucha tus proyectos musicales compartidos con LinkBytez.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#09090b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-white">
        {children}
      </body>
    </html>
  );
}
