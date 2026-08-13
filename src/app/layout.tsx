import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="mytheme">
      <body>
        <Navbar />
        {/* Main content of the page */}
        {children}
        {/* Footer component */}
        <Footer />
      </body>
    </html>
  );
}
