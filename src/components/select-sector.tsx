import { getSectors, Sector, Sectors } from "@/api/gete-sectors"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useQueryClient } from "@tanstack/react-query"
import { useMediaQuery } from "@uidotdev/usehooks"
import { HTMLAttributes, useEffect, useState } from "react"
interface SelectSectorProps extends HTMLAttributes<HTMLDivElement> {
    sectors?: Sectors
    onSelectSector?: (sector: Sector) => void
    reset?: boolean
}
export function SelectSector({ sectors, onSelectSector, className, reset = false }: SelectSectorProps) {
    const [open, setOpen] = useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")
    const [selectedSector, setSelectedSector] = useState<Sector | null>(null)

    const handleSelectSector = (sector: Sector | null) => {
        setSelectedSector(sector)
        if (onSelectSector) {
            onSelectSector(sector!)
        }
    }

    useEffect(() => {
        if (reset) {
            setSelectedSector(null)
        }
    }, [reset])

    if (isDesktop) {
        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild >
                    <Button
                        variant="outline"
                        className={cn("justify-start w-full overflow-hidden font-normal antialiased", className)}
                    >
                        {selectedSector ? <>{selectedSector.ds_localizacao}</> : <>Selecionar setor</>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0" align="start">
                    <SectorList list={sectors} setOpen={setOpen} setSelectedSector={handleSelectSector} />
                </PopoverContent>
            </Popover >
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline" className={cn("w-full justify-start overflow-hidden font-normal antialiased", className)}>
                    {selectedSector ? <>{selectedSector.ds_localizacao}</> : <>Selecionar setor</>}
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mt-4 border-t">
                    <SectorList list={sectors} setOpen={setOpen} setSelectedSector={handleSelectSector} />
                </div>
            </DrawerContent>
        </Drawer>
    )
}

function SectorList({
    setOpen,
    setSelectedSector,
    list
}: {
    setOpen: (open: boolean) => void
    setSelectedSector: (sector: Sector | null) => void
    list?: Sectors
}) {
    const queryClient = useQueryClient()
    const [sectorsData, setSectorsData] = useState<Sectors>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadSectors = async () => {
            if (list && list.length > 0) {
                setSectorsData(list)
                setIsLoading(false)
                return
            }
            try {
                const data = await queryClient.ensureQueryData<Sectors>({
                    queryKey: ['sectors'],
                    queryFn: getSectors
                })
                setSectorsData(data || [])
                setIsLoading(false)

            } catch (error) {
                console.error("Erro ao carregar setores:", error)
                setSectorsData([])
                setIsLoading(false)
            }
        }

        loadSectors()
    }, [queryClient, list])

    if (isLoading) {
        return <span className="text-sm">Carregando setores...</span>
    }

    return (
        <Command>
            <CommandInput autoFocus placeholder="Filtre um setor..." />
            <Button
                variant="link"
                size="sm"
                className="w-full text-muted-foreground"
                onClick={() => {
                    setSelectedSector(null)
                    setOpen(false)
                }}
            >
                Limpar filtro
            </Button>
            <CommandList>
                <CommandEmpty>Resultado não encontrado</CommandEmpty>
                <CommandGroup>
                    {sectorsData.map((sector) => (
                        <CommandItem
                            key={sector.nr_sequencia}
                            value={sector.ds_localizacao}
                            onSelect={(value) => {
                                setSelectedSector(
                                    sectorsData.find((sector) => sector.ds_localizacao === value) || null
                                )
                                setOpen(false)
                            }}
                        >
                            {sector.ds_localizacao}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
    )
}
