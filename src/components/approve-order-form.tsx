import api from "@/lib/axios"
import { cn } from "@/lib/utils"
import { ComponentProps, useState } from "react"
import { toast } from "sonner"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Textarea } from "./ui/textarea"

type ApproveOrderFormProps = ComponentProps<"form"> & { approve: boolean, orderId: number }

export function ApproveOrderForm({ className, approve, orderId }: ApproveOrderFormProps) {
    const [formData, setFormData] = useState({
        observation: "",
        treatment: ""
    })

    const handleRadioChange = (value: string) => {
        setFormData(prev => ({ ...prev, treatment: value }))
        console.log(value)
    }
    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, observation: e.target.value }))
    }

    async function handleSendApprove(e: React.FormEvent) {
        e.preventDefault()
        try {
            const data = {
                user: "MYGUEL.ANGELLO",
                order: orderId,
                treatment: approve ? formData.treatment : "reprovar",
                observation: formData.observation,
                approve
            }
            const response = await api.post("/justification/manager/action", data)
            console.log(response)
            toast.info("Aprovação enviada com sucesso")
        }
        catch (error) {
            console.error(error)
            toast.error("Erro ao enviar aprovação, tente novamente")
        }
    }
    return (
        <form onSubmit={handleSendApprove} className={cn("grid items-start gap-4", className)}>
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
                        <RadioGroupItem value="banco" id="banco-horas" />
                        <Label htmlFor="banco-horas">Utilizar banco de horas</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="descontar" id="descontar-folha" />
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
                    value={formData.observation}
                    onChange={handleTextareaChange}
                    className="w-full"
                    required
                    rows={5}
                />
            </div>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-500">Confirmar aprovação</Button>
        </form>
    )
}