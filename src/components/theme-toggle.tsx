"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
    const { resolvedTheme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    // Avoid SSR mismatch
    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <Button variant="outline" size="icon" disabled aria-label="Toggle theme">
                <Sun className="h-[1rem] w-[1rem] opacity-50" />
            </Button>
        )
    }

    const nextTheme = resolvedTheme === "dark" ? "light" : "dark"

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(nextTheme)}
            aria-label="Toggle theme"
        >
            {resolvedTheme === "dark" ? (
                <Sun className="h-[1rem] w-[1rem]" />
            ) : (
                <Moon className="h-[1rem] w-[1rem]" />
            )}
        </Button>
    )
}
