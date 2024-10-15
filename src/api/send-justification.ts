import api from "@/lib/axios"

interface Justification {
    sector: string
    date: string
    time: string
    reason: string
    complement: string
    isAware: boolean
}
export async function sendJustification(data: Justification) {
    const response = await api.post("/open_order", {
        "observation_p": data.complement,
        "reason": data.reason,
        "sector": data.sector,
        "date": data.date,
        "time": data.time,
        "isAware": data.isAware
    })
    return response.data
}