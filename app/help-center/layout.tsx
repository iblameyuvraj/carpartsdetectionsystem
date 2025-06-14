import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Help Center - Car Parts Detection System',
  description: 'Get help and support for the Car Parts Detection System. Find answers to common questions, tutorials, and documentation.',
};

export default function HelpCenterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 