
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <main>{children}</main>
     <Footer/>
    </div>
  );
}
