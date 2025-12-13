// src/components/Background.tsx
export default function Background() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Floating orbs - positioned away from center */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#b8860b]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-[#b8860b]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-3xl" />

      {/* Particles */}
      <div className="absolute top-[20%] left-[10%] w-0.5 h-0.5 bg-[#b8860b]/30 rounded-full animate-pulse" />
      <div className="absolute top-[60%] left-[85%] w-1 h-1 bg-[#b8860b]/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-[40%] left-[70%] w-0.5 h-0.5 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-[80%] left-[20%] w-0.5 h-0.5 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '3s' }} />
    </div>
  )
}
