import { Employee } from "@/api/get-employee-by-cpf"
import { getSectors, Sector } from "@/api/gete-sectors"
import { Justification, sendJustification } from "@/api/send-justification"
import { DateTimePicker } from "@/components/datetime-picker"
import { SelectSector } from "@/components/select-sector"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { IdCard, Mail } from "lucide-react"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "sonner"

export default function TimeJustificationForm() {
    const navigate = useNavigate()
    const { state } = useLocation()
    const [isLoading, setIsLoading] = useState(false)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [selectedSector, setSelectedSector] = useState<Sector | null>(null)
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
        enabled: true,
        placeholderData: keepPreviousData,
    })

    const handleDateChange = (selectedDate: Date | undefined) => {
        if (selectedDate) {
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
        if (!formData.hour) {
            setIsLoading(false)
            return toast.error("Selecione o horário")
        }
        if (!formData.date_occurrence) {
            setIsLoading(false)
            return toast.error("Preencha a data corretamente")
        }
        formData.phone.trim()
        if (formData.complement === "" && formData.id_tasy === "" && formData.id_sector === "" && formData.phone === "" && formData.date_occurrence.length === 0 && formData.reason === "" && formData.is_aware === false && formData.mat === null) {
            setIsLoading(false)
            return toast.error("Preencha todos os campos corretamente")
        }
        if (formData.hour > "23:59" || formData.hour < "00:00") {
            setIsLoading(false)
            return toast.error(`Horário inválido`)
        }
        formData.date_occurrence = `${formData.date_occurrence} ${formData.hour}`
        await sendJustification(formData)
            .then((response) => {
                console.log(response.order)
                setIsLoading(false)
                toast.info("Jusitificativa enviada para a sua gestão", {
                    description: `${response.order}`,
                })
                // Reset form
                setFormData({ complement: "", id_tasy: "", id_sector: "", phone: "", date_occurrence: "", reason: "", is_aware: false, mat: null, hour: "" })
                return navigate("/", { replace: true })
            }).catch((error) => {
                setIsLoading(false)
                return toast.error(error.response.data.message)
            })
    }

    useEffect(() => {
        if (!employeeData) return navigate('/')

        setFormData(prev => ({ ...prev, mat: employeeData.mat, id_tasy: employeeData.id_tasy.toString() }))
        // setFormData(prev => ({ ...prev, id_tasy: employeeData.id_tasy }))
    }, [])

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-4 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">Justificativa de Ponto</h1>
            {/* CARD */}
            <div className="flex items-center justify-center">
                <Card className="w-80 h-48 flex flex-col justify-between bg-gradient-to-bl from-zinc-600 to-red-500">
                    <CardHeader>
                        <CardTitle className="text-white antialiased">{employeeData?.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-white">
                        <CardDescription className="text-white">
                            <span className="text-lg text-left">
                                {employeeData?.cpf}
                            </span>
                            <div className="flex items-center">
                                <Mail className="mr-2 h-4 w-4" />
                                <span>{employeeData?.email}</span>
                            </div>
                            <div className="flex items-center">
                                <IdCard className="mr-2 h-4 w-4" />
                                <span>{employeeData?.mat}</span>
                            </div>
                        </CardDescription>
                    </CardContent>
                </Card>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 w-full mt-4">
                <div className="flex flex-col items-start gap-2">
                    <div className="space-y-2">
                        <Label htmlFor="sector">Setor</Label>
                        <select
                            value={formData.id_sector}
                            onChange={(e) => handleSectorSelectedChange(e.target.value)}
                            className="flex h-9 w-full sm:w-60 items-center justify-between whitespace-nowrap rounded-md border border-input 
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
                        <SelectSector sectors={sectorsData} onSelect={(sector) => setSelectedSector(sector)} />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="date">Data da ocorrência</Label>
                        <DateTimePicker onDateChange={handleDateChange} onTimeChange={handleTimeChange} />
                    </div>
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