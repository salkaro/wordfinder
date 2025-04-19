import { ModeToggle } from '@/components/theme-toggle'
import React from 'react'

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className='relative min-h-screen bg-white dark:bg-[#1e1e1e] flex flex-col p-4 justify-center items-center overflow-x-hidden mx-0 md:mx-48 2xl:mx-96'>
            <div className='absolute top-2 right-2'>
                <ModeToggle />
            </div>

            {children}
        </div>
    )
}

export default Layout
