import create from "zustand"
import { Image, Slug } from "../types/GeneralInfo.type"

interface PizzaToCart{
    name: string
    slug: Slug
    image: Image
    price: number
    quantity: number
    size: number
    details: string
}

interface PizzasState {
    cart:{
        pizzas: PizzaToCart[]
    },
    addPizza: (data: PizzaToCart) => void
    removePizza: (index: number) => void
    resetCart: () => void
}

export const useStore = create<PizzasState>(
    (set) => ({
        cart:{
            pizzas: []
        },

        addPizza: (data: PizzaToCart) => set((state) => ({
            cart: {
                pizzas: [...state.cart.pizzas,data]
            }
        })),

        removePizza: (index: number) => set((state) => ({
            cart:{
                pizzas: state.cart.pizzas.filter((_,i) => i !== index)
            }
        })),

        resetCart: () => set(state => ({
            cart: {
                pizzas: []
            }
        }))
    })
)
