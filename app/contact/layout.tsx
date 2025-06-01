// app/contact/layout.tsx

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Animated gradient background layers */}
      <div className="absolute inset-0 z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
        
        {/* Animated overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 via-transparent to-purple-900/30 animate-pulse" 
             style={{ animationDuration: '4s' }} />
        
        {/* Moving light spots */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-cyan-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl animate-bounce" 
             style={{ animationDuration: '6s' }} />
        
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-radial from-purple-500/20 via-pink-500/10 to-transparent rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '8s' }} />
        
        {/* Floating orbs */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 bg-blue-400/60 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
        </div>
        
        <div className="absolute top-1/3 right-1/3">
          <div className="w-3 h-3 bg-purple-400/60 rounded-full animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        </div>
        
        <div className="absolute bottom-1/4 left-1/3">
          <div className="w-2 h-2 bg-cyan-400/60 rounded-full animate-ping" style={{ animationDuration: '5s', animationDelay: '2s' }} />
        </div>
      </div>

      {/* Content layer */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}