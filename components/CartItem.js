"use client";

import { Button } from "react-bootstrap";
import Image from "next/image";
import { useAppDispatch } from "../store/hooks";
import { decrementItem, incrementItem, removeFromCart } from "../store/cartSlice";

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export default function CartItem({ item }) {
  const dispatch = useAppDispatch();
  return (
    <div className="cart-item">
      <Image src={item.image} alt="" width={82} height={82} unoptimized className="cart-item-image" />
      <div className="cart-item-details">
        <span className="product-category">{item.category}</span>
        <h3>{item.name}</h3>
        <span>{currency.format(item.price)} each</span>
      </div>
      <div className="quantity-control" aria-label={`${item.name} quantity`}>
        <Button variant="light" onClick={() => dispatch(decrementItem(item.id))} aria-label={`Decrease ${item.name} quantity`}>−</Button>
        <span aria-live="polite">{item.quantity}</span>
        <Button variant="light" onClick={() => dispatch(incrementItem(item.id))} aria-label={`Increase ${item.name} quantity`}>+</Button>
      </div>
      <strong className="cart-line-total">{currency.format(item.price * item.quantity)}</strong>
      <Button
        variant="link"
        className="remove-item"
        onClick={() => dispatch(removeFromCart(item.id))}
        aria-label={`Remove ${item.name} from cart`}
      >
        Remove
      </Button>
    </div>
  );
}
