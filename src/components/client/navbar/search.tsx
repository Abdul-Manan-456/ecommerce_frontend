import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import SearchIcon from "../../../../public/icons/Search";
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command";

const Search = () => {
    return (
        <section className="z-60 ">
            <Sheet>
                <SheetTrigger asChild >
                    <SearchIcon className="cursor-pointer" />
                </SheetTrigger>
                <SheetContent className="flex justify-center" side={'top'} >
                    <Command className="w-1/2 ">
                        <CommandInput placeholder=" search..." />
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            {/* <CommandGroup heading="Suggestions">
                                <CommandItem>Maria b.</CommandItem>
                                <CommandItem>Bareeze</CommandItem>
                                <CommandItem>Khaadi</CommandItem>
                            </CommandGroup>
                            <CommandSeparator />
                            <CommandGroup heading="Settings">
                                <CommandItem>Winter</CommandItem>
                                <CommandItem>Summer</CommandItem>
                            </CommandGroup> */}
                        </CommandList>
                    </Command>
                </SheetContent>
            </Sheet>
        </section>
    )
}

export default Search
