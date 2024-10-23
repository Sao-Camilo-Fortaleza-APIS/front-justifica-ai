import { Employee, getEmployeeByCPF } from "@/api/get-employee-by-cpf"
import { getSectors } from "@/api/gete-sectors"
import { Justification, sendJustification } from "@/api/send-justification"
import { DatePicker } from "@/components/date-picker"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useQuery } from "@tanstack/react-query"
import { Mail, MonitorSmartphone, User2 } from "lucide-react"
import { useState } from "react"

export default function TimeJustificationForm() {
    const [cpf, setCpf] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isValidCPF, setIsValidCPF] = useState(false)
    const [employee, setEmployee] = useState<Employee | null>(null)
    const [formData, setFormData] = useState<Justification>({
        complement: "",
        id_tasy: "",
        id_sector: "",
        phone: 0,
        date_occurency: "",
        reason: "",
        is_aware: false,
        mat: null,
    })
    const { toast } = useToast()

    /* const fakeSectorData: Sectors = [
        {
            "ds_localizacao": "ADMINISTRAÇÃO DO SERVIÇO DE IMAGEM",
            "nr_sequencia": 41
        },
        {
            "ds_localizacao": "AGÊNCIA TRANSFUSIONAL",
            "nr_sequencia": 42
        },
        {
            "ds_localizacao": "ALMOXARIFADO",
            "nr_sequencia": 43
        },
        {
            "ds_localizacao": "ALOJAMENTO CONJUNTO",
            "nr_sequencia": 44
        },
        {
            "ds_localizacao": "ALOJAMENTO CONJUNTO 3º LESTE",
            "nr_sequencia": 45
        },
        {
            "ds_localizacao": "ANÁLISE DE CONTAS MÉDICAS",
            "nr_sequencia": 46
        },
        {
            "ds_localizacao": "ASSESSORIA JURÍDICA",
            "nr_sequencia": 49
        },
        {
            "ds_localizacao": "AUDITORIA INTERNA",
            "nr_sequencia": 50
        },
        {
            "ds_localizacao": "AUDITÓRIO E SALA DE REUNIÕES",
            "nr_sequencia": 51
        },
        {
            "ds_localizacao": "AUTORIZAÇÕES",
            "nr_sequencia": 52
        },
        {
            "ds_localizacao": "CASA DE RESÍDUOS",
            "nr_sequencia": 53
        },
        {
            "ds_localizacao": "CENTRAL DE ABASTECIMENTO FARMACÊUTICO",
            "nr_sequencia": 54
        }
    ] */

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data: sectorsData } = useQuery({
        queryKey: ['sectors'],
        queryFn: getSectors
    })

    async function handleCPFSubmit(e: React.FormEvent) {
        e.preventDefault()
        setIsLoading(true)
        const response = await getEmployeeByCPF(cpf)
        setEmployee(response)
        setIsLoading(false)
        setIsValidCPF(true)
    }

    const handleDateChange = (selectedDate: Date | undefined) => {
        if (selectedDate) {
            setFormData(prev => ({ ...prev, date_occurency: selectedDate.toISOString() }))
        }
    }

    const handleRadioChange = (value: string) => {
        setFormData(prev => ({ ...prev, reason: value }))
    }

    const handleSectorSelectedChange = (value: string) => {
        setFormData(prev => ({ ...prev, sector: value }))
    }
    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, complement: e.target.value }))
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        await sendJustification(formData).then(() => {
            setIsLoading(false)
            toast({
                title: "Justificativa enviada",
                description: "A sua justificativa de ponto foi enviada para a gestão.",
            })
            // Reset form
            setFormData({ complement: "", id_tasy: "", id_sector: "", phone: 0, date_occurency: "", reason: "", is_aware: false, mat: null, })
            setIsValidCPF(false)
            setCpf("")
        }).catch(() => {
            toast({
                title: "Falha ao enviar justificativa",
                description: "Ocorreu um erro ao enviar a justificativa de ponto, tente novamente.",
            })
            setIsLoading(false)
        })
    }

    return (
        <div className="px-1 py-3 sm:p-6 max-w-4xl mx-auto space-y-4 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">Justificativa de Ponto</h1>

            {!isValidCPF ? (
                <form onSubmit={handleCPFSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="cpf">CPF</Label>
                        <Input
                            id="cpf"
                            placeholder="Enter your CPF"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Validando..." : "Buscar Funcionário"}
                    </Button>
                </form>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4 w-full mt-4">
                    <div className="flex flex-col">
                        <div className="flex items-center">
                            <User2 className="mr-2 h-4 w-4" />
                            <span className="font-semibold">{employee?.name}</span>
                        </div>
                        <div className="flex items-center">
                            <Mail className="mr-2 h-4 w-4" />
                            <span className="">{employee?.email}</span>
                        </div>
                        <div className="flex items-center">
                            <MonitorSmartphone className="mr-2 h-4 w-4" />
                            <span>{employee?.mat}</span>
                        </div>
                    </div>


                    <div className="space-y-2">
                        <Label htmlFor="sector">Setor</Label>
                        <select
                            className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input 
                            bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background 
                            focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                            name="" id="">
                            <option value="" className="">Selecione o setor</option>
                            {sectorsData?.map(sector => {
                                return (
                                    <option key={sector.nr_sequencia} value={sector.nr_sequencia}>{sector.ds_localizacao}</option>
                                )
                            })}
                        </select>
                        <Select value={formData.id_sector} onValueChange={handleSectorSelectedChange} required>
                            <SelectTrigger className="text-muted-foreground" id="subevent">
                                <SelectValue placeholder="Selecione o setor" />
                            </SelectTrigger>
                            <SelectContent>
                                {sectorsData?.map(sector => {
                                    return (
                                        <SelectItem key={sector.nr_sequencia} value={`${sector.nr_sequencia}`}>{sector.ds_localizacao}</SelectItem>
                                    )
                                })}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="date">Data da ocorrência</Label>
                        {/* <Input
                            id="date"
                            name="date"
                            type="date"
                            value={formData.date_occurency}
                            onChange={handleDateChange}
                            required
                        /> */}
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
            )
            }
        </div >
    )
}