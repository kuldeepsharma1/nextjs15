import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <main className="min-h-screen pt-5 sm:pt-10 dark:bg-zinc-950">{children}</main>
      <Footer/>
    </div>
  );
}
