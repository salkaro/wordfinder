import type { Metadata } from "next";
import "@/styles/globals.css";
import Footer from "./components/Footer";
import { ThemeProvider } from "@/components/theme-provider";


export const metadata: Metadata = {
    title: "Word Finder for Wordle, Scrabble, Anagrams & More | Salkaro",
    description: "Salkaro's Word Finder helps you solve Wordle, Scrabble, anagrams, crosswords, and more. Instantly filter words by letters, patterns, or length — complete with Scrabble scores.",
    openGraph: {
        title: 'Word Finder for Wordle, Scrabble, Anagrams & More | Salkaro',
        description: "Salkaro's Word Finder helps you solve Wordle, Scrabble, anagrams, crosswords, and more. Instantly filter words by letters, patterns, or length — complete with Scrabble scores.",
        url: "https://wordfinder.salkaro.com",
        images: [
            {
                url: "https://i.imgur.com/Tc97s1k.png",
                width: 2600,
                height: 1440,
                alt: "Word Finder for Wordle, Scrabble, Anagrams & More | Salkaro",
            }
        ]
    },
    robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                suppressHydrationWarning
                className={`antialiased w-full bg-[#f3f4f6] dark:bg-[#1a1a1a]`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    disableTransitionOnChange
                >
                    {children}

                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
