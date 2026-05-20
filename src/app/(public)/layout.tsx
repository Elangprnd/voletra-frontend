import Navbar from "../../components/organism/Navbar";
import Footer from "../../components/organism/Footer";
import AuthModal from "@/components/organism/AuthModal";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <AuthModal />
      <Footer />
    </>
  );
}
