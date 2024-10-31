import { useParams } from "react-router-dom"

export function Order() {
    const { orderId } = useParams()

    return (
        <div>
            <h1>Orders</h1>
            <p>{orderId}</p>
        </div>
    )
}