import api from "@/lib/axios";
export interface Employee {
    name: string
    email: string
    mat: number
    id_tasy: number
}
export async function getEmployeeByCPF(cpf: string) {
    const response = await api.get<Employee>(`/applicant_information/${cpf}`)

    return response.data
}