import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Providers from "../components/Providers";
import FallingCoffee from "../components/FallingCoffee";

export const metadata = {
  title: "Coffee vth Kaavi | Your neighborhood coffee, made lovely",
  description: "Thoughtfully brewed coffee, fresh bakes, and little moments of comfort at Coffee vth Kaavi in Chennai.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <FallingCoffee count={10} className="page-falling" />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
