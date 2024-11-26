import api from "@/lib/axios";
interface SendApprove {
    user: string
    order: number
    treatment: string
    observation?: string
    approve: boolean
}
export async function sendApprove(data: SendApprove) {
    const response = await api.post("/justification/manager/action", data)

    return response.data
}