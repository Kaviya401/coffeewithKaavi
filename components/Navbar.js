"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Badge, Container, Nav, Navbar as BootstrapNavbar } from "react-bootstrap";
import { useAppSelector } from "../store/hooks";

export default function Navbar() {
  const items = useAppSelector((state) => state.cart.items);
  const count = items.reduce((total, item) => total + item.quantity, 0);
  const [bouncing, setBouncing] = useState(false);

  useEffect(() => {
    const bounce = () => {
      setBouncing(true);
      window.setTimeout(() => setBouncing(false), 520);
    };
    window.addEventListener("brew:add-to-cart", bounce);
    return () => window.removeEventListener("brew:add-to-cart", bounce);
  }, []);

  return (
    <BootstrapNavbar expand="lg" sticky="top" className="brew-navbar">
      <Container>
        <BootstrapNavbar.Brand as={Link} href="/" className="brand-mark">
          <span aria-hidden="true">☕</span> Coffee vth Kaavi
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="main-navigation" aria-label="Toggle navigation" />
        <BootstrapNavbar.Collapse id="main-navigation">
          <Nav className="ms-auto align-items-lg-center gap-lg-3">
            <Nav.Link as={Link} href="/">Home</Nav.Link>
            <Nav.Link as={Link} href="/menu">Our menu</Nav.Link>
            <Nav.Link as={Link} href="/#about">Our story</Nav.Link>
            <Nav.Link as={Link} href="/cart" className="cart-nav-link" aria-label={`Cart, ${count} items`}>
              <span className={bouncing ? "cart-icon bounce" : "cart-icon"}>🛍️</span>
              <span className="cart-nav-text">Cart</span>
              <Badge bg="success" pill className="cart-badge">{count}</Badge>
            </Nav.Link>
            <Nav.Link as={Link} href="/admin/login" className="admin-nav-link">Owner login</Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}
