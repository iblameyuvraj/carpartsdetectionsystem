import { Spotlight } from '@/components/ui/spotlight';
import Background from '@/components/global/background';
import Container from '@/components/global/container';
import Wrapper from '@/components/global/wrapper';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import SignUpForm from '@/components/module/SignUpForm';

// Lazy load components that are below the fold
const Companies = dynamic(() => import('@/components/module/companies'), {
    loading: () => <div className="h-32 w-full animate-pulse bg-gray-200 rounded-lg" />
});

const Connect = dynamic(() => import('@/components/module/connect'), {
    loading: () => <div className="h-64 w-full animate-pulse bg-gray-200 rounded-lg" />
});

const Features = dynamic(() => import('@/components/module/features'), {
    loading: () => <div className="h-96 w-full animate-pulse bg-gray-200 rounded-lg" />
});

const Perks = dynamic(() => import('@/components/module/perks'), {
    loading: () => <div className="h-96 w-full animate-pulse bg-gray-200 rounded-lg" />
});

const Pricing = dynamic(() => import('@/components/module/pricing'), {
    loading: () => <div className="h-96 w-full animate-pulse bg-gray-200 rounded-lg" />
});

const Reviews = dynamic(() => import('@/components/module/reviews'), {
    loading: () => <div className="h-96 w-full animate-pulse bg-gray-200 rounded-lg" />
});

const CTA = dynamic(() => import('@/components/module/cta'), {
    loading: () => <div className="h-64 w-full animate-pulse bg-gray-200 rounded-lg" />
});

// Keep Hero component as regular import since it's above the fold
import Hero from '@/components/module/hero';

const HomePage = () => {
    return (
        <Background>
            <Wrapper className="py-20 relative">
                <Container className="relative">
                    <Spotlight
                        className="-top-40 left-0 md:left-60 md:-top-20"
                        fill="rgba(255, 255, 255, 0.5)"
                    />
                    <Hero />
                </Container>
                <Container className="py-8 lg:py-20">
                    <Suspense fallback={<div className="h-32 w-full animate-pulse bg-gray-200 rounded-lg" />}>
                        <Companies />
                    </Suspense>
                </Container>
                <Suspense fallback={<div className="h-64 w-full animate-pulse bg-gray-200 rounded-lg" />}>
                    <Connect />
                </Suspense>
                <Suspense fallback={<div className="h-96 w-full animate-pulse bg-gray-200 rounded-lg" />}>
                    <Features />
                </Suspense>
                <Suspense fallback={<div className="h-96 w-full animate-pulse bg-gray-200 rounded-lg" />}>
                    <Perks />
                </Suspense>
                <Suspense fallback={<div className="h-96 w-full animate-pulse bg-gray-200 rounded-lg" />}>
                    <Pricing />
                </Suspense>
                <Suspense fallback={<div className="h-96 w-full animate-pulse bg-gray-200 rounded-lg" />}>
                    <Reviews />
                </Suspense>
                <Suspense fallback={<div className="h-64 w-full animate-pulse bg-gray-200 rounded-lg" />}>
                    <CTA />
                </Suspense>
            </Wrapper>
        </Background>
    )
}

export default HomePage