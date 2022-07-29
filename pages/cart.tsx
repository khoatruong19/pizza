import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Stripe from 'stripe';
import Layout from '../components/Layout';
import OrderModal from '../components/OrderModal';
import { urlFor } from '../lib/client';
import { useStore } from '../store';
import css from '../styles/Cart.module.css';

const CartPage = () => {
  const cartData = useStore((state) => state.cart);
  const removePizza = useStore((state) => state.removePizza);
  const [paymentMethod, setPaymentMethod] = useState<0 | 1 | 2>(2);
  const [order, setOrder] = useState<string>(
    (typeof window !== 'undefined' && localStorage.getItem('order')) || ''
  );
  const router = useRouter();

  const handleDeleteCartItem = (i: number) => {
    removePizza(i);
    toast.error('Item removed!');
  };
  const total = () =>
    cartData.pizzas.reduce((a, b) => a + b.quantity * b.price, 0);

  const handleOnDelivery = () => {
    setPaymentMethod(0);
    typeof window !== 'undefined' &&
      localStorage.setItem('total', JSON.stringify(total()));
  };

  const handleCheckOut = async () => {
    typeof window !== 'undefined' &&
      localStorage.setItem('total', JSON.stringify(total()));
    setPaymentMethod(1);
    const res = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartData.pizzas),
    });

    if (res.status === 500) return;
    const data: Stripe.Response<Stripe.Checkout.Session> = await res.json();
    toast.loading('Redirecting...');
    router.push(`${data.url}`);
  };

  return (
    <Layout>
      <div className={css.container}>
        <div className={css.details}>
          <div className={css.table}>
            <thead>
              <th>Pizza</th>
              <th>Name</th>
              <th>Size</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </thead>
            <tbody className={css.tbody}>
              {cartData.pizzas.length > 0 &&
                cartData.pizzas.map((pizza, i) => {
                  const src = urlFor(pizza.image).url();
                  return (
                    <tr key={i}>
                      <td className={css.imageTd}>
                        <Image
                          src={src}
                          loader={() => src}
                          alt=""
                          objectFit="cover"
                          width={85}
                          height={85}
                        />
                      </td>

                      <td>{pizza.name}</td>

                      <td>
                        {pizza.size === 0
                          ? 'Small'
                          : pizza.size === 1
                          ? 'Medium'
                          : 'Large'}
                      </td>

                      <td>{pizza.price}</td>

                      <td>{pizza.quantity}</td>
                      <td>{pizza.price * pizza.quantity}</td>
                      <td
                        onClick={() => handleDeleteCartItem(i)}
                        style={{ color: 'var(--themeRed)', cursor: 'pointer' }}
                      >
                        x
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </div>
        </div>
        <div className={css.cart}>
          <span>Cart</span>
          <div className={css.cartDetails}>
            <div>
              <span>Items</span>
              <span>{cartData.pizzas.length}</span>
            </div>
            <div>
              <span>Total</span>
              <span>$ {total()}</span>
            </div>
            {!order && cartData.pizzas.length > 0 ? (
              <div className={css.buttons}>
                <button className="btn" onClick={handleOnDelivery}>
                  Pay on Delivery
                </button>
                <button className="btn" onClick={handleCheckOut}>
                  Pay Now
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <OrderModal
        opened={paymentMethod === 0}
        setOpened={setPaymentMethod}
        paymentMethod={paymentMethod}
      />
    </Layout>
  );
};

export default CartPage;
