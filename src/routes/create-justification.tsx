import { Employee } from "@/api/get-employee-by-cpf"
import { getSectors } from "@/api/gete-sectors"
import { Justification, sendJustification } from "@/api/send-justification"
import { DatePicker } from "@/components/date-picker"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useQuery } from "@tanstack/react-query"
import { Mail, MonitorSmartphone, User2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export default function TimeJustificationForm() {
    const navigate = useNavigate()
    const { state } = useLocation()
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState<Justification>({
        complement: "",
        id_tasy: "",
        id_sector: "",
        phone: 0,
        date_occurrence: "",
        reason: "",
        is_aware: false,
        mat: null,
    })
    const employeeData = state?.employee as Employee
    const { toast } = useToast()

    const { data: sectorsData } = useQuery({
        queryKey: ['sectors'],
        queryFn: getSectors
    })

    const handleDateChange = (selectedDate: Date | undefined) => {
        if (selectedDate) {
            setFormData(prev => ({ ...prev, date_occurrence: selectedDate.toISOString() }))
        }
    }

    const handleRadioChange = (value: string) => {
        setFormData(prev => ({ ...prev, reason: value }))
    }

    const handleSectorSelectedChange = (value: string) => {
        setFormData(prev => ({ ...prev, id_sector: value }))
    }
    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, complement: e.target.value }))
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        await sendJustification(formData)
            .then(() => {
                setIsLoading(false)
                toast({
                    title: "Justificativa enviada",
                    description: "A sua justificativa de ponto foi enviada para a gestão.",
                })
                // Reset form
                setFormData({ complement: "", id_tasy: "", id_sector: "", phone: 0, date_occurrence: "", reason: "", is_aware: false, mat: null, })
            }).catch(() => {
                toast({
                    title: "Falha ao enviar justificativa",
                    description: "Ocorreu um erro ao enviar a justificativa de ponto, tente novamente.",
                })
                setIsLoading(false)
            })
    }

    console.log("formData", formData)
    console.log("employeeData", employeeData)

    useEffect(() => {
        if (!employeeData) return navigate('/')

        setFormData(prev => ({ ...prev, mat: employeeData.mat, id_tasy: employeeData.id_tasy.toString() }))
        // setFormData(prev => ({ ...prev, id_tasy: employeeData.id_tasy }))
    }, [])

    return (
        <div className="px-1 py-3 sm:p-6 max-w-4xl mx-auto space-y-4 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">Justificativa de Ponto</h1>
            <form onSubmit={handleSubmit} className="space-y-4 w-full mt-4">
                <div className="flex flex-col">
                    <div className="flex items-end leading-tight space-x-2">
                        <User2 className="h-6 w-6" />
                        <span className="font-semibold">{employeeData?.name}</span>
                    </div>
                    <div className="flex items-center">
                        <Mail className="mr-2 h-4 w-4" />
                        <span className="">{employeeData?.email}</span>
                    </div>
                    <div className="flex items-center">
                        <MonitorSmartphone className="mr-2 h-4 w-4" />
                        <span>{employeeData?.mat}</span>
                    </div>
                </div>


                <div className="space-y-2">
                    <Label htmlFor="sector">Setor</Label>
                    <select
                        value={formData.id_sector}
                        onChange={(e) => handleSectorSelectedChange(e.target.value)}
                        className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input 
                            bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background 
                            focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                        name="sector" id="sector"
                    >
                        <option value="" className="">Selecione o setor</option>
                        {sectorsData?.map(sector => {
                            return (
                                <option key={sector.nr_sequencia} value={sector.nr_sequencia}>{sector.ds_localizacao}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="date">Data da ocorrência</Label>
                    <DatePicker onDateChange={handleDateChange} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="time">Motivo</Label>
                    <RadioGroup
                        onValueChange={handleRadioChange}
                        required
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="ausencia" id="ausencia" />
                            <Label htmlFor="ausencia">Ausência de batida</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="falta" id="falta" />
                            <Label htmlFor="falta">Falta sem justificativa</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="outros" id="outros" />
                            <Label htmlFor="outros">Outros</Label>
                        </div>
                    </RadioGroup>

                </div>
                <div className="space-y-2">
                    <Label htmlFor="complement">Complemento</Label>
                    <Textarea
                        id="complement"
                        name="complement"
                        placeholder=""
                        value={formData.complement}
                        onChange={handleTextareaChange}
                        required
                        rows={5}
                    />
                </div>
                <div className="flex items-center space-x-2 space-y-2">
                    <Checkbox id="terms" />
                    <label
                        htmlFor="terms"
                        className="text-sm text-gray-600 whitespace-break-spaces"
                    >
                        Estou ciente que esta justificativa será analisada, podendo ser justificada e abonada,
                        ou justificada e não abonada, conforme previsto na legislação vigente. ART. 482 CLT Alinea "E".
                    </label>
                </div>

                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Enviando..." : "Enviar Justificativa"}
                </Button>
            </form>
        </div >
    )
}