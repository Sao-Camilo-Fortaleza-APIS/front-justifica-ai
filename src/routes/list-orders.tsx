import { Header } from "@/components/header";
import { SelectSector } from "@/components/select-sector";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export type Justificativa = {
    contact: string
    damage: string
    date_order: string
    date_occurrence: string
    describe: string
    group: number
    location: string
    number: number
    requester: string
    reason: string
};
export function Approve() {
    const navigate = useNavigate()
    const user = Cookies.get("j.ai.user")
    const [collaboratorFilter, setCollaboratorFilter] = useState<string>("")

    const { data: ordersResponse, isLoading, isFetching } = useQuery<Justificativa[]>({
        queryKey: ["justification-pendents"],
        queryFn: async () => {
            if (!user) {
                toast.error("Usuário não autenticado")
                return navigate("/manager/login")
            }

            const response = await api.get(`/justification/pendents/${user}`)
            return response.data
        }
    })

    const filteredOrders = collaboratorFilter ? ordersResponse?.filter(j => j.requester.toLowerCase().includes(collaboratorFilter.toLowerCase())) : ordersResponse

    // TODO: Implementar a função de filtros por setor

    return (
        <>
            <Header />
            <div className="px-1 py-3 sm:p-6 max-w-4xl mx-2 sm:mx-auto sm:w-full space-y-4">
                <h2 className="text-lg sm:text-3xl font-bold antialiased font-inter text-zinc-900">Pendentes de aprovação</h2>

                <div className="flex flex-col items-start gap-5 justify-between sm:flex-row sm:items-center">
                    <form className="flex items-center gap-2">
                        <Input value={collaboratorFilter} onChange={(e) => setCollaboratorFilter(e.target.value)} className="" placeholder="Pesquisar por nome..." />

                        <SelectSector />

                        {/* <Button type="submit" className="bg-slate-900 hover:bg-slate-800">
                            <Search className="h-4 w-4 mr-2" />
                            Filtrar
                        </Button> */}
                        {isFetching && <Loader className="size-4 animate-spin text-zinc-500" />}
                    </form>

                    {/*  <DrawerDialog /> */}
                </div>

                <div className="border rounded-lg sm:p-2">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-center">Nº</TableHead>
                                <TableHead>Nome</TableHead>
                                <TableHead>Data Ocorrência</TableHead>
                                <TableHead>Localização</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredOrders?.map((j, i) => (
                                <TableRow
                                    key={i}
                                    onClick={() => navigate(`/manager/order`, { state: { order: j } })}
                                    className="border-t hover:cursor-pointer hover:bg-zinc-100"
                                >
                                    <TableCell className="py-2 text-xs md:text-sm">{j.number}</TableCell>
                                    <TableCell className="py-2 text-xs md:text-sm">{j.requester}</TableCell>
                                    <TableCell className="py-2 text-xs md:text-sm">{j.date_occurrence}</TableCell>
                                    <TableCell className="py-2 text-xs md:text-sm">{j.location}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </div>
            </div >

            {/*   <footer className="mb-0">
                <div className="bg-zinc-900 text-white text-center py-4 mt-3">
                    <nav className="w-full">
                        <span>Links Úteis:</span>
                        <ul className="">
                            <li className="inline-block mx-2">Política de Ponto</li>
                            <li className="inline-block mx-2">Suporte Técnico</li>
                            <li className="inline-block mx-2">Contato Departamento Pessoal</li>
                        </ul>
                    </nav>
                    <p className="text-sm mt-4">TI HSC © 2024 - Todos os direitos reservados</p>
                </div>
            </footer> */}
        </>
    )
}
