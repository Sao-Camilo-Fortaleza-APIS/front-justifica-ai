import { Employee } from "@/api/get-employee-by-cpf"
import { getSectors } from "@/api/gete-sectors"
import { Justification, sendJustification } from "@/api/send-justification"
import { DateTimePicker } from "@/components/datetime-picker"
import { SelectSector } from "@/components/select-sector"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { IdCard, Mail } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

enum ReasonOptions {
    ausencia = "Ausência de batida",
    falta = "Falta",
    folgaprogramada = "Folga programada",
    outros = "Outros motivos",
}

export default function TimeJustificationForm() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [isLoading, setIsLoading] = useState(false)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isScheduleBreak, setIsScheduleBreak] = useState<boolean>(false)
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
    const employeeData = queryClient.getQueryData<Employee>(["employee"])

    const { data: sectorsData } = useQuery({
        queryKey: ['sectors'],
        queryFn: getSectors,
        refetchOnWindowFocus: false,
        enabled: true,
        placeholderData: keepPreviousData,
    })
    const handleSectorSelectedChange = (value: string) => {
        setFormData(prev => ({ ...prev, id_sector: value }))
    }
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

    const handleSelectedReason = (value: string) => {
        setFormData(prev => ({
            ...prev,
            reason: ReasonOptions[value as keyof typeof ReasonOptions],
        }))
        setIsScheduleBreak(value === "folgaprogramada")
    }

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, complement: e.target.value }))
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        //if (selectedSector) { setFormData(prev => ({ ...prev, id_sector: selectedSector?.nr_sequencia.toString() })) }
        if (!formData.id_sector) {
            setIsLoading(false)
            return toast.error("Setor não informado corretamente")
        }
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
    }, [employeeData, navigate])

    return (
        <>
            <header className="flex justify-between items-center sm:px-6 p-1 shadow bg-white">
                <div className="flex items-center justify-between max-w-4xl mx-auto w-full">
                    <span className="flex items-center gap-2">
                        <img className="size-12" src="/logo_sc_vazada.png" alt="Logo São Camilo" />
                        <h1 className="text-xl font-bold text-zinc-800">Justifica AI</h1>
                    </span>

                    <span className="text-sm font-medium text-muted-foreground antialiased hidden sm:block">
                        {employeeData?.name.split(" ")[0]} {employeeData?.name.split(" ")[1]}
                    </span>
                </div>
            </header>
            <div className="p-6 mt-6 max-w-4xl self-center space-y-4 mx-2 bg-background rounded-lg border-none ring-1 ring-muted shadow-lg shadow-zinc-300">
                <h1 className="text-2xl font-bold mb-6 antialiased text-slate-900">Adicionar Justificativa de Ponto</h1>
                {/* CARD */}
                <div className="flex items-center justify-center">
                    <Card className="w-80 h-48 flex flex-col justify-between bg-gradient-to-bl from-zinc-600 to-red-500">
                        <CardHeader>
                            <CardTitle className="text-white antialiased">{employeeData?.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-white">
                            <CardDescription className="text-white">
                                <span className="text-lg text-left">
                                    {employeeData?.cpf.slice(0, 3)}.
                                    {employeeData?.cpf.slice(3, 6)}.
                                    {employeeData?.cpf.slice(6, 9)}-
                                    {employeeData?.cpf.slice(9, 11)}
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
                    <div className="w-full flex flex-col items-start sm:flex-row gap-5">
                        {/* SECTOR */}
                        <Label htmlFor="sector" className="w-full sm:w-1/2 flex flex-col gap-2">
                            Setor
                            <SelectSector
                                sectors={sectorsData}
                                id="sector"
                                className="text-muted-foreground hover:text-secondary-foreground font-normal"
                                onSelectSector={(sector) => handleSectorSelectedChange(sector.nr_sequencia.toString())}
                            />
                        </Label>

                        {/* REASON */}
                        <Label htmlFor="reason" className="w-full sm:w-1/2 flex flex-col gap-2">
                            Motivo
                            <Select onValueChange={handleSelectedReason} required>
                                <SelectTrigger name="reason" id="reason" className="w-full flex space-x-4 bg-zinc-50 hover:bg-zinc-100 text-muted-foreground font-normal">
                                    <SelectValue placeholder="Selecione um motivo" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(ReasonOptions).map(([key, value]) => (
                                        <SelectItem key={key} value={key}>{value}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </Label>
                    </div>

                    <div className="flex flex-col items-start sm:flex-row gap-5">
                        {/* DATE */}
                        <Label htmlFor="date" className="w-full sm:w-1/2 flex flex-col gap-2">
                            Data da ocorrência
                            <DateTimePicker
                                onDateChange={handleDateChange}
                                onTimeChange={handleTimeChange}
                                isScheduleBreak={isScheduleBreak}
                                className="w-full"
                                id="date"
                            />
                        </Label>

                        {/* PHONE */}
                        <Label htmlFor="phone" className="w-full sm:w-1/2 flex flex-col gap-2">
                            Contato/Ramal
                            <Input
                                name="phone"
                                type="number"
                                value={formData.phone}
                                min={0}
                                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                className="w-full sm:w-full bg-zinc-50 hover:bg-zinc-100 font-normal"
                                placeholder="Digite o ramal para contato"
                                required
                            />
                        </Label>
                    </div>

                    {/* COMPLEMENT */}
                    <div className="w-full space-y-2">
                        <Label htmlFor="complement">Complemento</Label>
                        <Textarea
                            id="complement"
                            name="complement"
                            placeholder=""
                            value={formData.complement}
                            onChange={handleTextareaChange}
                            className="w-full bg-zinc-50 hover:bg-zinc-100"
                            required
                            rows={5}
                        />
                    </div>
                    <div className="flex items-center space-x-2 space-y-4">
                        <Checkbox id="terms" checked={formData.is_aware} onCheckedChange={(e) => setFormData(prev => ({ ...prev, is_aware: e as boolean }))} required />
                        <label
                            htmlFor="terms"
                            className="text-sm text-gray-600 whitespace-break-spaces"
                        >
                            Estou ciente que esta justificativa será analisada, podendo ser justificada e abonada,
                            ou justificada e não abonada, conforme previsto na legislação vigente. ART. 482 CLT Alinea "E".
                        </label>
                    </div>

                    <div className="flex flex-col w-full sm:flex-row items-center justify-between gap-4 pb-10 sm:pb-0">
                        <Button type="submit" disabled={isLoading} className="w-full py-6 sm:w-fit sm:py-0">
                            {isLoading ? "Enviando..." : "Enviar Justificativa"}
                        </Button>
                        <Button type="button" variant="destructive" disabled={isLoading} className="w-full py-6 sm:w-fit sm:py-0" onClick={() => navigate("/")}>
                            Cancelar
                        </Button>

                    </div>
                </form>
            </div >
        </>
    )
}