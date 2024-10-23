import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useState } from "react"

type DatePickerProps = {
  onDateChange: (date: Date | undefined) => void
}

export function DatePicker({ onDateChange }: DatePickerProps) {
  const [date, setDate] = useState<Date>()

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    onDateChange(selectedDate)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={'outline'} className={cn(
          "p-2 justify-start text-left font-normal sm:w-[240px] sm:p-4",
          !date && "text-muted-foreground"
        )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 " />
          {date
            ? format(date, "EEEEEE, dd MMM, yyyy", { locale: ptBR })
            : <span>Selecione uma data</span>
          }
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          locale={ptBR}
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          initialFocus
          disabled={(date) =>
            date > new Date() || date < new Date("2024-01-01")
          }
        />
      </PopoverContent>
    </Popover>
  )
}
