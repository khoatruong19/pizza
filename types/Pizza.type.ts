import { GeneralInfo, Image, Slug } from "./GeneralInfo.type"

export type Pizza= GeneralInfo & {
    name: string
    slug: Slug
    image: Image
    price: number[]
    details: string
}