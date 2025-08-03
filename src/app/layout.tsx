import Footer from "./footer/Footer";
import "./globals.css";
import Navbar from "./navbar/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<html data-theme="mytheme">
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
