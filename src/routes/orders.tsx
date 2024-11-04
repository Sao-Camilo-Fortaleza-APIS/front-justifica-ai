import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Justificativa } from "./manager";

export function Order() {
    const { state } = useLocation()
    console.log("order", state?.order);

    const order = state?.order as Justificativa



    return (
        <div className="flex flex-col gap-6 px-4">
            <header className="w-full mt-9 flex items-center justify-center">
                <div className="flex items-center justify-start w-1/3">
                    <ArrowLeft className="h-6 w-6 text-zinc-600" />
                </div>

                <div className="flex items-center justify-center w-1/3">
                    <h3 className="text-xl font-bold antialiased text-zinc-600">Ordem {order?.number}</h3>
                </div>

                <div className="w-1/3"></div>
            </header>

            <main className="flex flex-col gap-3">
                <Input value={order?.requester} className="w-full bg-zinc-300" readOnly disabled />

                <div className="flex w-full">
                    <div className="mr-2 w-full">
                        <label className="text-lg text-zinc-600" htmlFor="date_occurrence">Data de ocorrência</label>
                        <Input value={order?.date_occurrence} className="w-full" id="date_occurrence" readOnly disabled />
                    </div>

                    <div className="w-full">
                        <label className="text-lg text-zinc-600" htmlFor="date_order">Data da ordem</label>
                        <Input value={order?.date_order} className="w-full" id="date_order" readOnly disabled />
                    </div>
                </div>

                <div className="w-full">
                    <label className="text-lg text-zinc-600" htmlFor="date_order">Descrição</label>
                    <Textarea value={order?.describe} rows={8} readOnly disabled />
                </div>
            </main>

            <footer>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-500 mb-2" variant="default">Aprovar</Button>
                <Button className="w-full bg-red-600 hover:bg-red-500">Reprovar</Button>
            </footer>
        </div>
    )
}