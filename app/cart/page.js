"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Button, Col, Container, Row } from "react-bootstrap";
import Link from "next/link";
import CartItem from "../../components/CartItem";
import PhoneModal from "../../components/PhoneModal";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { clearCart } from "../../store/cartSlice";
import { setCustomerPhone } from "../../store/customerSlice";
import { placeOrder } from "../../store/ordersSlice";
import { useToast } from "../../components/ToastProvider";

const currency = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

export default function CartPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const toast = useToast();
  const items = useAppSelector((state) => state.cart.items);
  const phone = useAppSelector((state) => state.customer.phone);
  const [showPhone, setShowPhone] = useState(false);
  const [phonePurpose, setPhonePurpose] = useState("checkout");
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);

  function completeOrder(customerPhone) {
    if (customerPhone) dispatch(setCustomerPhone(customerPhone));
    const orderPhone = customerPhone || phone;
    if (!/^\d{10}$/.test(orderPhone)) return;
    const orderId = `BB-${Date.now().toString().slice(-7)}`;
    dispatch(placeOrder({
      id: orderId,
      items: items.map(({ id, name, price, quantity }) => ({ id, name, price, quantity })),
      total: subtotal,
      phone: orderPhone,
      time: new Date().toISOString(),
      status: "Pending",
    }));
    dispatch(clearCart());
    setShowPhone(false);
    router.push("/order-success");
  }

  function handleCheckout() {
    if (!items.length) return;
    if (!phone) {
      setPhonePurpose("checkout");
      setShowPhone(true);
    }
    else completeOrder(phone);
  }

  function handlePhoneSave(value) {
    if (phonePurpose === "change") {
      dispatch(setCustomerPhone(value));
      setShowPhone(false);
      toast("Your ordering number has been updated");
      return;
    }
    completeOrder(value);
  }

  return (
    <Container className="page-container cart-page">
      <div className="page-title-block"><span className="eyebrow">ALMOST YOURS</span><h1>Your <em>little bag.</em></h1></div>
      {items.length === 0 ? (
        <div className="empty-state cart-empty"><span aria-hidden="true">🛍️</span><h2>Your bag’s taking a coffee break.</h2><p>Let’s find something lovely to fill it with.</p><Button as={Link} href="/menu" variant="primary">Explore the menu <span aria-hidden="true">↗</span></Button></div>
      ) : (
        <Row className="g-5 align-items-start">
          <Col lg={8}>
            <div className="cart-items-list">
              <AnimatePresence initial={false}>
                {items.map((item) => <motion.div key={item.id} layout initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }} transition={{ duration: 0.22 }}><CartItem item={item} /></motion.div>)}
              </AnimatePresence>
            </div>
            <Link href="/menu" className="text-link continue-shopping">← Keep browsing</Link>
          </Col>
          <Col lg={4}>
            <div className="order-summary">
              <h2>A little summary</h2>
              <div className="summary-line"><span>Subtotal</span><strong>{currency.format(subtotal)}</strong></div>
              <div className="summary-line"><span>Pickup</span><span className="pickup-note">On us ♡</span></div>
              <div className="summary-total"><span>Total</span><strong>{currency.format(subtotal)}</strong></div>
              {phone ? (
                <div className="ordering-as">Ordering as <strong>+91 {phone}</strong> <button type="button" onClick={() => { setPhonePurpose("change"); setShowPhone(true); }}>Change</button></div>
              ) : <p className="phone-hint">We’ll ask for your mobile number at checkout.</p>}
              <Button variant="primary" className="checkout-button" onClick={handleCheckout}>Place order <span aria-hidden="true">→</span></Button>
              <p className="secure-note">Made with care, ready for pickup.</p>
            </div>
          </Col>
        </Row>
      )}
      <PhoneModal key={`${showPhone}-${phone}`} show={showPhone} onHide={() => setShowPhone(false)} initialPhone={phone} onSave={handlePhoneSave} />
    </Container>
  );
}
