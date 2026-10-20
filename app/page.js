"use client";

import Link from "next/link";
import Image from "next/image";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useAppSelector } from "../store/hooks";
import ProductCard from "../components/ProductCard";
import FallingCoffee from "../components/FallingCoffee";
import ScrollReveal from "../components/ScrollReveal";

const categories = [
  { name: "Hot Coffee", icon: "☕", note: "Warm up, slow down" },
  { name: "Cold Coffee", icon: "🧋", note: "A little cool comfort" },
  { name: "Tea", icon: "🍵", note: "Steeped with care" },
  { name: "Snacks & sweets", icon: "🥐", note: "Baked fresh daily" },
];

export default function HomePage() {
  const featured = useAppSelector((state) =>
    state.products.items.filter((item) => item.featured && item.available).slice(0, 4),
  );

  return (
    <>
      <section className="hero-section">
        <FallingCoffee count={16} className="hero-falling" />
        <Container className="hero-content">
          <Row className="align-items-center">
            <Col lg={7} className="hero-copy">
              <span className="eyebrow"><span /> YOUR NEIGHBORHOOD COFFEE SPOT</span>
              <h1>Good days start<br />with <em>good coffee.</em></h1>
              <p>Thoughtfully brewed, freshly baked, and always served with a little extra love.</p>
              <div className="d-flex flex-wrap gap-3">
                <Button as={Link} href="/menu" variant="primary" size="lg" className="button-warm">Order now <span aria-hidden="true">↗</span></Button>
                <a href="#about" className="text-link">Get to know us <span aria-hidden="true">↓</span></a>
              </div>
              <div className="hero-proof"><span>★★★★★</span> &nbsp;A little local love, in every cup</div>
            </Col>
            <Col lg={5} className="hero-art-col">
              <div className="hero-art">
                <div className="hero-sun" />
                <div className="hero-image" role="img" aria-label="A freshly brewed latte on a cafe table" />
                <div className="hero-cup" aria-hidden="true"><span className="steam steam-one" /><span className="steam steam-two" /><span className="cup-coffee" /><span className="cup-handle" /></div>
                <div className="hero-note">Brewed with<br /><strong>good feelings</strong> ☀</div>
                <div className="hero-leaf" aria-hidden="true">✳</div>
              </div>
            </Col>
          </Row>
        </Container>
        <div className="hero-bottom-note">MADE WITH LOVE · CHENNAI</div>
      </section>

      <section className="section-space" id="favorites">
        <Container>
          <ScrollReveal className="section-heading">
            <div><span className="eyebrow">A FEW GOOD THINGS</span><h2>The neighborhood <em>favorites.</em></h2></div>
            <Link href="/menu" className="text-link">See the full menu <span aria-hidden="true">↗</span></Link>
          </ScrollReveal>
          <Row className="g-4">
            {featured.map((product, index) => (
              <Col sm={6} lg={3} key={product.id}><ProductCard product={product} index={index} /></Col>
            ))}
            {featured.length === 0 && <Col><p className="empty-inline">Our favorites are getting ready. Check back in a moment!</p></Col>}
          </Row>
        </Container>
      </section>

      <section className="category-section section-space">
        <Container>
          <ScrollReveal className="section-heading centered-heading">
            <div><span className="eyebrow">SOMETHING FOR EVERY MOOD</span><h2>Pick your <em>little pleasure.</em></h2></div>
          </ScrollReveal>
          <Row className="g-3">
            {categories.map((category, index) => (
              <Col sm={6} lg={3} key={category.name}>
                <ScrollReveal delay={index * 0.06}>
                  <Link href="/menu" className="category-card">
                    <span className="category-icon" aria-hidden="true">{category.icon}</span>
                    <strong>{category.name}</strong><small>{category.note}</small><span className="category-arrow">↗</span>
                  </Link>
                </ScrollReveal>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section id="about" className="about-section section-space">
        <Container>
          <Row className="align-items-center g-5">
            <Col lg={6}>
              <ScrollReveal>
                <div className="about-photo-wrap"><Image src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1000&q=85" alt="Sunlight filling a cozy neighborhood cafe" width={1000} height={700} unoptimized /><span>COME AS YOU ARE ♡</span></div>
              </ScrollReveal>
            </Col>
            <Col lg={6}>
              <ScrollReveal>
                <span className="eyebrow">A LITTLE ABOUT US</span>
                <h2>More than coffee.<br /><em>A place to belong.</em></h2>
                <p className="about-copy">We’re your corner table, your catch-up spot, your “one more cup” kind of place. We source good beans, bake every morning, and believe the best things happen when you take a moment to stay.</p>
                <div className="about-details">
                  <div><span>⌖</span><p><strong>Come find us</strong><br />Chennai, Tamil Nadu</p></div>
                  <div><span>◷</span><p><strong>We’re here for you</strong><br />Every day, 8:00 AM – 9:00 PM</p></div>
                  <div><span>✉</span><p><strong>Say hello</strong><br /><a href="tel:+919876543210">+91 98765 43210</a></p></div>
                </div>
              </ScrollReveal>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
