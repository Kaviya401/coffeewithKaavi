# Coffee vth Kaavi

A frontend-only coffee shop demo built with Next.js App Router, Redux Toolkit, Redux Persist, Bootstrap, and Framer Motion. Products and orders are managed locally in Redux; cart contents, customer phone number, menu edits, orders, and the demo admin session persist in the browser's local storage.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The demo shop is based in Chennai, Tamil Nadu.

## Demo admin

- Email: `admin@coffee.com`
- Password: `admin123`

The demo credentials live in `data/adminConfig.js`. This is a frontend-only demo, so authentication is not suitable for production.

## Project structure

```text
app/
  admin/                 Admin login and protected dashboard
  cart/                  Cart and checkout flow
  menu/                  Searchable, filterable menu
  order-success/         Order confirmation
  globals.css            Coffee theme and responsive styles
  layout.jsx             App shell and providers
  page.jsx               Home page
  template.jsx           Animated route transitions
components/
  AdminSidebar.jsx
  CartItem.jsx
  FallingCoffee.jsx
  Footer.jsx
  Navbar.jsx
  PhoneModal.jsx
  ProductCard.jsx
  Providers.jsx
  ScrollReveal.jsx
  ToastProvider.jsx
data/
  adminConfig.js
  products.js
store/
  authSlice.js
  cartSlice.js
  customerSlice.js
  hooks.js
  index.js
  ordersSlice.js
  productsSlice.js
```
