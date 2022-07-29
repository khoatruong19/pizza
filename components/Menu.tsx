import React from 'react'
import css from "../styles/Menu.module.css"
import Image from 'next/image'
import { urlFor } from '../lib/client'
import Link from "next/link"
import { Pizza } from '../types/Pizza.type'

interface IProps{
    pizzas: Pizza[]
}

const Menu = ({pizzas}: IProps) => {
  return (
    <div className={css.container}>
        <div className={css.heading}>
            <span>OUR MENU</span>
            <span>Menu That Always</span>
            <span>Make You Fall In Love</span>
        </div>

        <div className={css.menu}>
            {pizzas.map(pizza => {
                const src = urlFor(pizza.image).url()
                return (
                    <Link href={`/pizza/${pizza.slug.current}`}>
                        <div key={pizza._id} className={css.pizza}>
                                <div className={css.imageContainer}>
                                    <Image unoptimized loader={() => src} src={src} alt="" objectFit='cover' layout='fill'/>
                                </div>
                                <span>{pizza.name}</span>
                                <span><span style={{color: "var(--themeRed)"}}>$ </span>{pizza.price[1]}</span>
                        </div>
                    </Link>
                )
            })}
        </div>

    </div>
  )
}

export default Menu