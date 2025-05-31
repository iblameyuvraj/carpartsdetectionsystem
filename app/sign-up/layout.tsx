export default function SignUpLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="mx-auto w-full max-w-7xl z-40 relative min-h-[calc(100vh-140px)]">
        {children}
      </main>
    </>
  );
}