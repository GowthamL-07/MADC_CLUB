/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    reactStrictMode: true,
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.pravatar.cc',
                pathname: '/**',
            },
        ],
    },
}

module.exports = nextConfig
