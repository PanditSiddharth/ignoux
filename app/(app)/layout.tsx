import type { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "IGNOUX.in",
  description: "Best plateform for ignou student and coders",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div >
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
