import api from "@/lib/axios"

export interface Justification {
    complement: string
    id_tasy: string
    id_sector: string
    phone: string
    date_occurrence: string
    reason: string
    is_aware: boolean
    mat: number | null
    hour: string
}
export async function sendJustification(data: Justification) {
    const response = await api.post("/open_justification", data)
    return response.data
}