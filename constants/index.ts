import { ChartSplineIcon, LifeBuoyIcon, PaletteIcon, ShieldCheckIcon, WaypointsIcon, ZapIcon } from "lucide-react";

type PLAN = {
    id: string;
    title: string;
    desc: string;
    monthlyPrice: number;
    yearlyPrice: number;
    badge?: string;
    buttonText: string;
    features: string[];
    link: string;
};

export const PLANS: PLAN[] = [
    {
        id: "free",
        title: "Free",
        desc: "Get started with essential tools for social media content creation",
        monthlyPrice: 0,
        yearlyPrice: 0,
        buttonText: "Get Started",
        features: [
            "Basic AI content generation",
            "4 social media integrations",
            "Community support",
            "1 project limit",
            "Standard analytics",
            "Basic image generation"
        ],
        link: "https://stripe.com/free-plan-link"
    },
    {
        id: "pro",
        title: "Pro",
        desc: "Unlock advance features for enhanced content and strategy",
        monthlyPrice: 10,
        yearlyPrice: 120,
        badge: "Most Popular",
        buttonText: "Upgrade to Pro",
        features: [
            "Advanced AI content generation",
            "10 social media integrations",
            "Priority email support",
            "10 project limit",
            "Enhanced analytics & insights",
            "Pro model image generation",
            "Team collaboration tools",
            "Custom branding options"
        ],
        link: "https://stripe.com/pro-plan-link"
    },
    {
        id: "enterprise",
        title: "Enterprise",
        desc: "Tailored solutions for large organizations and agencies",
        monthlyPrice: 15,
        yearlyPrice: 180,
        badge: "Contact Sales",
        buttonText: "Upgrade to Enterprise",
        features: [
            "Unlimited AI content generation",
            "All social media integrations",
            "Dedicated account manager",
            "Unlimited projects",
            "Custom analytics & reporting",
            "Enterprise-grade security",
            "Free updates",
            // "24/7 priority support"
        ],
        link: "https://stripe.com/enterprise-plan-link"
    }
];

type REVIEW = {
    name: string;
    username: string;
    review: string;
    img: string;
};

export const REVIEWS: REVIEW[] = [
    {
        name: "Arjun Singh",
        username: "@arjunsingh",
        review: "This platform has revolutionized the way I manage my projects. The AI tools are a game-changer!",
        img: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
        name: "Priya Nair",
        username: "@priyanair",
        review: "Absolutely love the seamless integration with social media. It's made my content creation process so much easier.",
        img: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
        name: "Rohan Mehta",
        username: "@rohanmehta",
        review: "The features offered here are unmatched. My productivity has soared since I started using this service.",
        img: "https://randomuser.me/api/portraits/men/3.jpg"
    },
    {
        name: "Sneha Patel",
        username: "@snehapatel",
        review: "Customer support is top-notch. They’re always ready to assist with any queries I have.",
        img: "https://randomuser.me/api/portraits/women/4.jpg"
    },
    {
        name: "Ankit Sharma",
        username: "@ankitsharma",
        review: "The customization options available are perfect for my business needs. Highly recommended!",
        img: "https://randomuser.me/api/portraits/men/5.jpg"
    },
    {
        name: "Meera Kapoor",
        username: "@meerakapoor",
        review: "The intuitive design and ease of use make this platform stand out. It's a must-have for any business.",
        img: "https://randomuser.me/api/portraits/women/6.jpg"
    },
    {
        name: "Vikram Desai",
        username: "@vikramdesai",
        review: "From analytics to AI-powered tools, this service covers everything I need to grow my business.",
        img: "https://randomuser.me/api/portraits/men/7.jpg"
    },
    {
        name: "Anjali Menon",
        username: "@anjalimenon",
        review: "I’m impressed with how much value I’m getting at this price point. It's worth every penny!",
        img: "https://randomuser.me/api/portraits/women/8.jpg"
    },
    {
        name: "Karan Gupta",
        username: "@karangupta",
        review: "The AI content generation is phenomenal. It saves me hours of work every week.",
        img: "https://randomuser.me/api/portraits/men/9.jpg"
    },
    {
        name: "Neha Verma",
        username: "@nehaverma",
        review: "I love how everything is organized in one place. It makes managing my tasks so much easier.",
        img: "https://randomuser.me/api/portraits/women/10.jpg"
    },
    {
        name: "Siddharth Jain",
        username: "@siddharthjain",
        review: "Their platform is robust, and I have seen a significant improvement in my workflow since I started using it.",
        img: "https://randomuser.me/api/portraits/men/11.jpg"
    },
    {
        name: "Divya Iyer",
        username: "@divyaiyer",
        review: "Fantastic service! The updates and new features keep getting better and better.",
        img: "https://randomuser.me/api/portraits/women/12.jpg"
    }
];

export const FOOTER_LINKS = [
    {
        title: "Product",
        links: [
            { name: "Home", href: "/" },
            { name: "Features", href: "/" },
            { name: "Pricing", href: "/" },
            { name: "Contact", href: "/" },
            { name: "Download", href: "/" },
        ],
    },
    {
        title: "Resources",
        links: [
            { name: "Blog", href: "/blog" },
            { name: "Help Center", href: "/help-center" },
            { name: "Community", href: "/community" },
            { name: "Guides", href: "/guides" },
        ],
    },
    {
        title: "Legal",
        links: [
            { name: "Privacy", href: "/privacy" },
            { name: "Terms", href: "/terms" },
            { name: "Cookies", href: "/cookies" },
        ],
    },
    {
        title: "Developers",
        links: [
            { name: "API Docs", href: "/api-docs" },
            { name: "SDKs", href: "/sdks" },
            { name: "Tools", href: "/tools" },
            { name: "Open Source", href: "/open-source" },
            { name: "Changelog", href: "/changelog" },
        ],
    },
];

export const PERKS = [
    {
        icon: ZapIcon,
        title: "Fast and Efficient",
        description: "Experience quick and seamless content creation with our optimized AI tools."
    },
    {
        icon: ChartSplineIcon,
        title: "Insightful Analytics",
        description: "Gain valuable insights and analytics to enhance your social media strategy."
    },
    {
        icon: LifeBuoyIcon,
        title: "24/7 Support",
        description: "Our team is available around the clock to assist with any issues or questions."
    },
    {
        icon: PaletteIcon,
        title: "Customizable Solutions",
        description: "Tailor the tools and features to fit your unique social media needs."
    },
    {
        icon: ShieldCheckIcon,
        title: "Secure and Reliable",
        description: "Trust our platform to keep your data safe and ensure consistent performance."
    },
    {
        icon: WaypointsIcon,
        title: "Seamless Integration",
        description: "Easily integrate with your existing social media platforms and tools."
    },
];