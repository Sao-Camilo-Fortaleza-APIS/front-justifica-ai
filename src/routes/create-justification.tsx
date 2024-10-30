import { Employee } from "@/api/get-employee-by-cpf"
import { getSectors } from "@/api/gete-sectors"
import { Justification, sendJustification } from "@/api/send-justification"
import { DateTimePicker } from "@/components/datetime-picker"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Mail, MonitorSmartphone, User2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "sonner"

export default function TimeJustificationForm() {
    const navigate = useNavigate()
    const { state } = useLocation()
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState<Justification>({
        complement: "",
        id_tasy: "",
        id_sector: "",
        phone: "",
        date_occurrence: "",
        reason: "",
        is_aware: false,
        mat: null,
        hour: "",
    })
    const employeeData = state?.employee as Employee

    const { data: sectorsData } = useQuery({
        queryKey: ['sectors'],
        queryFn: getSectors,
        refetchOnWindowFocus: false,
    })

    const handleDateChange = (selectedDate: Date | undefined) => {
        if (selectedDate) {
            console.log(selectedDate)
            setFormData(prev => ({ ...prev, date_occurrence: format(selectedDate, "dd/MM/yyyy", { locale: ptBR }) }))
        }
    }
    const handleTimeChange = (selectedTime: string | undefined) => {
        if (selectedTime) {
            const timeFormatted = selectedTime[0] + selectedTime[1] + ":" + selectedTime[2] + selectedTime[3]
            setFormData(prev => ({ ...prev, hour: timeFormatted }))
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
        formData.date_occurrence.trim()
        formData.phone.trim()
        if (formData.complement === "" && formData.id_tasy === "" && formData.id_sector === "" && formData.phone === "" && formData.date_occurrence === "" && formData.reason === "" && formData.is_aware === false && formData.mat === null && formData.hour === "") {
            setIsLoading(false)
            return toast.error("Preencha todos os campos corretamente")
        }
        if (formData.hour > "23:59" || formData.hour < "00:00") {
            setIsLoading(false)
            return toast.error(`Horário "${formData.hour}" inválido`)
        }
        formData.date_occurrence = `${formData.date_occurrence} ${formData.hour}`
        await sendJustification(formData)
            .then(() => {
                setIsLoading(false)
                toast.info("Jusitificativa enviada para a sua gestão")
                // Reset form
                return setFormData({ complement: "", id_tasy: "", id_sector: "", phone: "", date_occurrence: "", reason: "", is_aware: false, mat: null, hour: "" })
            }).catch((error) => {
                setIsLoading(false)
                return toast.error(error.response.data.message)
            })
    }

    console.log("formData", formData)
    //  console.log("employeeData", employeeData)

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
                        className="flex h-9 w-60 items-center justify-between whitespace-nowrap rounded-md border border-input 
                            bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background 
                            focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                        name="sector" id="sector"
                        required
                    >
                        <option value="" className="">Selecione o setor</option>
                        {sectorsData?.map(sector => {
                            return (
                                <option key={sector.nr_sequencia} value={sector.nr_sequencia}>{sector.ds_localizacao}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="space-y-2 flex flex-col">
                    <Label htmlFor="date">Data da ocorrência</Label>
                    <DateTimePicker onDateChange={handleDateChange} onTimeChange={handleTimeChange} />
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
                    <Label htmlFor="phone">Contato/Ramal</Label>
                    <Input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-60"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="complement">Complemento</Label>
                    <Textarea
                        id="complement"
                        name="complement"
                        placeholder=""
                        value={formData.complement}
                        onChange={handleTextareaChange}
                        className="w-2/3"
                        required
                        rows={5}
                    />
                </div>
                <div className="flex items-center space-x-2 space-y-2">
                    <Checkbox id="terms" checked={formData.is_aware} onCheckedChange={(e) => setFormData(prev => ({ ...prev, is_aware: e as boolean }))} required />
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