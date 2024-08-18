import { Inter, Poppins, Mulish, Playfair_Display } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const mulsih = Mulish({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: "400" });
const playfair = Playfair_Display({subsets:["latin"]})

export const metadata = {
  title: "EcommerceApp",
  description: "Ecommerce Store that sells Watches!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}
      suppressContentEditableWarning
      suppressHydrationWarning>
        <AuthProvider>
          <Navbar/>
          {children}
          <Footer/>
          </AuthProvider>
      </body>
    </html>
  );
}
