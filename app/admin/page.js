"use client";

import { useMemo, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addProduct, deleteProduct, toggleProductAvailability, updateProduct } from "../../store/productsSlice";
import { updateOrderStatus } from "../../store/ordersSlice";
import { productCategories } from "../../data/products";
import { useToast } from "../../components/ToastProvider";

const currency = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
const emptyForm = { name: "", price: "", category: "Hot Coffee", image: "", description: "", available: true };

function formatOrderTime(value) {
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

export default function AdminDashboardPage() {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const orders = useAppSelector((state) => state.orders.items);
  const products = useAppSelector((state) => state.products.items);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [formError, setFormError] = useState("");

  const revenue = useMemo(() => orders.reduce((sum, order) => sum + order.total, 0), [orders]);
  const pending = orders.filter((order) => order.status === "Pending").length;

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
    setFormError("");
  }

  function submitProduct(event) {
    event.preventDefault();
    if (!form.name.trim() || !Number.isFinite(Number(form.price)) || Number(form.price) <= 0) {
      setFormError("Add a product name and a price greater than zero.");
      return;
    }
    const product = {
      ...form,
      id: editingId || `item-${Date.now()}`,
      name: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      image: form.image.trim() || "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=85",
      featured: editingId ? Boolean(products.find((item) => item.id === editingId)?.featured) : false,
    };
    if (editingId) {
      dispatch(updateProduct(product));
      toast("Menu item updated");
    } else {
      dispatch(addProduct(product));
      toast("New menu item added");
    }
    resetForm();
  }

  function editProduct(product) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      price: String(product.price),
      category: product.category,
      image: product.image,
      description: product.description,
      available: product.available,
    });
    setFormError("");
    document.getElementById("menu-editor")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function removeProduct(product) {
    if (window.confirm(`Remove “${product.name}” from the menu?`)) {
      dispatch(deleteProduct(product.id));
      toast("Menu item removed");
      if (editingId === product.id) resetForm();
    }
  }

  return (
    <div className="dashboard-content">
      <header className="dashboard-header">
        <div><span className="eyebrow">YOUR LITTLE COFFEE CORNER</span><h1>Good morning, <em>owner.</em></h1><p>Here’s what’s happening at your shop today.</p></div>
        <div className="dashboard-date">{new Intl.DateTimeFormat("en-IN", { dateStyle: "full" }).format(new Date())}</div>
      </header>

      <section className="stats-grid" aria-label="Shop statistics">
        <article className="stat-card"><span className="stat-icon">🧾</span><span>Total orders</span><strong>{orders.length}</strong><small>All-time orders</small></article>
        <article className="stat-card"><span className="stat-icon">⏳</span><span>Pending orders</span><strong>{pending}</strong><small>Need a little attention</small></article>
        <article className="stat-card"><span className="stat-icon">☕</span><span>Revenue</span><strong>{currency.format(revenue)}</strong><small>From placed orders</small></article>
        <article className="stat-card"><span className="stat-icon">🥐</span><span>Menu items</span><strong>{products.length}</strong><small>Across {productCategories.length} categories</small></article>
      </section>

      <section className="admin-panel">
        <div className="panel-heading"><div><span className="eyebrow">FRESH FROM THE COUNTER</span><h2>Orders</h2></div><span className="order-count">{orders.length} total</span></div>
        {orders.length ? (
          <div className="table-responsive">
            <Table hover className="admin-table align-middle">
              <thead><tr><th>Order</th><th>Customer</th><th>Items</th><th>Total</th><th>Placed</th><th>Status</th></tr></thead>
              <tbody>{orders.map((order) => (
                <tr key={order.id}>
                  <td><strong>{order.id}</strong></td>
                  <td>+91 {order.phone}</td>
                  <td>{order.items.map((item) => `${item.name} × ${item.quantity}`).join(", ")}</td>
                  <td><strong>{currency.format(order.total)}</strong></td>
                  <td>{formatOrderTime(order.time)}</td>
                  <td><Form.Select aria-label={`Update status for order ${order.id}`} value={order.status} onChange={(event) => dispatch(updateOrderStatus({ id: order.id, status: event.target.value }))} className={`status-select status-${order.status.toLowerCase()}`}>
                    {["Pending", "Preparing", "Ready", "Completed"].map((status) => <option key={status}>{status}</option>)}
                  </Form.Select></td>
                </tr>
              ))}</tbody>
            </Table>
          </div>
        ) : <div className="admin-empty">No orders yet. They’ll show up here as soon as someone places one. ☕</div>}
      </section>

      <section className="admin-panel menu-management">
        <div className="panel-heading"><div><span className="eyebrow">WHAT’S ON THE COUNTER</span><h2>Menu management</h2></div></div>
        <div className="table-responsive">
          <Table hover className="admin-table align-middle">
            <thead><tr><th>Item</th><th>Category</th><th>Price</th><th>Availability</th><th>Actions</th></tr></thead>
            <tbody>{products.map((product) => (
              <tr key={product.id}>
                <td><div className="admin-product-name"><Image src={product.image} alt="" width={43} height={43} unoptimized /><span><strong>{product.name}</strong><small>{product.description}</small></span></div></td>
                <td>{product.category}</td>
                <td>{currency.format(product.price)}</td>
                <td><Form.Check type="switch" id={`availability-${product.id}`} label={product.available ? "Available" : "Sold out"} checked={product.available} onChange={() => dispatch(toggleProductAvailability(product.id))} /></td>
                <td><div className="admin-actions"><Button size="sm" variant="outline-primary" onClick={() => editProduct(product)}>Edit</Button><Button size="sm" variant="outline-danger" onClick={() => removeProduct(product)}>Delete</Button></div></td>
              </tr>
            ))}</tbody>
          </Table>
        </div>
        <div className="menu-editor" id="menu-editor">
          <div className="panel-heading"><div><span className="eyebrow">{editingId ? "MAKE IT JUST RIGHT" : "SOMETHING NEW?"}</span><h3>{editingId ? "Edit menu item" : "Add a menu item"}</h3></div>{editingId && <Button variant="link" onClick={resetForm}>Cancel edit</Button>}</div>
          <Form onSubmit={submitProduct}>
            <div className="menu-form-grid">
              <Form.Group><Form.Label htmlFor="product-name">Name</Form.Label><Form.Control id="product-name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="e.g. Maple latte" required /></Form.Group>
              <Form.Group><Form.Label htmlFor="product-price">Price (₹)</Form.Label><Form.Control id="product-price" type="number" min="1" step="1" value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} placeholder="220" required /></Form.Group>
              <Form.Group><Form.Label htmlFor="product-category">Category</Form.Label><Form.Select id="product-category" value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}>{productCategories.map((category) => <option key={category}>{category}</option>)}</Form.Select></Form.Group>
              <Form.Group className="form-wide"><Form.Label htmlFor="product-image">Image URL</Form.Label><Form.Control id="product-image" type="url" value={form.image} onChange={(event) => setForm({ ...form, image: event.target.value })} placeholder="https://..." /></Form.Group>
              <Form.Group className="form-wide"><Form.Label htmlFor="product-description">Description</Form.Label><Form.Control id="product-description" as="textarea" rows={2} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="What makes it special?" /></Form.Group>
              <Form.Check className="align-self-center" type="switch" id="product-available" label="Available to order" checked={form.available} onChange={(event) => setForm({ ...form, available: event.target.checked })} />
            </div>
            {formError && <div className="field-error mt-3" role="alert">{formError}</div>}
            <Button type="submit" variant="primary" className="mt-3">{editingId ? "Save changes" : "Add to menu"} <span aria-hidden="true">→</span></Button>
          </Form>
        </div>
      </section>
    </div>
  );
}
