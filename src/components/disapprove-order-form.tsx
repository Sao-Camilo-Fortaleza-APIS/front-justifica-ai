import api from "@/lib/axios"
import { cn } from "@/lib/utils"
import Cookies from "js-cookie"
import { ComponentProps, useState } from "react"
import { toast } from "sonner"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"

type DisapproveOrderFormProps = ComponentProps<"form"> & { approve: boolean, orderId: number }

export function DisapproveOrderForm({ className, approve, orderId }: DisapproveOrderFormProps) {
    const [observation, setObservation] = useState("")

    async function handleSendApprove(e: React.FormEvent) {
        e.preventDefault()
        try {
            const user = Cookies.get("j.ai.user")
            const data = {
                user: user,
                order: orderId,
                treatment: "reprovar",
                observation: observation,
                approve
            }
            const response = await api.post("/justification/manager/action", data)
            console.log(response)
            toast.info("Reprovação enviada para o solicitante")
        }
        catch (error) {
            console.error(error)
            toast.error("Não foi possível enviar reprovação, tente novamente")
        }
    }
    return (
        <form onSubmit={handleSendApprove} className={cn("grid items-start gap-4", className)}>
            <div className="grid gap-2">
                <Label htmlFor="complement">Comentário</Label>
                <Textarea
                    id="complement"
                    name="complement"
                    placeholder=""
                    value={observation}
                    onChange={(e) => setObservation(e.target.value)}
                    className="w-full"
                    required
                    rows={5}
                />
            </div>
            <Button type="submit" className="bg-red-500 hover:bg-red-600">Confirmar reprovação</Button>
        </form>
    )
}