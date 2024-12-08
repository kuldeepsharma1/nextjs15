

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div >
      <main className="min-h-screen dark:bg-zinc-800">
        {children}
      </main>
    </div>
  );
}
