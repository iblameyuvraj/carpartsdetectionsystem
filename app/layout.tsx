import { Inter, Poppins } from "next/font/google";

import { generateMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap',
});

export const metadata = generateMetadata();

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    "min-h-screen bg-background text-foreground antialiased font-default overflow-x-hidden !scrollbar-hide",
                    inter.className
                )}
                style={{
                    fontFamily: inter.style.fontFamily,
                    fontWeight: inter.style.fontWeight,
                    fontStyle: inter.style.fontStyle,
                }}
            >
                {children}
            </body>
        </html>
    );
}
