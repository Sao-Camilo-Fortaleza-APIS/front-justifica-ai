import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import api from "@/lib/axios";
import Cookies from "js-cookie";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
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
    const [orders, setOrders] = useState<Justificativa[] | null>([])

    async function getOrders() {
        if (!user) {
            toast.error("Usuário logado não encontrado")
            return navigate("/")
        }

        await api.get(`/justification/pendents/${user}`).then((response) => {
            setOrders(response.data)
        }).catch((error) => {
            console.error(error)
            toast.error("Erro ao buscar justificativas")
        })
    }

    useEffect(() => {
        getOrders()
    }, [])

    return (
        <>
            <div className="px-1 py-3 sm:p-6 max-w-4xl mx-2 sm:mx-auto sm:w-full space-y-4">
                <h2 className="text-lg sm:text-3xl font-bold antialiased font-inter text-zinc-900">Justificativas pendentes</h2>

                <div className="flex flex-col items-start gap-5 justify-between sm:flex-row sm:items-center">
                    <form className="flex items-center gap-2">
                        <Input className="" placeholder="Pesquisar por colaborador" />
                        <Button type="submit" className="bg-slate-900 hover:bg-slate-800">
                            <Search className="h-4 w-4 mr-2" />
                            Filtrar por data
                        </Button>
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
                            {Array.isArray(orders) && orders?.map((j, i) => (
                                <TableRow
                                    key={i}
                                    onClick={() => navigate(`/order`, { state: { order: j } })}
                                    className="border-t"
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
