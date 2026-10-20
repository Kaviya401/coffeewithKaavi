"use client";

import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { motion, useReducedMotion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addToCart } from "../store/cartSlice";
import { useToast } from "./ToastProvider";

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export default function ProductCard({ product, index = 0 }) {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const cartQuantity = useAppSelector(
    (state) => state.cart.items.find((item) => item.id === product.id)?.quantity || 0,
  );
  const reduceMotion = useReducedMotion();
  const [added, setAdded] = useState(false);
  const [flight, setFlight] = useState(null);

  function handleAdd(event) {
    dispatch(addToCart({ product }));
    setAdded(true);
    window.dispatchEvent(new Event("brew:add-to-cart"));
    if (!reduceMotion) {
      const source = event.currentTarget.getBoundingClientRect();
      const target = document.querySelector(".cart-nav-link")?.getBoundingClientRect();
      if (target) {
        setFlight({
          id: Date.now(),
          fromX: source.left + source.width / 2,
          fromY: source.top + source.height / 2,
          toX: target.left + target.width / 2,
          toY: target.top + target.height / 2,
        });
      }
    }
    toast(`${product.name} added to your bag`);
    window.setTimeout(() => setAdded(false), 650);
  }

  return (
    <motion.div
      className="h-100"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : (index % 4) * 0.07 }}
    >
      {flight && (
        <motion.span
          key={flight.id}
          className="flying-cart-item"
          aria-hidden="true"
          initial={{ left: flight.fromX, top: flight.fromY, scale: 1, opacity: 1 }}
          animate={{ left: flight.toX, top: flight.toY, scale: 0.35, opacity: 0.15 }}
          transition={{ duration: 0.62, ease: [0.22, 0.72, 0.28, 1] }}
          onAnimationComplete={() => setFlight(null)}
        >
          ☕
        </motion.span>
      )}
      <Card className="product-card h-100">
        <div className="product-image-wrap">
          <Card.Img variant="top" src={product.image} alt={product.name} />
          {product.featured && <span className="featured-pill">House favorite</span>}
          {cartQuantity > 0 && <span className="quantity-pill">{cartQuantity} in your bag</span>}
        </div>
        <Card.Body className="d-flex flex-column">
          <div className="product-category">{product.category}</div>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text className="product-description">{product.description}</Card.Text>
          <div className="mt-auto d-flex align-items-center justify-content-between gap-2">
            <span className="product-price">{currency.format(product.price)}</span>
            <Button
              variant={added ? "success" : "outline-primary"}
              className={`add-button ${added ? "added" : ""}`}
              onClick={handleAdd}
              aria-label={`Add ${product.name} to cart`}
            >
              {added ? "Added ✓" : "Add to bag +"}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
}
