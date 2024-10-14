import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import api from "@/lib/axios"
import { useState } from "react"

interface ApplicantInformation {
    name: string
    email: string
    mat: number
    id_tasy: number
}

// Simulated API call for CPF validation
const validateCPF = async (cpf: string): Promise<boolean> => {
    // In a real application, this would be an API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    return cpf.length === 11 // Simple validation for demonstration
}

export default function TimeJustificationForm() {
    const [cpf, setCpf] = useState("")
    const [isValidCPF, setIsValidCPF] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        date: "",
        time: "",
        occurrenceType: "",
        reason: ""
    })
    // estado com dados do usuário
    const [applicantInformation, setApplicantInformation] = useState<ApplicantInformation | null>(null)
    const { toast } = useToast()

    const handleCPFSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        const isValid = await validateCPF(cpf)
        const response = await api.get(`/applicant_information/${cpf}`)
        // mostrar os dados do usuário  
        console.log(response.data)
        setApplicantInformation(response.data)
        setIsValidCPF(isValid)
        setIsLoading(false)
        if (!isValid) {
            toast({
                title: "Invalid CPF",
                description: "Please enter a valid CPF.",
                variant: "destructive"
            })
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (value: string) => {
        setFormData(prev => ({ ...prev, occurrenceType: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        // Simulated API call for form submission
        await new Promise(resolve => setTimeout(resolve, 1000))
        setIsLoading(false)
        toast({
            title: "Justification Submitted",
            description: "Your time justification has been successfully submitted.",
        })
        // Reset form
        setFormData({ date: "", time: "", occurrenceType: "", reason: "" })
        setIsValidCPF(false)
        setCpf("")
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">Time Justification Form</h1>

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
                        {isLoading ? "Validating..." : "Search"}
                    </Button>
                </form>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input value={applicantInformation?.name} readOnly />
                    <div className="space-y-2">
                        <Label htmlFor="date">Date of Occurrence</Label>
                        <Input
                            id="date"
                            name="date"
                            type="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="time">Time of Occurrence</Label>
                        <Input
                            id="time"
                            name="time"
                            type="time"
                            value={formData.time}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="occurrenceType">Type of Occurrence</Label>
                        <Select onValueChange={handleSelectChange} value={formData.occurrenceType}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select occurrence type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="entrance">Company Entrance</SelectItem>
                                <SelectItem value="lunchStart">Lunch Start</SelectItem>
                                <SelectItem value="lunchEnd">Lunch End</SelectItem>
                                <SelectItem value="exit">Company Exit</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="reason">Reason for Justification</Label>
                        <Textarea
                            id="reason"
                            name="reason"
                            placeholder="Enter your justification reason"
                            value={formData.reason}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Submitting..." : "Submit Justification"}
                    </Button>
                </form>
            )}
        </div>
    )
}