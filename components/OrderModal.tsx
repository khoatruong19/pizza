import {Modal, useMantineTheme } from "@mantine/core"
import { useRouter } from "next/router"
import { Dispatch, SetStateAction, useState } from "react"
import toast,{Toaster} from "react-hot-toast"
import { createOrder } from "../lib/orderHandler"
import { useStore } from "../store"
import css from "../styles/OrderModal.module.css"

interface IProps {
    opened: boolean
    setOpened: Dispatch<SetStateAction<0 | 1 | 2>>
    paymentMethod: number | null
}

export interface FormDataInfo {
    name: string
    phone: string
    address: string
    total: number
    method: number
}

const OrderModal = ({opened, setOpened, paymentMethod} : IProps) => {
    const router = useRouter()
    const theme = useMantineTheme()
    const total = typeof window !== 'undefined' && localStorage.getItem("total") || ""
    const resetCart = useStore(state => state.resetCart)
    const [formData, setFormData] = useState<FormDataInfo>({name: "", phone: "", address: "", total: 0, method: 0})
    
    const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const id = await createOrder({...formData, total: parseFloat(total), method: paymentMethod as number})
        toast.success('Order placed')
        resetCart()
        setOpened(2)
        typeof window !== "undefined" && localStorage.setItem('order', id)
        router.push(`/order/${id}`)
    }

    return (
        <Modal
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            overlayOpacity={0.55}
            overlayBlur={3}
            opened={opened}
            onClose={()=>setOpened(2)}
        >
            <form className={css.formContainer} onSubmit={handleSubmit}>
                <input onChange={handleInput}  type="text" name="name" required placeholder="Name..." />
                <input onChange={handleInput} type="text" name="phone" required placeholder="Phone number..." />
                <textarea onChange={handleInput} name="address" placeholder="Address..." cols={8} rows={3}></textarea>

                <span>
                    You will pay <span>$ {total}</span> on delivery
                </span>

                <button className="btn" type="submit">Place order</button>
            </form>
      </Modal>
    )
}

export default OrderModal