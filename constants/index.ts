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
        desc: "Get started with essential tools for AI car part detection.",
        monthlyPrice: 0,
        yearlyPrice: 0,
        buttonText: "Get Started",
        features: [
            "Basic car part detection",
            "Upload up to 100 images/month",
            "Community support",
            "1 project limit",
            "Standard detection analytics",
            "Basic reporting"
        ],
        link: "https://stripe.com/free-plan-link"
    },
    {
        id: "pro",
        title: "Pro",
        desc: "Unlock advanced features for more accurate and faster car part detection.",
        monthlyPrice: 10,
        yearlyPrice: 120,
        badge: "Most Popular",
        buttonText: "Upgrade to Pro",
        features: [
            "Advanced AI detection models",
            "Upload up to 2,000 images/month",
            "Priority email support",
            "10 project limit",
            "Detailed analytics & insights",
            "Batch image processing",
            "Team collaboration tools",
            "Custom detection reports"
        ],
        link: "https://stripe.com/pro-plan-link"
    },
    {
        id: "enterprise",
        title: "Enterprise",
        desc: "Tailored AI car part detection solutions for large organizations and automotive businesses.",
        monthlyPrice: 15,
        yearlyPrice: 180,
        badge: "Contact Sales",
        buttonText: "Upgrade to Enterprise",
        features: [
            "Unlimited image uploads",
            "All detection models included",
            "Dedicated account manager",
            "Unlimited projects",
            "Custom analytics & reporting",
            "Enterprise-grade security",
            "Free updates"
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
        review: "The AI car part detection system has streamlined our inspection process. Highly accurate and easy to use!",
        img: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
        name: "Priya Nair",
        username: "@priyanair",
        review: "Uploading images and getting instant car part identification saves us hours every week.",
        img: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
        name: "Rohan Mehta",
        username: "@rohanmehta",
        review: "The detection accuracy is impressive. Our team relies on it for quality checks.",
        img: "https://randomuser.me/api/portraits/men/3.jpg"
    },
    {
        name: "Sneha Patel",
        username: "@snehapatel",
        review: "Customer support is responsive and knowledgeable about automotive AI.",
        img: "https://randomuser.me/api/portraits/women/4.jpg"
    },
    {
        name: "Ankit Sharma",
        username: "@ankitsharma",
        review: "Custom reporting helps us track part defects and improve our workflow.",
        img: "https://randomuser.me/api/portraits/men/5.jpg"
    },
    {
        name: "Meera Kapoor",
        username: "@meerakapoor",
        review: "The platform is intuitive and fits perfectly into our inspection process.",
        img: "https://randomuser.me/api/portraits/women/6.jpg"
    },
    {
        name: "Vikram Desai",
        username: "@vikramdesai",
        review: "From analytics to batch processing, this system covers all our needs.",
        img: "https://randomuser.me/api/portraits/men/7.jpg"
    },
    {
        name: "Anjali Menon",
        username: "@anjalimenon",
        review: "Great value for the price. The detection speed is unmatched.",
        img: "https://randomuser.me/api/portraits/women/8.jpg"
    },
    {
        name: "Karan Gupta",
        username: "@karangupta",
        review: "AI-powered detection has reduced our manual work significantly.",
        img: "https://randomuser.me/api/portraits/men/9.jpg"
    },
    {
        name: "Neha Verma",
        username: "@nehaverma",
        review: "Everything is organized and easy to access. Detection results are clear and actionable.",
        img: "https://randomuser.me/api/portraits/women/10.jpg"
    },
    {
        name: "Siddharth Jain",
        username: "@siddharthjain",
        review: "Robust platform with continuous improvements. Highly recommended for automotive businesses.",
        img: "https://randomuser.me/api/portraits/men/11.jpg"
    },
    {
        name: "Divya Iyer",
        username: "@divyaiyer",
        review: "Fantastic service! The detection models keep getting better and more accurate.",
        img: "https://randomuser.me/api/portraits/women/12.jpg"
    }
];

export const FOOTER_LINKS = [
    {
        title: "Product",
        links: [
            { name: "Home", href: "/sign-up" },
            { name: "Pricing(soon)", href: "/" },
            { name: "Contact", href: "/contact" },
            { name: "comming soon", href: "/" },
        ],
    },
    {
        title: "Resources",
        links: [
            // { name: "Blog", href: "/blog" },
            { name: "Help Center", href: "/contact" },
            // { name: "Community", href: "/community" },
            // { name: "Guides", href: "/guides" },
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
            { name: "Tools", href: "/tools" },
            { name: "Open Source", href: "/open-source" },
            { name: "Changelog", href: "/changelog" },
        ],
    },
];

export const PERKS = [
    {
        icon: ZapIcon,
        title: "Fast Detection",
        description: "Experience quick and accurate car part identification with our optimized AI models."
    },
    {
        icon: ChartSplineIcon,
        title: "Detailed Analytics",
        description: "Gain valuable insights and analytics on detected car parts and inspection results."
    },
    {
        icon: LifeBuoyIcon,
        title: "24/7 Support",
        description: "Our team is available around the clock to assist with any technical issues or questions."
    },
    {
        icon: PaletteIcon,
        title: "Customizable Workflows",
        description: "Tailor detection workflows and reports to fit your automotive business needs."
    },
    {
        icon: ShieldCheckIcon,
        title: "Secure and Reliable",
        description: "Trust our platform to keep your data safe and ensure consistent detection performance."
    },
    {
        icon: WaypointsIcon,
        title: "Seamless Integration",
        description: "Easily integrate with your existing automotive tools and platforms."
    },
];
