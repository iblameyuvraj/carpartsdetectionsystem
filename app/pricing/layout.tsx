import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing - Car Parts Detection System',
  description: 'Choose the perfect plan for your car parts detection needs. Flexible pricing options for individuals and businesses.',
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black">
      {children}
    </div>
  );
} 