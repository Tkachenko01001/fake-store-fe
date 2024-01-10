'use client'

import { ChangeEvent, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useSelector } from 'react-redux';
import { selectCart } from '@/redux/selectors/selectors';
import { useState } from 'react';
import CartItem from '../components/cart-item/cartItem';
import { CartItemProps } from '../types/types';

const Order = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        managerEmail: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        managerEmail: '',
    });
    
    const { items } = useSelector(selectCart);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const validateForm = () => {
        let isValid = true;

        if (!formData.name.trim()) {
            setErrors((prevErrors) => ({ ...prevErrors, name: 'Name is required' }));
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setErrors((prevErrors) => ({ ...prevErrors, email: 'Invalid email address' }));
            isValid = false;
        }

        if (!emailRegex.test(formData.managerEmail)) {
            setErrors((prevErrors) => ({ ...prevErrors, managerEmail: 'Invalid email address' }));
            isValid = false;
        }

        const phoneRegex = /^\+?[0-9]+$/;
        if (!phoneRegex.test(formData.phoneNumber)) {
            setErrors((prevErrors) => ({ ...prevErrors, phoneNumber: 'Invalid phone number' }));
            isValid = false;
        }

        return isValid;
    };

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateForm()) {
            console.log('Order Details:');
            console.log('Customer:', formData);
            console.log('Products in Cart:');
            console.table(items.map((item: CartItemProps) => ({ Title: item.title, Quantity: item.quantity, Price: `$${item.price * item.quantity}` })));

            const formDataForEmailJS = {
                phone: formData.phoneNumber,
                to_email: formData.managerEmail,
            };

            emailjs.send('service_yvsbkrf', 'template_n68psoq', formDataForEmailJS, 'VK1jjrkMsPQVXFAlf')
                .then(() => {
                    Notify.success('Email has been successfully sent');
                }, (error: any) => {
                    Notify.failure(`error sending email: ${error.text}`);
                });
            Notify.success('the order has been successfully sent');
        }
    };

    const calculateTotalPrice = () => {
        return items.reduce((total: number, item: CartItemProps) => total + item.price * item.quantity, 0);
    };


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Order</h1>
            <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded`}
                    />
                    {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Manager email</label>
                    <input
                        type="text"
                        name="managerEmail"
                        value={formData.managerEmail}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border ${errors.managerEmail ? 'border-red-500' : 'border-gray-300'} rounded`}
                    />
                    {errors.managerEmail && <p className="text-red-500 text-xs mt-1">{errors.managerEmail}</p>}
                </div>
                <div className="overflow-y-auto max-h-96">
                    {items.map((item: CartItemProps) => (
                        <CartItem key={item.id} {...item} />
                    ))}
                </div>
                <p className="text-lg font-semibold mb-2">Total Price: ${calculateTotalPrice().toFixed(2)}</p>
                <button
                    type="submit"
                    className="mt-10 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
                >
                    Place Order
                </button>
            </form>
        </div>
    );
};

export default Order;