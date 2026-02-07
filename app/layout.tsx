import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'MADC Club | Engineering Excellence',
    description: 'Experience the art of smartphone engineering. A premium scrollytelling journey through innovation and craftsmanship.',
    keywords: ['MADC Club', 'smartphone', 'engineering', 'technology', 'innovation'],
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
