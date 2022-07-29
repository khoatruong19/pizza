import { FormDataInfo } from "../components/OrderModal"

export const createOrder = async (data: FormDataInfo) => {
    const res = await fetch('/api/order', {
        method: "POST",
        body: JSON.stringify({
            name: data.name,
            phone: data.phone,
            address: data.address,
            total: data.total,
            method: data.method,
            status: 1
        })
    })
    const id = await res.json()
    return id
}