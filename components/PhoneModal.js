"use client";

import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { motion } from "framer-motion";

export default function PhoneModal({ show, onHide, initialPhone = "", onSave }) {
  const [phone, setPhone] = useState(initialPhone);
  const [error, setError] = useState("");

  function submit(event) {
    event.preventDefault();
    const normalized = phone.replace(/\D/g, "");
    if (!/^\d{10}$/.test(normalized)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    onSave(normalized);
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}>
        <Modal.Header closeButton>
          <Modal.Title>{initialPhone ? "Change your number" : "Where should we reach you?"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={submit} noValidate>
          <Modal.Body>
            <p className="text-muted">We’ll use your number for this order. No account needed.</p>
            <Form.Label htmlFor="customer-phone">Mobile number</Form.Label>
            <div className="phone-input-group">
              <span aria-hidden="true">+91</span>
              <Form.Control
                id="customer-phone"
                inputMode="numeric"
                autoComplete="tel-national"
                maxLength={10}
                value={phone}
                onChange={(event) => {
                  setPhone(event.target.value.replace(/\D/g, "").slice(0, 10));
                  setError("");
                }}
                placeholder="98765 43210"
                aria-describedby={error ? "phone-error" : undefined}
                aria-invalid={Boolean(error)}
                autoFocus
              />
            </div>
            {error && <div id="phone-error" className="field-error" role="alert">{error}</div>}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="light" onClick={onHide}>Cancel</Button>
            <Button type="submit" variant="primary">Save number</Button>
          </Modal.Footer>
        </Form>
      </motion.div>
    </Modal>
  );
}
