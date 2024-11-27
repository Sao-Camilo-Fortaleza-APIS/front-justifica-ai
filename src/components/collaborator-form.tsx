import { getEmployeeByCPF } from "@/api/get-employee-by-cpf"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader } from "lucide-react"
import { BaseSyntheticEvent } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { z } from "zod"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

const colaboradorSchema = z.object({
    cpf: z.string().min(11, 'O CPF deve ter 11 dígitos').max(11, 'O CPF deve ter 11 dígitos'),
})
type ColaboradorFormData = z.infer<typeof colaboradorSchema>

export function CollaboratorForm() {
    const navigate = useNavigate()

    const {
        register: registerColaborador,
        handleSubmit: handleSubmitColaborador,
        formState: { errors: errorsCollaborator, isSubmitting: isSubmittingColaborador },
    } = useForm<ColaboradorFormData>({
        resolver: zodResolver(colaboradorSchema),
    });

    const onSubmitColaborador = async (data: ColaboradorFormData, e?: BaseSyntheticEvent | undefined) => {
        e?.preventDefault()
        await getEmployeeByCPF(data.cpf).then((response) => {
            navigate('/create-justification', { state: { employee: response } })
        }).catch((error) => {
            console.error(error)
            toast.error('CPF não encontrado')
        })
    }

    return (
        <form onSubmit={handleSubmitColaborador(onSubmitColaborador)} className="w-full max-w-sm">
            {/* Campo CPF para Colaborador */}
            <div className="mb-4">
                <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cpf">
                    CPF
                </Label>
                <Input
                    type="text"
                    id="cpf"
                    placeholder="Digite seu CPF"
                    className="shadow-sm appearance-none border rounded-md h-12 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    {...registerColaborador('cpf')}
                />
                {errorsCollaborator.cpf && (
                    <p className="text-red-500 text-xs mt-1">{errorsCollaborator.cpf.message}</p>
                )}
            </div>

            {/* Botão de login */}
            <Button
                type="submit"
                className="bg-blue-500 w-full h-12 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                disabled={isSubmittingColaborador}
            >
                {isSubmittingColaborador ? <Loader className='animate-spin' /> : 'Entrar'}
            </Button>
        </form>
    )
}