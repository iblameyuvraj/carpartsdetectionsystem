export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Animated gradient background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute h-full w-full animate-move-background bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900/0 from-0% via-gray-900/10 via-50% to-gray-900/0 to-100% bg-[length:200%_200%]" />
      </div>
      
      {/* Content layer */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}