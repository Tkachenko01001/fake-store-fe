'use client'
import Link from "next/link";
import { selectCart } from "@/redux/selectors/selectors";
import { useSelector } from "react-redux";
import CartItem from "../components/cart-item/cartItem";
import { CartItemProps } from "../types/types";

const Cart = () => {
  const {items} = useSelector(selectCart);

  return (
  <div className="container mx-auto my-10">
    {items.length > 0 ? (
      <>
        <h2 className="text-3xl font-bold mb-5">Shopping Cart</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
          {items.map((item: CartItemProps) => (
            <CartItem key={item.id} {...item} isCartPage={true} />
          ))}
        </div>
        <Link className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue" href="/order">
          Place Order
        </Link>
      </>
    ) : (
     <h1 className="text-3xl font-bold text-center mt-8"> Your Cart is Empty 😢</h1>
    )}
  </div>
);
};

export default Cart;