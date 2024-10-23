import * as React from "react"

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
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useMediaQuery } from "@uidotdev/usehooks"
import { PlusCircle } from "lucide-react"
import { SendJustificationForm } from "./send-justification-form"

export function DrawerDialog() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const buttonComp = (
    <Button className="h-8 rounded-md px-3 text-xs sm:h-9 sm:px-4 sm:py-2">
      <PlusCircle className="h-4 w-4 mr-2" />
      Nova justificativa
    </Button>
  )
  const textDescription = "Preencha o formulário abaixo para adicionar uma justificativa de ponto."

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {buttonComp}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicionar nova justificativa</DialogTitle>
            <DialogDescription>
              {textDescription}
            </DialogDescription>
          </DialogHeader>

          <SendJustificationForm />

        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {buttonComp}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Adicionar nova justificativa</DrawerTitle>
          <DrawerDescription>
            {textDescription}
          </DrawerDescription>
        </DrawerHeader>

        <SendJustificationForm className="px-4" />

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
