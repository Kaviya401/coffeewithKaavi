import Link from "next/link";

export default function AdminSidebar({ onLogout }) {
  return (
    <aside className="admin-sidebar">
      <Link href="/" className="admin-brand">☕ Coffee vth Kaavi</Link>
      <div className="admin-sidebar-label">OWNER STUDIO</div>
      <nav aria-label="Admin navigation">
        <Link href="/admin" className="admin-side-link">▦ &nbsp; Overview &amp; menu</Link>
        <Link href="/menu" className="admin-side-link">☕ &nbsp; View customer menu</Link>
      </nav>
      <button type="button" className="admin-logout" onClick={onLogout}>↪ &nbsp; Log out</button>
    </aside>
  );
}
