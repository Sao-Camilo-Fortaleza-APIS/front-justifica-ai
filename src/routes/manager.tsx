import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import api from "@/lib/axios";
import { Loader, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type Justificativa = {
    contact: string     // "teste",
    damage: string      // "AJUSTE PONTO: MYGUEL ANGELLO MACIEL DE ABREU - 24/10/2024 10:00",
    date_order: string  // "Wed, 30 Oct 2024 16:55:01 GMT",
    date_occurrence: string  // "Wed, 30 Oct 2024 16:55:01 GMT",
    describe: string    // "Dados Justificativa:\nTermo de Ciência: True\nMat: 007057\nNome: MYGUEL ANGELLO MACIEL DE ABREU\nData Ocorrência: 24/10/2024 10:00\nMotivo: outros\nObservação: wçltjklkwrtj",
    group: number       // 50,
    location: string    // "QUALIDADE",
    number: number      // 58212,
    requester: string   // "MYGUEL ANGELLO MACIEL"
};
export function Approve() {
    const navigate = useNavigate()
    const [orders, setOrders] = useState<Justificativa[]>([])

    async function getOrders() {
        await api.get('/justification/pendents/myguel').then((response) => {
            setOrders(response.data)
        }).catch((error) => {
            console.error(error)
            toast.error("Erro ao buscar justificativas")
        })
    }

    console.log("orders", orders)


    useEffect(() => {
        getOrders()
    }, [])

    if (orders.length === 0) {
        return (
            <div className="px-1 py-3 sm:p-6 max-w-4xl w-full mx-auto space-y-4">
                <h2 className="text-lg sm:text-3xl font-bold antialiased font-inter text-zinc-900">Justificativas pendentes</h2>
                <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                    <Loader className="animate-spin" />
                    <p>Nenhuma justificativa pendente</p>

                </div>
            </div>
        )
    }

    return (
        <>
            <div className="px-1 py-3 sm:p-6 max-w-4xl mx-auto space-y-4">
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
                                <TableHead>Data Pedido</TableHead>
                                <TableHead>Nome</TableHead>
                                <TableHead>Data Ocorrência</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((j, i) => (
                                <Button variant="link" asChild onClick={(e) => navigate(`/order/${j.number}`)}>
                                    <TableRow key={i} className="border-t">
                                        <TableCell className="py-2 text-xs md:text-base">{j.date_order}</TableCell>
                                        <TableCell className="py-2 text-xs md:text-base">{j.requester}</TableCell>
                                        <TableCell className="py-2 text-xs md:text-base">{j.date_occurrence}</TableCell>
                                    </TableRow>
                                </Button>
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
