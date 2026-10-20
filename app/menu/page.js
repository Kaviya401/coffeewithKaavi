"use client";

import { useMemo, useState } from "react";
import { Button, Col, Container, Form, Row, Tab, Tabs } from "react-bootstrap";
import ProductCard from "../../components/ProductCard";
import { useAppSelector } from "../../store/hooks";
import { productCategories } from "../../data/products";

export default function MenuPage() {
  const products = useAppSelector((state) => state.products.items);
  const status = useAppSelector((state) => state.products.status);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");

  const filtered = useMemo(() => {
    const result = products.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const query = search.trim().toLowerCase();
      const matchesSearch = !query || `${product.name} ${product.description} ${product.category}`.toLowerCase().includes(query);
      return product.available && matchesCategory && matchesSearch;
    });
    if (sort === "low") result.sort((a, b) => a.price - b.price);
    if (sort === "high") result.sort((a, b) => b.price - a.price);
    if (sort === "featured") result.sort((a, b) => Number(b.featured) - Number(a.featured));
    return result;
  }, [products, category, search, sort]);

  return (
    <Container className="page-container menu-page">
      <div className="menu-page-heading">
        <div><span className="eyebrow">MADE FRESH, JUST FOR YOU</span><h1>Our <em>menu.</em></h1><p>Find your usual, or discover a new favorite.</p></div>
        <div className="menu-cup" aria-hidden="true">☕</div>
      </div>
      <div className="menu-toolbar">
        <Tabs activeKey={category} onSelect={(key) => setCategory(key || "All")} className="category-tabs" aria-label="Filter by category">
          <Tab eventKey="All" title="Everything" />
          {productCategories.map((item) => <Tab key={item} eventKey={item} title={item} />)}
        </Tabs>
        <div className="menu-filters">
          <Form.Control type="search" placeholder="Search coffee, bakes..." value={search} onChange={(event) => setSearch(event.target.value)} aria-label="Search menu" />
          <Form.Select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort menu">
            <option value="featured">Sort: Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option>
          </Form.Select>
        </div>
      </div>
      {status === "loading" ? (
        <Row className="g-4">{Array.from({ length: 4 }, (_, index) => <Col sm={6} lg={3} key={index}><div className="skeleton-card"><div /><span /><span /></div></Col>)}</Row>
      ) : filtered.length > 0 ? (
        <Row className="g-4">{filtered.map((product, index) => <Col sm={6} lg={3} key={product.id}><ProductCard product={product} index={index} /></Col>)}</Row>
      ) : (
        <div className="empty-state"><span aria-hidden="true">🔎</span><h2>Nothing brewing here just yet.</h2><p>Try another search or choose a different category.</p><Button variant="outline-primary" onClick={() => { setSearch(""); setCategory("All"); }}>Show me everything</Button></div>
      )}
    </Container>
  );
}
