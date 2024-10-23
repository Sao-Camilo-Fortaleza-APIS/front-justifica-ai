import { cn } from "@/lib/utils";
import { DatePicker } from "./date-picker";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export function SendJustificationForm({ className }: React.ComponentProps<"form">) {
  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <label htmlFor="date">Data da ocorrência</label>
        <DatePicker />
      </div>

      <div className="grid gap-2">
        <label htmlFor="se">Nome</label>
        <Select>
          <SelectTrigger className="text-muted-foreground">
            <SelectValue placeholder="Selecione um motivo" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="1">Teste</SelectItem>
            <SelectItem value="2">Teste</SelectItem>
            <SelectItem value="3">Teste</SelectItem>
            <SelectItem value="4">Teste</SelectItem>
            <SelectItem value="5">Teste</SelectItem>
          </SelectContent>
        </Select>

        {/* <ComboBoxResponsive /> */}
      </div>

      <div className="grid gap-2">
        <label htmlFor="sector">Setor</label>
        <Select>
          <SelectTrigger id="sector" className="text-muted-foreground">
            <SelectValue placeholder="Selecione um setor" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="1">Teste</SelectItem>
            <SelectItem value="2">Teste</SelectItem>
            <SelectItem value="3">Teste</SelectItem>
            <SelectItem value="4">Teste</SelectItem>
            <SelectItem value="5">Teste</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">Enviar justificativa</Button>
    </form>
  )
}