import { ApproveOrderDialog } from "@/components/approve-order-dialog";
import { DisapproveOrderDialog } from "@/components/disapprove-order-dialog";
import { Hero } from "@/components/hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Justificativa } from "./list-orders";

export function Order() {
    const { state } = useLocation()
    console.log("order", state?.order);

    const order = state?.order as Justificativa

    return (
        <div className="flex flex-col gap-6 justify-start h-screen overflow-x-hidden bg-background">


            <header className="sticky top-0 left-0 w-full flex items-center justify-center bg-background z-10 p-4 border">
                <div className="flex items-center justify-start w-1/3">
                    <Button size="icon" variant="ghost" className="rounded-full hover:bg-zinc-100" onClick={() => window.history.back()}>
                        <ArrowLeft className="h-8 w-8 sm:h-6 sm:w-6 text-zinc-600" />
                    </Button>
                </div>
                <div className="flex items-center justify-center w-1/3">
                    <h3 className="text-lg sm:text-xl font-bold antialiased text-zinc-600">Ordem {order?.number}</h3>
                </div>
                <div className="w-1/3 text-right text-zinc-400"><Hero /></div>
            </header>

            <div className="px-4 max-h-fit" /* style={{ height: 'calc(100vh - 160px)', overflowY: 'scroll' }} */>
                <main className="flex flex-col gap-3 mb-5">
                    <Label className="text-lg text-zinc-600" htmlFor="date_occurrence">Colaborador</Label>
                    <Input value={order?.requester} className="w-full bg-zinc-100" readOnly disabled />

                    <div className="flex w-full">
                        <div className="mr-2 w-full">
                            <Label className="text-lg text-zinc-600" htmlFor="date_occurrence">Data de ocorrência</Label>
                            <Input value={order?.date_occurrence} className="w-full" id="date_occurrence" readOnly disabled />
                        </div>

                        <div className="w-full">
                            <Label className="text-lg text-zinc-600" htmlFor="date_order">Data da ordem</Label>
                            <Input value={order?.date_order} className="w-full bg-zinc-100" id="date_order" readOnly disabled />
                        </div>
                    </div>

                    <div className="w-full flex flex-col gap-2">
                        <Label className="text-lg text-zinc-600" htmlFor="date_order">Descrição</Label>
                        <div className="w-full bg-zinc-100 px-3 py-2 rounded-md border border-input shadow-sm">
                            {order?.describe.split('\n').map((line, index) => (
                                <p key={index} className="text-sm text-zinc-600">{line}</p>
                            ))}
                        </div>
                        {/* <Textarea value={order?.describe} className="w-full bg-zinc-100" /> */}
                    </div>
                </main>
            </div>

            <footer className="w-full p-4 flex flex-col border-t-[1px] gap-2 bg-background sm:flex-row">
                {/*   <footer className="sticky bottom-0 w-full px-5 pb-4 flex flex-col sm:flex-row gap-2 bg-background"> */}
                <ApproveOrderDialog {...order} />

                <DisapproveOrderDialog {...order} />
            </footer>
        </div >
    )
}