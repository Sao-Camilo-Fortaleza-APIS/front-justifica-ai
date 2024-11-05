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
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@uidotdev/usehooks"
import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Textarea } from "./ui/textarea"

export function ApproveOrderDialog() {
    const [open, setOpen] = useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="w-full h-14 bg-emerald-600 hover:bg-emerald-500" >Aprovar</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Aprovação de Jusitifcativa</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <ProfileForm />
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button className="w-full h-14 bg-emerald-600 hover:bg-emerald-500" >Aprovar</Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Aprovação de Justificativa</DrawerTitle>
                </DrawerHeader>
                <ProfileForm className="px-4" />
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}


function ProfileForm({ className }: React.ComponentProps<"form">) {
    const [formData, setFormData] = useState({
        comment: "",
        appreciation: ""
    })

    const handleRadioChange = (value: string) => {
        setFormData(prev => ({ ...prev, appreciation: value }))
        console.log(value)
    }
    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, comment: e.target.value }))
    }
    return (
        <form className={cn("grid items-start gap-4", className)}>
            <div className="grid gap-2">
                <Label htmlFor="apreciacao">Apreciação</Label>
                <RadioGroup
                    onValueChange={handleRadioChange}
                    required
                    id="apreciacao"
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="abonar" id="abonar" />
                        <Label htmlFor="abonar">Abonar</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="banco-horas" id="banco-horas" />
                        <Label htmlFor="banco-horas">Utilizar banco de horas</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="descontar-folha" id="descontar-folha" />
                        <Label htmlFor="descontar-folha">Descontar em folha</Label>
                    </div>
                </RadioGroup>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="complement">Comentário</Label>
                <Textarea
                    id="complement"
                    name="complement"
                    placeholder=""
                    value={formData.comment}
                    onChange={handleTextareaChange}
                    className="w-full"
                    required
                    rows={5}
                />
            </div>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-500">Enviar aprovação</Button>
        </form>
    )
}
