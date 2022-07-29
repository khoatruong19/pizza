import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
const stripe = new Stripe(
  'sk_test_51LQksdDFtyW0cq14SOwRHWAcXZraX5K5j1FoG6NyDcJjLxL0961iZ6kb4Z8vIezKRTV4C9hZGGIgGgqOxTXNBWnu00VDCr6nd4'
);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: req.body.map((item) => {
          const img = item.image.asset._ref;
          const newImage = img
            .replace(
              'image-',
              'https://cdn.sanity.io/images/l5dkjtra/production/'
            )
            .replace('-jpg', '.jpg');
          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: false,
            },
            quantity: item.quantity,
          };
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/cart`,
      };

      const session = await stripe.checkout.sessions.create(params);
      console.log(session);
      res.status(200).json(session);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed');
  }
}
