import Link from 'next/link'
import React from 'react'


interface FooterlinkProps {
    text: string;
    href: string;
    target?: string | undefined;
}

const FooterLink: React.FC<FooterlinkProps> = ({ text, href, target }) => {
    return (
        <Link className="hover:underline text-center" href={href} target={target}>{text}</Link>
    );
}

const FooterColumn = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div className='col-span-1 text-center flex flex-col gap-3'>{children}</div>
    )
}

const Footer = () => {
    return (
        <footer className='bg-white dark:bg-[#1c1c1c] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-16 gap-8 w-full'>
            {/* About Section */} 
            <FooterColumn>
                <FooterLink text="About Us" href="https://salkaro.com/about" />
                <FooterLink text="Attributions" href="https://salkaro.com/attributions" />
                <FooterLink text="Privacy Policy" href="/privacy-policy" />
                <FooterLink text="FAQs" href="https://salkaro.com/faq" />
            </FooterColumn>

            {/* Resources Section */}
            <FooterColumn>
                <FooterLink text="Flippify" href="https://flippify.io?ref=salkaro-timer" />
                <FooterLink text="Discord" href="https://discord.gg/aHXVSMkmpk" />
                <FooterLink text="Code Online" href="https://salkaro.com/write-code" />
            </FooterColumn>

            {/* Other websites Section */}
            <FooterColumn>
                <FooterLink text="Is It Down?" href="https://isitdown.salkaro.com" />
                <FooterLink text="Games" href="https://games.salkaro.com" />
                <FooterLink text="Study" href="https://salkaro.com/study-materials" />
                <FooterLink text="Code Demos" href="https://salkaro.com/code-demos" />
            </FooterColumn>

            {/* Social Media Section */}
            <FooterColumn>
                <FooterLink target="_blank" text="Github" href="https://github.com/salkaro" />
                <FooterLink target="_blank" text="Twitter" href="https://x.com/_itsnickjames" />
                <FooterLink target="_blank" text="LinkedIn" href="https://www.linkedin.com/in/nickjames-info/" />
                <FooterLink target="_blank" text="Instagram" href="https://www.instagram.com/_flippify" />
            </FooterColumn>
        </footer>
    )
}



export default Footer

