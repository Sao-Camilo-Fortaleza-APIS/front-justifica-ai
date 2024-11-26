import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTrigger
} from "@/components/ui/drawer"
import { Justificativa } from "@/routes/list-orders"
import { useMediaQuery } from "@uidotdev/usehooks"
import { useState } from "react"
import { ApproveOrderForm } from "./approve-order-form"

export function ApproveOrderDialog(order: Justificativa) {
    const [open, setOpen] = useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    const buttonTrigger = <Button className="w-full h-14 bg-emerald-600 hover:bg-emerald-500" >Aprovar</Button>
    const dialogTitle = <DialogTitle>Aprovação de Justificativa</DialogTitle>
    const dialogDescription = <DialogDescription>Justificativa <span className="underline">{order?.number}</span> de {order?.requester}</DialogDescription>

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    {buttonTrigger}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        {dialogTitle}
                        {dialogDescription}
                    </DialogHeader>
                    <ApproveOrderForm approve orderId={order?.number} />
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                {buttonTrigger}
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    {dialogTitle}
                    {dialogDescription}
                </DrawerHeader>
                <ApproveOrderForm approve orderId={order?.number} className="px-4" />
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
