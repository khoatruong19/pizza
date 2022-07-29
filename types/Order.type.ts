import { GeneralInfo } from "./GeneralInfo.type";

export type Order = GeneralInfo & {
    name: string
    phone: string
    address: string
    method: number
    status: number
    total: number
}