import api from "@/lib/axios"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Cookies from "js-cookie"
import { Loader2 } from "lucide-react"
import { ComponentProps } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { z } from "zod"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"

const orderDisapprovalSchema = z.object({
    observation: z.string().optional(),
})

type OrderDisapprovalData = z.infer<typeof orderDisapprovalSchema>

type DisapproveOrderFormProps = ComponentProps<"form"> & { approve: boolean, orderId: number }

export function DisapproveOrderForm({ className, approve, orderId }: DisapproveOrderFormProps) {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { isSubmitting } } = useForm<OrderDisapprovalData>({
        resolver: zodResolver(orderDisapprovalSchema),
    })

    const { mutateAsync } = useMutation({
        mutationFn: async (data: OrderDisapprovalData) => handleSendDisapprove(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["justification-pendents"] })
        }
    })

    async function handleSendDisapprove({ observation }: OrderDisapprovalData) {
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

            navigate("/manager")
        }
        catch (error) {
            console.error(error)
            toast.error("Não foi possível enviar reprovação, tente novamente")
        }
    }
    async function submitDisapprove({ observation }: OrderDisapprovalData) {
        await mutateAsync({ observation })
    }
    return (
        <form onSubmit={handleSubmit(submitDisapprove)} className={cn("grid items-start gap-4", className)}>
            <div className="grid gap-2">
                <Label htmlFor="observation">Comentário</Label>
                <Textarea
                    id="observation"
                    placeholder=""
                    {...register("observation")}
                    className="w-full"
                    required
                    rows={5}
                />
            </div>
            <Button disabled={isSubmitting} type="submit" className="bg-red-500 hover:bg-red-600">
                {isSubmitting ? <Loader2 className="size-3 animate-spin" /> : "Confirmar reprovação"}
            </Button>
        </form>
    )
}