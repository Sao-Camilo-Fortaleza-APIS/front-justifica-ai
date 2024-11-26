import api from "@/lib/axios"

export type Sectors = Sector[]

export interface Sector {
    ds_localizacao: string
    nr_sequencia: number
}

export async function getSectors() {
    const response = await api.get("/sectors")
    return response.data as Sectors
}