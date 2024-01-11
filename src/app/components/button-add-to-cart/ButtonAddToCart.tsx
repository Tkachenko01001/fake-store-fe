'use client'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity } from "@/redux/features/cart-slice";
import { selectCart } from '@/redux/selectors/selectors';
import { CartItemProps, Product } from '@/app/types/types';
import { ButtonAddToCartProps } from '@/app/types/types';

const ButtonAddToCart: React.FC<ButtonAddToCartProps> = ({ item }) => {
  const { items } = useSelector(selectCart);
  const dispatch = useDispatch();

  const handleClickForBuy = (e: React.MouseEvent<HTMLButtonElement>, item: Product) => {
    e.preventDefault();

    const existingItem = items.find((cartItem: CartItemProps) => cartItem.id === item.id);

    if (existingItem) {
      dispatch(updateQuantity({ id: item.id, quantity: Number(existingItem.quantity) + 1}));
    } else {
      dispatch(addToCart({ ...item, quantity: 1 }));
    }

    Notify.success('The product has been added to the cart');
  };

  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded-md transition hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 max-lg:py-1 px-1 lg:text-sm"
      onClick={(e) => handleClickForBuy(e, item)}
    >
      Add to Cart
    </button>
  );
};

export default ButtonAddToCart;