'use client'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Image from "next/image";
import { useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "@/redux/features/cart-slice";
import { CartItemProps } from '@/app/types/types';

const CartItem: React.FC<CartItemProps> = ({ id, image, title, price, quantity, isCartPage }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeItem(id));
    Notify.warning('The product has been removed from the cart');
  };

  const handleQuantityChange = (newQuantity: number) => {
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  return (
    <div className="border rounded-md overflow-hidden bg-white p-4 mb-4 flex items-center">
      <div className="w-20 h-20 mr-4">
        <Image width={80} height={80} src={image} alt={title} className="w-80 object-cover" />
      </div>
      <div className="flex-grow">
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-gray-600 mb-1">Price: {price * quantity}</p>
        <div className="flex items-center">
          {isCartPage && <button className={`bg-gray-200 px-2 py-1 rounded ${quantity === 1 ? 'cursor-not-allowed opacity-50' : ''}`} disabled={quantity === 1 && true} onClick={() => handleQuantityChange(quantity - 1)}>-</button>}
          <span className="mx-2 text-gray-600 mb-1">{quantity}</span>
          {isCartPage && <button className="bg-gray-200 px-2 py-1 rounded" onClick={() => handleQuantityChange(quantity + 1)}>+</button>}
        </div>
      </div>
      <button className="text-red-500 ml-4" onClick={handleRemove}>Remove</button>
    </div>
  );
};

export default CartItem;