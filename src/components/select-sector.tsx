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
import { useQueryClient } from "@tanstack/react-query"
import { useMediaQuery } from "@uidotdev/usehooks"
import { useEffect, useState } from "react"
type SelectSectorProps = {
    sectors?: Sectors
    onSelect?: (sector: Sector) => void
}
export function SelectSector({ sectors, onSelect }: SelectSectorProps) {
    const [open, setOpen] = useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")
    const [selectedSector, setSelectedSector] = useState<Sector | null>(null)

    const handleSelectSector = (sector: Sector | null) => {
        setSelectedSector(sector)
        if (onSelect) {
            onSelect(sector!)
        }
    }

    if (isDesktop) {
        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="justify-start w-fit max-w-48 overflow-hidden">
                        {selectedSector ? <>{selectedSector.ds_localizacao}</> : <>Selecionar setor</>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0" align="start">
                    <SectorList list={sectors} setOpen={setOpen} setSelectedSector={handleSelectSector} />
                </PopoverContent>
            </Popover>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline" className="w-[150px] justify-start">
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
            } catch (error) {
                console.error("Erro ao carregar setores:", error)
                setSectorsData([])
            } finally {
                setIsLoading(false)
            }
        }

        loadSectors()
    }, [queryClient, list])

    if (isLoading) {
        return <div>Carregando setores...</div>
    }

    return (
        <Command>
            <CommandInput placeholder="Filtre um setor..." />
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
                <CommandEmpty>No results found.</CommandEmpty>
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
