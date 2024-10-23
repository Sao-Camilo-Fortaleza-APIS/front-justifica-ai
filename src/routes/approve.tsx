import { DatePicker } from "@/components/date-picker";
import { DrawerDialog } from "@/components/drawer-dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Circle, Eye, Search } from "lucide-react";

type Justificativa = {
    data: string;
    tipo: string;
    motivo: string;
    status: string;
};
export function Approve() {
    const justificativas: Justificativa[] = [
        {
            "data": "2023-08-24 03:54:08",
            "tipo": "Atraso",
            "motivo": "Motivo pessoal",
            "status": "Rejeitado"
        },
        {
            "data": "2024-04-06 20:54:35",
            "tipo": "Atraso",
            "motivo": "Compromisso familiar",
            "status": "Rejeitado"
        },
        {
            "data": "2023-09-16 07:47:12",
            "tipo": "Atraso",
            "motivo": "Compromisso familiar",
            "status": "Aprovado"
        },
        {
            "data": "2023-10-17 19:07:53",
            "tipo": "Saída Antecipada",
            "motivo": "Consulta médica",
            "status": "Aprovado"
        },
        {
            "data": "2023-10-11 11:42:53",
            "tipo": "Atraso",
            "motivo": "Problemas de saúde",
            "status": "Rejeitado"
        },
        {
            "data": "2024-03-12 09:37:34",
            "tipo": "Saída Antecipada",
            "motivo": "Reunião externa",
            "status": "Rejeitado"
        },
        {
            "data": "2024-01-16 05:25:28",
            "tipo": "Atraso",
            "motivo": "Trânsito",
            "status": "Rejeitado"
        },
        {
            "data": "2024-01-09 18:51:02",
            "tipo": "Atraso",
            "motivo": "Falta de transporte",
            "status": "Rejeitado"
        },
        {
            "data": "2024-06-15 04:56:27",
            "tipo": "Ausência",
            "motivo": "Problemas de saúde",
            "status": "Rejeitado"
        },
        {
            "data": "2024-06-05 07:14:12",
            "tipo": "Ausência",
            "motivo": "Reunião externa",
            "status": "Aprovado"
        }
    ]

    return (
        <>
            <div className="px-1 py-3 sm:p-6 max-w-4xl mx-auto space-y-4">
                <h2 className="text-lg sm:text-3xl font-bold antialiased font-inter text-zinc-900">Suas Justificativas</h2>

                <div className="flex flex-col items-start gap-5 justify-between sm:flex-row sm:items-center">
                    <form className="flex items-center gap-2">
                        <DatePicker />
                        <Button type="submit" variant="ghost" className="text-zinc-800">
                            <Search className="h-4 w-4 mr-2" />
                            Filtrar por data
                        </Button>
                    </form>

                    <DrawerDialog />
                </div>

                <div className="border rounded-lg sm:p-2">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Data</TableHead>
                                <TableHead>Tipo</TableHead>
                                <TableHead>Motivo</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {justificativas.map((j, i) => (
                                <TableRow key={i} className="border-t">
                                    <TableCell className="py-2">{j.data}</TableCell>
                                    <TableCell className="py-2">{j.tipo}</TableCell>
                                    <TableCell className="py-2">{j.motivo}</TableCell>
                                    <TableCell className="py-2">
                                        {j.status}
                                        {j.status === "Aprovado" ? (
                                            <Circle className="h-4 w-4 ml-2 bg-green-500 text-green-500 rounded-full" />
                                        ) : (
                                            <Circle className="h-4 w-4 ml-2 bg-red-500 text-red-500 rounded-full" />
                                        )}
                                    </TableCell>
                                    <TableCell className="py-2">
                                        <Button variant="ghost" size="icon" className="shadow-sm">
                                            <Eye className="h-4 w-4 text-zinc-600" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </div>
            </div>

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
