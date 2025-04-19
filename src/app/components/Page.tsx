"use client";

import React, { useEffect, useState } from 'react'
import words from 'an-array-of-english-words';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { validateContainsInput, validateTextInput } from '@/utils/validate';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SquareArrowOutUpRight } from 'lucide-react';


type WordGroups = Record<number, string[]>;

const scrabbleLetterValues: Record<string, number> = {
    A: 1, B: 3, C: 3, D: 2,
    E: 1, F: 4, G: 2, H: 4,
    I: 1, J: 8, K: 5, L: 1,
    M: 3, N: 1, O: 1, P: 3,
    Q: 10, R: 1, S: 1, T: 1,
    U: 1, V: 4, W: 4, X: 8,
    Y: 4, Z: 10,
};

const getScrabbleValue = (word: string): number => {
    return word
        .toUpperCase()
        .split('')
        .reduce((sum, letter) => sum + (scrabbleLetterValues[letter] || 0), 0);
};

const Page = () => {
    const [lettersInput, setLettersInput] = useState("");
    const [lengthInput, setLengthInput] = useState("");
    const [containsInput, setContainsInput] = useState("");
    const [excludesInput, setExcludes] = useState("");
    const [arraysByLength, setArraysByLength] = useState<WordGroups>({});
    const [pageByLength, setPageByLength] = useState<Record<number, number>>({});
    const wordsPerPage = 10;
    const cacheKey = "wordfinder"

    useEffect(() => {
        // Load session storage on mount
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) {
            try {
                const parsed = JSON.parse(cached);
                setLettersInput(parsed.lettersInput || "");
                setLengthInput(parsed.lengthInput || "");
                setContainsInput(parsed.containsInput || "");
                setExcludes(parsed.excludesInput || "");
                setPageByLength(parsed.pageByLength || {});
            } catch (err) {
                console.error("Error parsing session storage:", err);
            }
        }
    }, []);

    useEffect(() => {
        // Save to session storage whenever these states change
        const state = {
            lettersInput,
            lengthInput,
            containsInput,
            excludesInput,
            pageByLength,
        };
        sessionStorage.setItem(cacheKey, JSON.stringify(state));
    }, [lettersInput, lengthInput, containsInput, excludesInput, pageByLength]);

    function handleLettersInput(value: string) {
        if (value === "") setLettersInput(value);

        if (validateTextInput(value)) {
            setLettersInput(value.toUpperCase());
        }
    }

    function handleContainsInput(value: string) {
        const normalizedValue = value.replace(/ /g, "_");

        if (normalizedValue === "") {
            setContainsInput("");
            return;
        }

        if (validateContainsInput(normalizedValue)) {
            setContainsInput(normalizedValue.toUpperCase());
        }
    }

    function handleExcludesInput(value: string) {
        if (value === "") setExcludes(value);

        if (validateTextInput(value)) {
            setExcludes(value.toUpperCase());
        }
    }

    function handleSearch() {
        let arr = words.map(w => w.toUpperCase());

        // short-circuit if no criteria
        if (!lettersInput && !lengthInput && !containsInput && !excludesInput) {
            setArraysByLength({});
            return;
        }

        // filter by exact length
        const len = parseInt(lengthInput, 10);
        if (!isNaN(len)) {
            arr = arr.filter(w => w.length === len);
        }

        // exclude letters
        if (excludesInput) {
            arr = arr.filter(w => excludesInput.split('').every(c => !w.includes(c)));
        }

        // contains pattern
        if (containsInput) {
            const regex = new RegExp(containsInput.replace(/_/g, '.'), 'i');
            arr = arr.filter(w => regex.test(w));
        }

        // must include letters
        if (lettersInput) {
            arr = arr.filter(w => lettersInput.split('').every(c => w.includes(c)));
        }

        // group results by their lengths
        const groups: WordGroups = {};
        arr.forEach(w => {
            const l = w.length;
            if (!groups[l]) groups[l] = [];
            groups[l].push(w);
        });
        setArraysByLength(groups);
    }

    const changePage = (length: number, direction: "prev" | "next") => {
        setPageByLength(prev => {
            const currentPage = prev[length] || 0;
            const newPage = direction === "next" ? currentPage + 1 : Math.max(0, currentPage - 1);
            return { ...prev, [length]: newPage };
        });
    };

    return (
        <div className='min-h-screen w-full space-y-5 flex flex-col items-center'>
            <div className="text-center my-16">
                <h1 className='text-8xl font-bold text-gray-800 dark:text-[#d1d5dc] mb-2'>Word Finder</h1>
                <p className='text-lg'>
                    Use our Word Finder to discover words for Scrabble, Wordle, anagrams, and word games.
                </p>
            </div>

            <div className='mt-16 grid grid-cols-1 md:grid-cols-2 gap-3'>
                <div className='relative'>
                    <Input
                        type="text"
                        placeholder='A'
                        value={lettersInput}
                        onChange={(e) => handleLettersInput(e.target.value)}
                        className="h-10 w-full peer"
                    />
                    <label
                        className={`pointer-events-none absolute left-2 text-gray-500 transition-all bg-white dark:bg-[#282828] rounded px-1
            ${lettersInput ? 'top-1 -translate-y-[14px] text-sm' : 'top-1/2 -translate-y-1/2 text-base'}
            peer-focus:top-1 peer-focus:-translate-y-[14px] peer-focus:text-sm`}
                    >
                        Letters
                    </label>
                </div>

                <div className='relative'>
                    <Input
                        type="text"
                        placeholder='A_B'
                        value={containsInput}
                        onChange={(e) => handleContainsInput(e.target.value)}
                        className="h-10 w-full peer"
                    />
                    <label
                        className={`pointer-events-none absolute left-2 text-gray-500 transition-all bg-white dark:bg-[#282828] rounded px-1
            ${containsInput ? 'top-1 -translate-y-[14px] text-sm' : 'top-1/2 -translate-y-1/2 text-base'}
            peer-focus:top-1 peer-focus:-translate-y-[14px] peer-focus:text-sm`}
                    >
                        Contains
                    </label>
                </div>

                <div className='relative'>
                    <Input
                        type="text"
                        placeholder='T'
                        value={excludesInput}
                        onChange={(e) => handleExcludesInput(e.target.value)}
                        className="h-10 w-full peer"
                    />
                    <label
                        className={`pointer-events-none absolute left-2 text-gray-500 transition-all bg-white dark:bg-[#282828] rounded px-1
            ${excludesInput ? 'top-1 -translate-y-[14px] text-sm' : 'top-1/2 -translate-y-1/2 text-base'}
            peer-focus:top-1 peer-focus:-translate-y-[14px] peer-focus:text-sm`}
                    >
                        Excludes
                    </label>
                </div>

                <div className="relative">
                    <Input
                        type="number" placeholder=" " value={lengthInput}
                        onChange={e => setLengthInput(e.target.value)} className="h-10 w-full peer"
                    />
                    <label
                        className={`pointer-events-none absolute left-2 text-gray-500 transition-all bg-white dark:bg-[#282828] rounded px-1
            ${lengthInput ? 'top-1 -translate-y-[14px] text-sm' : 'top-1/2 -translate-y-1/2 text-base'}
            peer-focus:top-1 peer-focus:-translate-y-[14px] peer-focus:text-sm`}
                    >
                        Length
                    </label>
                </div>
            </div>

            {/* Trigger search only on button click */}
            <Button onClick={handleSearch} className="mt-2 cursor-pointer">Search</Button>

            {/* Display grouped results */}
            <div className='min-w-xs md:min-w-md max-w-xl mb-96'>
                {Object.keys(arraysByLength).length > 0 ? (
                    Object.entries(arraysByLength)
                        .sort(([a], [b]) => Number(a) - Number(b))
                        .map(([len, list]) => {
                            const length = Number(len);
                            const currentPage = pageByLength[length] || 0;
                            const start = currentPage * wordsPerPage;
                            const end = start + wordsPerPage;

                            return (
                                <div key={len} className='flex flex-col items-center mb-6'>
                                    <Table>
                                        <TableCaption className='space-x-4'>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                disabled={currentPage === 0}
                                                onClick={() => changePage(length, "prev")}
                                            >
                                                Prev
                                            </Button>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                {start + 1}–{Math.min(end, list.length)} of {list.length}
                                            </span>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                disabled={end >= list.length}
                                                onClick={() => changePage(length, "next")}
                                            >
                                                Next
                                            </Button>
                                        </TableCaption>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[100px]">Length {len}</TableHead>
                                                <TableHead className="w-[100px]">Scrabble Value</TableHead>
                                                <TableHead className="text-right">Definition</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {list
                                                .slice(start, end)
                                                .map(word => (
                                                    <TableRow key={word}>
                                                        <TableCell className="font-medium truncate">{word}</TableCell>
                                                        <TableCell className="font-medium text-end truncate">{getScrabbleValue(word)}</TableCell>
                                                        <TableCell className="flex justify-end">
                                                            <SquareArrowOutUpRight
                                                                className="w-4 h-4 cursor-pointer"
                                                                onClick={() => window.open(`https://www.dictionary.com/browse/${word}`, '_blank')}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            );
                        })
                ) : (
                    <p className='text-center'>No results. Adjust your search criteria.</p>
                )}
            </div>
        </div>
    )
}

export default Page
