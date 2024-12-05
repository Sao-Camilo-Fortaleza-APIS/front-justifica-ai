import api from "@/lib/axios"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import Cookies from "js-cookie"
import { Loader2 } from "lucide-react"
import { ComponentProps } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { z } from "zod"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Textarea } from "./ui/textarea"

const orderApprovalSchema = z.object({
    observation: z.string({ message: "Campo obrigatório" }),
    treatment: z.string({ message: "Campo obrigatório" })
})
type OrderApprovalData = z.infer<typeof orderApprovalSchema>

type ApproveOrderFormProps = ComponentProps<"form"> & { approve: boolean, orderId: number }

enum TreatmentOptions {
    Banco = "Utilizar banco de horas",
    abonar = "Abonar",
    descontar = "Descontar em folha"
}

export function ApproveOrderForm({ className, approve, orderId }: ApproveOrderFormProps) {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm<OrderApprovalData>({
        resolver: zodResolver(orderApprovalSchema),
    })

    const { mutateAsync } = useMutation({
        mutationFn: async ({ observation, treatment }: OrderApprovalData) => {
            console.log({ observation, treatment })
            handleSendApprove({ observation, treatment })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["justification-pendents"] })
        }
    })

    async function handleSendApprove({ observation, treatment }: OrderApprovalData) {
        if (!Cookies.get("j.ai.user")) {
            toast.error("Usuário não autenticado")
            return navigate("/manager/login")
        }
        if (!orderId) {
            return toast.error("Erro ao enviar aprovação, sem número da ordem")
        }
        if (!observation) {
            return toast.error("Faltando observação")
        }
        if (!treatment) {
            return toast.error("Faltando tratamento")
        }
        if (!approve) {
            return toast.error("Erro ao enviar aprovação, sem resposta de aprovação")
        }

        try {
            const user = Cookies.get("j.ai.user")
            const data = {
                user: user,
                order: orderId,
                treatment: TreatmentOptions[treatment as keyof typeof TreatmentOptions],
                observation: observation,
                approve
            }
            console.log(data)
            const response = await api.post("/justification/manager/action", data)
            console.log(response)
            toast.info("Aprovação enviada com sucesso")

            navigate("/manager")
        } catch (error) {
            if (error instanceof AxiosError) {
                return toast.error(error.response?.data.message)
            }
            return toast.error("Erro ao enviar aprovação, tente novamente")
        }
    }

    async function submitApprove({ observation, treatment }: OrderApprovalData) {
        await mutateAsync({ observation, treatment })
    }

    const handleRadioChange = (value: string) => {
        setValue("treatment", value)
        console.log(value)
    }

    return (
        <form onSubmit={handleSubmit(submitApprove)} className={cn("grid items-start gap-4", className)}>
            <div className="grid gap-2">
                <Label htmlFor="treatment">Apreciação</Label>
                <RadioGroup
                    onValueChange={handleRadioChange}
                    required
                    id="treatment"
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
                    {errors.treatment && (
                        <span className="text-red-500">{errors?.treatment?.message}</span>
                    )}
                </RadioGroup>
            </div>
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
                {errors.observation && (
                    <span className="text-red-500">{errors?.observation?.message}</span>
                )}
            </div>

            <Button disabled={isSubmitting} type="submit" className="bg-emerald-600 hover:bg-emerald-500">
                {isSubmitting ? <Loader2 className="size-3 animate-spin" /> : "Confirmar aprovação"}
            </Button>
        </form>
    )
}