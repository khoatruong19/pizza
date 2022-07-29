import Image from 'next/image'
import React from 'react'
import css from "../styles/Hero.module.css"
import Cherry from "../assets/Cherry.png"
import HeroImage from "../assets/HeroImage.png"
import Pizza1 from "../assets/Pizza.jpg"
import {UilPhone} from "@iconscout/react-unicons"


const Hero = () => {
  return (
    <div className={css.container}>
        <div className={css.left}>
            <div className={css.cherryDiv}>
                <span>More than Faster</span>
                <Image src={Cherry} alt="" width={40} height={25} />
            </div>

            <div className={css.heroText}>
                <span>Be The Fastest</span>
                <span>Be Delivering</span>
                <span>Your <span style={{color: "var(--themeRed)"}}>Pizza</span></span>
            </div>

            <span className={css.miniText}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit enim obcaecati illo perferendis quas minus, atque provident.
            </span>

            <button className={`btn ${css.btn}`}>
                Get Started
            </button>
        </div>

        <div className={css.right}>
            <div className={css.imageContainer}>
                <Image src={HeroImage} alt="" layout='intrinsic' />
            </div>

            <div className={css.contactUs}>
                <span>Contact us</span>
                <div>
                    <UilPhone color='white' />
                </div>
            </div>

            <div className={css.pizza}>
                <div>
                    <Image src={Pizza1} alt="" objectFit='cover' layout='intrinsic' />
                </div>

                <div className={css.details}>
                    <span>Italian Pizza</span>
                    <span> <span style={{color:"var(--themeRed)"}}>$</span> 7.48</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Hero