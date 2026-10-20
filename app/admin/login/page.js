"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Container, Form } from "react-bootstrap";
import { adminCredentials } from "../../../data/adminConfig";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { adminLogin } from "../../../store/authSlice";

export default function AdminLoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const authenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (authenticated) router.replace("/admin");
  }, [authenticated, router]);

  function submit(event) {
    event.preventDefault();
    if (email.trim().toLowerCase() !== adminCredentials.email || password !== adminCredentials.password) {
      setError("That email and password don’t match. Please try again.");
      return;
    }
    dispatch(adminLogin(adminCredentials.email));
    router.push("/admin");
  }

  return (
    <Container className="admin-login-page">
      <Link href="/" className="admin-login-back">← Back to Coffee vth Kaavi</Link>
      <div className="admin-login-card">
        <div className="login-coffee-icon" aria-hidden="true">☕</div>
        <span className="eyebrow">A LITTLE SPACE FOR THE OWNER</span>
        <h1>Welcome <em>back.</em></h1>
        <p>Sign in to your Coffee vth Kaavi studio.</p>
        <Form onSubmit={submit}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="admin-email">Email address</Form.Label>
            <Form.Control id="admin-email" type="email" autoComplete="username" required value={email} onChange={(event) => { setEmail(event.target.value); setError(""); }} placeholder="you@example.com" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="admin-password">Password</Form.Label>
            <Form.Control id="admin-password" type="password" autoComplete="current-password" required value={password} onChange={(event) => { setPassword(event.target.value); setError(""); }} placeholder="Your password" />
          </Form.Group>
          {error && <div className="field-error mb-3" role="alert">{error}</div>}
          <Button type="submit" variant="primary" className="w-100">Sign in <span aria-hidden="true">→</span></Button>
        </Form>
        <div className="demo-credentials"><strong>Demo access</strong><br />admin@coffee.com · admin123</div>
      </div>
    </Container>
  );
}
