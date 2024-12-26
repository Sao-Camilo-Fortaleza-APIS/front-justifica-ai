import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from "@/components/ui/drawer"
import { useCopyToClipboard, useMediaQuery } from "@uidotdev/usehooks"
import { BadgeCheck, Check, Copy, Eye, PlusCircle } from "lucide-react"

type ConfirmationDialogProps = {
  justificationId: number
  open: boolean
  setOpen: (value: boolean) => void
}

export function ConfirmationDialog({ justificationId, open, setOpen }: ConfirmationDialogProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [copiedText, copyToClipboard] = useCopyToClipboard()
  const hasCopiedText = Boolean(copiedText)

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-zinc-700 font-inter font-semibold">Justificativa enviada para sua gestão!</DialogTitle>
            <DialogDescription asChild>
              <div>
                <div className="flex items-center justify-center"><BadgeCheck className="h-16 w-16 text-emerald-500 mt-4" /></div>

                <p className="text-center mt-4">
                  O número da sua justificativa é
                  <Button
                    disabled={hasCopiedText}
                    className="font-bold text-base text-zinc-600 underline"
                    variant="link"
                    onClick={() => copyToClipboard(justificationId.toString())}
                  >
                    {justificationId}
                    {hasCopiedText ? (<Check className="h-4 w-4" />) : (<Copy className="h-4 w-4 ml-2" />)}
                  </Button>
                </p>
                <p className="text-center mt-2">Guarde esse número para acompanhar o status da sua justificativa.</p>

                <div className="flex flex-col space-y-2 mt-4">
                  <Button className="h-8 rounded-md px-3 text-xs sm:h-9 sm:px-4 sm:py-2">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Nova justificativa
                  </Button>
                  <Button variant="outline" className="h-8 rounded-md px-3 text-xs sm:h-9 sm:px-4 sm:py-2 border-zinc-300 hover:border-zinc-400 hover:bg-zinc-50 hover:text-zinc-400 transition-colors">
                    <Eye className="h-4 w-4 mr-2" />
                    Acompanhar outras justificativas
                  </Button>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>


        </DialogContent>
      </Dialog >
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Adicionar nova justificativa</DrawerTitle>
          <DrawerDescription>
            <div className="flex flex-col space-y-2 mt-4">
              <Button className="h-8 rounded-md px-3 text-xs sm:h-9 sm:px-4 sm:py-2">
                <PlusCircle className="h-4 w-4 mr-2" />
                Nova justificativa
              </Button>
              <Button className="h-8 rounded-md px-3 text-xs sm:h-9 sm:px-4 sm:py-2">
                <Eye className="h-4 w-4 mr-2" />
                Acompanhar outras justificativas
              </Button>
            </div>
          </DrawerDescription>
        </DrawerHeader>


        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
