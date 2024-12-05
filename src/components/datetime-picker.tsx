import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger
} from "@/components/ui/drawer"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "@radix-ui/react-icons"
import { useMediaQuery } from "@uidotdev/usehooks"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { HTMLAttributes, useState } from "react"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp"

interface DatePickerProps extends HTMLAttributes<HTMLButtonElement> {
  onDateChange: (date: Date | undefined) => void
  onTimeChange: (time: string | undefined) => void
}

export function DateTimePicker({ onDateChange, onTimeChange, className }: DatePickerProps) {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
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

  const trigger = (
    <Button variant={'outline'} className={cn(
      "p-2 justify-start text-left font-normal sm:w-full sm:p-4",
      !date && "text-muted-foreground",
      className
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
  )

  const content = (
    <>
      <div className="p-3 flex flex-col items-center gap-1 text- font-medium">
        <span className="text-lg">horário</span>
        <InputOTP maxLength={4} value={time} minLength={4} onChange={handleTimeSelect}>
          <InputOTPGroup className="">
            <InputOTPSlot className="h-16 w-11 sm:h-12 sm:w-10 shadow border-zinc-300" index={0} />
            <InputOTPSlot className="h-16 w-11 sm:h-12 sm:w-10 shadow border-zinc-300" index={1} />
          </InputOTPGroup>
          <span className="text-xl font-bold">:</span>
          <InputOTPGroup>
            <InputOTPSlot className="h-16 w-11 sm:h-12 sm:w-10 shadow border-zinc-300" index={2} />
            <InputOTPSlot className="h-16 w-11 sm:h-12 sm:w-10 shadow border-zinc-300" index={3} />
          </InputOTPGroup>
        </InputOTP>
        <span className="bg-zinc-200 w-full h-[1px] mt-2"></span>
      </div>
      <Calendar
        className="w-full flex flex-col items-center"
        locale={ptBR}
        mode="single"
        selected={date}
        onSelect={handleDateSelect}
        initialFocus
        disabled={(date) =>
          date > new Date() || date < new Date("2024-01-01")
        }
      />
    </>
  )

  if (isDesktop) {
    return (
      <Popover>
        <PopoverTrigger asChild>{trigger}</PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">{content}</PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        {content}
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
