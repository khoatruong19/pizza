import { GetStaticPaths, NextPageContext, GetStaticProps } from 'next';
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { client, urlFor } from '../../lib/client';
import { Pizza } from '../../types/Pizza.type';
import { ParsedUrlQuery } from 'querystring';
import { Slug } from '../../types/GeneralInfo.type';
import Image from 'next/image';
import css from '../../styles/Pizza.module.css';
import arrowLeft from '../../assets/arrowLeft.png';
import arrowRight from '../../assets/arrowRight.png';
import { useStore } from '../../store';
import toast, { Toaster } from 'react-hot-toast';

interface Params extends ParsedUrlQuery {
  slug: string;
}

interface IProps {
  pizza: Pizza;
}

const PizzaDetailPage = ({ pizza }: IProps) => {
  const src = urlFor(pizza.image).url();
  const [size, setSize] = useState(1);
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (action: string) => {
    action === 'inc'
      ? setQuantity((prev) => prev + 1)
      : quantity === 1
      ? null
      : setQuantity((prev) => prev - 1);
  };
  const addPizza = useStore((state) => state.addPizza);
  const addToCart = () => {
    addPizza({ ...pizza, price: pizza.price[size], quantity, size });
    toast.success('Added to cart!!');
  };

  if (!pizza) return null;

  return (
    <Layout>
      <div className={css.container}>
        <div className={css.imageContainer}>
          <Image
            loader={() => src}
            src={src}
            alt=""
            layout="fill"
            unoptimized
            objectFit="cover"
          />
        </div>

        <div className={css.right}>
          <span>{pizza.name}</span>
          <span>{pizza.details}</span>

          <span>
            {' '}
            <span style={{ color: 'var(--themeRed' }}>$ </span>
            {pizza.price[size]}
          </span>
          <div className={css.size}>
            <span>Size</span>
            <div className={css.sizeVariants}>
              <div
                className={size === 0 ? css.selected : ''}
                onClick={() => setSize(0)}
              >
                Small
              </div>
              <div
                className={size === 1 ? css.selected : ''}
                onClick={() => setSize(1)}
              >
                Medium
              </div>
              <div
                className={size === 2 ? css.selected : ''}
                onClick={() => setSize(2)}
              >
                Large
              </div>
            </div>
          </div>

          <div className={css.quantity}>
            <span>Quantity</span>

            <div className={css.counter}>
              <Image
                unoptimized
                onClick={() => handleQuantity('desc')}
                src={arrowLeft}
                alt=""
                height={20}
                width={20}
                objectFit="contain"
              />
              <span>{quantity}</span>
              <Image
                unoptimized
                onClick={() => handleQuantity('inc')}
                src={arrowRight}
                alt=""
                height={20}
                width={20}
                objectFit="contain"
              />
            </div>
          </div>

          <div className={`btn ${css.btn}`} onClick={addToCart}>
            Add to cart
          </div>
        </div>
        <Toaster />
      </div>
    </Layout>
  );
};

export default PizzaDetailPage;

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const slugs: Slug[] = await client.fetch(`*[_type=="pizza"]{slug}`);
  const paths = slugs.map((slug) => ({
    params: {
      slug: `${slug.current}`,
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<IProps, Params> = async (
  context
) => {
  const slug = context.params?.slug;
  const pizza = await client.fetch(
    `*[_type=="pizza" && slug.current == '${slug}'][0]`
  );
  return {
    props: {
      pizza,
    },
  };
};
