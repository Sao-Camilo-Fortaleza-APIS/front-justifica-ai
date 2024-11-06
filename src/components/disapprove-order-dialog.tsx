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
import { Justificativa } from "@/routes/manager"
import { useMediaQuery } from "@uidotdev/usehooks"
import { useState } from "react"
import { DisapproveOrderForm } from "./disapprove-order-form"

export function DisapproveOrderDialog(order: Justificativa) {
    const [open, setOpen] = useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    const buttonTrigger = <Button className="w-full h-14 bg-red-500 hover:bg-red-600" >Reprovar</Button>
    const dialogTitle = <DialogTitle>Reprovação de Justificativa</DialogTitle>
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
                    <DisapproveOrderForm approve={false} orderId={order?.number} />
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
                <DisapproveOrderForm approve={false} orderId={order?.number} className="px-4" />
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
