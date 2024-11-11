import { ApproveOrderDialog } from "@/components/approve-order-dialog";
import { DisapproveOrderDialog } from "@/components/disapprove-order-dialog";
import { Hero } from "@/components/hero";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Justificativa } from "./list-orders";

export function Order() {
    const { state } = useLocation()
    console.log("order", state?.order);

    const order = state?.order as Justificativa

    return (
        <div className="flex flex-col gap-6 pb-5 justify-start h-screen overflow-x-hidden bg-background">


            <header className="fixed top-0 left-0 w-full flex items-center justify-center bg-background z-10 px-3 pt-5 pb-2">
                <div className="flex items-center justify-start w-1/3">
                    <ArrowLeft className="h-6 w-6 text-zinc-600" onClick={() => window.history.back()} />
                </div>
                <div className="flex items-center justify-center w-1/3">
                    <h3 className="text-xl font-bold antialiased text-zinc-600">Ordem {order?.number}</h3>
                </div>
                <div className="w-1/3 text-right text-zinc-400"><Hero /></div>
            </header>

            <div className="px-4 mt-16 pt-5 shadow-inner" style={{ height: 'calc(100vh - 80px)', overflowY: 'scroll' }}>
                <main className="flex flex-col gap-3">
                    <Input value={order?.requester} className="w-full bg-zinc-100" readOnly disabled />

                    <div className="flex w-full">
                        <div className="mr-2 w-full">
                            <label className="text-lg text-zinc-600" htmlFor="date_occurrence">Data de ocorrência</label>
                            <Input value={order?.date_occurrence} className="w-full" id="date_occurrence" readOnly disabled />
                        </div>

                        <div className="w-full">
                            <label className="text-lg text-zinc-600" htmlFor="date_order">Data da ordem</label>
                            <Input value={order?.date_order} className="w-full bg-zinc-100" id="date_order" readOnly disabled />
                        </div>
                    </div>

                    <div className="w-full">
                        <label className="text-lg text-zinc-600" htmlFor="date_order">Descrição</label>
                        <Textarea value={order?.describe} className="h-min w-full bg-zinc-100" rows={10} readOnly disabled />
                    </div>
                </main>
            </div>

            <footer className="fixed bottom-0 w-full p-5 flex flex-col gap-2 bg-background">
                <ApproveOrderDialog {...order} />

                <DisapproveOrderDialog {...order} />
            </footer>
        </div>
    )
}