import type { Metadata } from "next";
import Layout from "./components/Layout";
import Page from "./components/Page";

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



export default function Home() {
    return (
        <Layout>
            <Page />
        </Layout>
    );
}
