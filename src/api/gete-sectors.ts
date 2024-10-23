
export type Sectors = Sector[]

export interface Sector {
    ds_localizacao: string
    nr_sequencia: number
}

export async function getSectors() {
    const response = await fetch("http://10.10.200.101:4321/get/setor")
    const sectors = await response.json()
    return sectors as Sectors
}