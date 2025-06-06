/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "randomuser.me"
            }
        ]
    },
    webpack: (config, { isServer }) => {
        // Add fallbacks for node modules
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
            path: false,
            os: false,
        };

        // Handle TensorFlow.js specific configurations
        if (!isServer) {
            config.resolve.alias = {
                ...config.resolve.alias,
                '@tensorflow/tfjs-node': '@tensorflow/tfjs',
            };
        }

        // Explicitly configure path aliases
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': require('path').resolve(__dirname),
        };

        return config;
    },
    // Disable strict mode in production to avoid double-rendering
    reactStrictMode: process.env.NODE_ENV === 'development',
    // Configure TypeScript to be less strict during build
    typescript: {
        ignoreBuildErrors: true,
    },
    // Configure ESLint to be less strict during build
    eslint: {
        ignoreDuringBuilds: true,
    },
    // Ensure path aliases are properly resolved
    experimental: {
        esmExternals: true,
    },
};

export default nextConfig;
