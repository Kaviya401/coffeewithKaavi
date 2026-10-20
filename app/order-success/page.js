"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Button, Container } from "react-bootstrap";
import { useAppSelector } from "../../store/hooks";

export default function OrderSuccessPage() {
  const reduceMotion = useReducedMotion();
  const lastOrderId = useAppSelector((state) => state.orders.lastOrderId);
  return (
    <Container className="success-page">
      <div className="success-card">
        <motion.div className="success-check" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 180, delay: reduceMotion ? 0 : 0.12 }} aria-label="Order confirmed">
          <motion.svg viewBox="0 0 52 52" role="img" aria-hidden="true"><motion.path d="M14 27l8 8 17-18" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : 0.25 }} /></motion.svg>
        </motion.div>
        <span className="eyebrow">THAT’S A GOOD CHOICE</span>
        <h1>Your order is <em>brewing.</em></h1>
        <p>Thanks for choosing your local coffee spot. We can’t wait to make this for you.</p>
        {lastOrderId && <div className="order-id">Order number <strong>{lastOrderId}</strong></div>}
        <Button as={Link} href="/menu" variant="primary">Back to the menu <span aria-hidden="true">↗</span></Button>
      </div>
    </Container>
  );
}
