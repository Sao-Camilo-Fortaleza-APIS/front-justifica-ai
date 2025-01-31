import api from "@/lib/axios";
export interface Employee {
    name: string
    email: string
    mat: number
    id_tasy: number
    cpf: string
}
export async function getEmployeeByCPF(cpf: string) {
    const response = await api.get<Employee>(`/applicant/information/${cpf}`)

    return response.data
}