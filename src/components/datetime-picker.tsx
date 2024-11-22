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
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp"

type DatePickerProps = {
  onDateChange: (date: Date | undefined) => void
  onTimeChange: (time: string | undefined) => void
}

export function DateTimePicker({ onDateChange, onTimeChange }: DatePickerProps) {
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<string>()

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    onDateChange(selectedDate)
  }
  const handleTimeSelect = (selectedTime: string | undefined) => {
    setTime(selectedTime)
    onTimeChange(selectedTime)
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
            ? (
              `${format(date, "EEEEEE, dd MMM, yyyy", { locale: ptBR })}` + (time ? ` às ${time.substring(0, 2)}:${time.substring(2)}` : "")
            ) : (
              <span>Selecione uma data</span>
            )
          }
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-3 flex flex-col items-center gap-1 text- font-medium">
          <span>horário</span>
          <InputOTP maxLength={4} value={time} minLength={4} onChange={handleTimeSelect}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
            </InputOTPGroup>
            <span className="text-xl font-bold">:</span>
            <InputOTPGroup>
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>

          <span className="bg-zinc-200 w-full h-[1px] mt-3"></span>
        </div>
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
