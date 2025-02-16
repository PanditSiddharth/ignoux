import type { Metadata } from "next";
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
    <div className="container max-w-7xl mx-auto">
      {children}
      <Footer />
    </div>
  );
}
