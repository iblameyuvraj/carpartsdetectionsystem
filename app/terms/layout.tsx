// app/terms/layout.tsx

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full">
      {/* Subtle ambient lighting effects that complement the Three.js particles */}
      <div className="absolute inset-0 z-0">
        {/* Subtle corner gradients to enhance the depth */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-purple-900/20 via-transparent to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-blue-900/20 via-transparent to-transparent blur-3xl" />
        
        {/* Animated subtle overlay that works with the particles */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/5 via-transparent to-gray-900/10 animate-pulse" style={{ animationDuration: '4s' }} />
      </div>

      {/* Content layer - let the page handle its own background */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}