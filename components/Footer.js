import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container d-flex flex-column flex-md-row justify-content-between gap-3 align-items-md-center">
        <div>
          <Link href="/" className="footer-brand">Coffee vth Kaavi</Link>
          <p className="mb-0">A little cup of comfort, every day.</p>
        </div>
        <div className="footer-hours">Mon–Sun · 8:00 AM – 9:00 PM · Chennai, Tamil Nadu</div>
        <a href="tel:+919876543210" className="footer-contact">+91 98765 43210</a>
      </div>
    </footer>
  );
}
