import AppFooter from "@/components/Footer/AppFooter";
import AppHeader from "@/components/Header/AppHeader";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AppHeader />
      <main className="min-h-screen pt-5 sm:pt-10 dark:bg-zinc-950">{children}</main>
      <AppFooter/>
    </div>
  );
}
