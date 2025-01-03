import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
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
import { useMediaQuery } from "@uidotdev/usehooks"
import { BadgeCheck, Eye, Home, PlusCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"

type ConfirmationDialogProps = {
  justificationId: number
  open: boolean
  setOpen: (value: boolean) => void
}

export function ConfirmationDialog({ justificationId, open, setOpen }: ConfirmationDialogProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const navigate = useNavigate()

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]" aria-label="Justificativa enviada para sua gestão!">
          <DialogHeader>
            <DialogTitle className="text-zinc-700 font-inter font-semibold">Justificativa enviada para sua gestão!</DialogTitle>
            <DialogDescription asChild>
              <div className="flex flex-col items-center w-full space-y-2">
                <BadgeCheck className="h-16 w-16 text-emerald-500 mt-4" />

                <p className="text-center mt-4">
                  O número da sua justificativa é:
                </p>
                <p className="text-center font-bold text-xl text-zinc-600 ml-1">{justificationId}</p>
                <p className="text-center mt-2">Guarde esse número para acompanhar o status da sua justificativa.</p>

                <div className="w-full flex flex-col space-y-2 mt-4">
                  <Button className="h-8 rounded-md px-3 text-xs sm:h-9 sm:px-4 sm:py-2 bg-emerald-500 hover:bg-emerald-600" onClick={() => navigate("/")}>
                    <Home className="h-4 w-4 mr-2" />
                    Ir para o início
                  </Button>

                  <DialogClose asChild>
                    <Button className="rounded-md px-3 text-xs">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Nova justificativa
                    </Button>
                  </DialogClose>

                  <Button asChild className="rounded-md p-5 text-xs text-zinc-500 hover:text-zinc-600 sm:px-4 sm:py-2 border border-input shadow-sm bg-background hover:bg-zinc-100">
                    <a href="http://chamadotasy.sccuradars.local/historico" target="_blank" rel="noreferrer">
                      <Eye className="h-4 w-4 mr-2" />
                      Acompanhar outras justificativas
                    </a>
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
          <DrawerTitle>Justificativa enviada para sua gestão!</DrawerTitle>
          <DrawerDescription asChild>
            <div className="flex flex-col items-center w-full space-y-2">
              <BadgeCheck className="h-16 w-16 text-emerald-500 mt-4" />

              <p className="text-center mt-4">
                O número da sua justificativa é:
              </p>
              <p className="text-center font-bold text-xl text-zinc-600 ml-1">{justificationId}</p>
              <p className="text-center mt-2">Guarde esse número para acompanhar o status da sua justificativa.</p>
            </div>
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="pt-2 mb-5">
          <Button className="rounded-md p-5 text-sm sm:px-4 sm:py-2 bg-emerald-500 hover:bg-emerald-600" onClick={() => navigate("/")}>
            <Home className="h-4 w-4 mr-2" />
            Ir para o início
          </Button>

          <DrawerClose asChild>
            <Button className="rounded-md p-5 text-sm sm:px-4 sm:py-2">
              <PlusCircle className="h-4 w-4 mr-2" />
              Nova justificativa
            </Button>
          </DrawerClose>

          <Button asChild className="rounded-md p-5 text-sm sm:px-4 sm:py-2 border border-input shadow-sm hover:bg-accent-foreground hover:text-muted">
            <a href="http://chamadotasy.sccuradars.local/historico" target="_blank" rel="noreferrer">
              <Eye className="h-4 w-4 mr-2" />
              Acompanhar outras justificativas
            </a>
          </Button>

        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
