import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import SearchIcon from "../../../../public/icons/Search";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "@/lib/config/apiConfig";
import { CommandItem } from "cmdk";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/redux/hooks";
import { GET_PRODUCT_BY_ID } from "@/lib/redux/slices/product/productSlice";
import LoadingDots from "@/components/ui/custom/loadingDots";

interface Product {
  _id: string;
  title: string;
  imageData: string[];
  price: number;
}
const Search = () => {
  const dispatch = useAppDispatch();
  const [inputText, setInputText] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // -------- GET PRODUCT DETAILS ON CLICK -----------
  const handleOnSelect = (v: any) => {
    dispatch(GET_PRODUCT_BY_ID(v));
    setIsOpen(false);
    setProducts([])
    setInputText("")
    router.push(`/collections/${v.category.category}/product_details/${v._id}`);
  };

  // ------ SHIFT TO ALL PRODUCT DETAILS ----------------
  const handleShiftAllProducts = (text: string) => {
    setIsOpen(false)
    setProducts([])
    setInputText("")
    router.push(`/searched-products/${text}`);
  };

  // ---------- CLEAR THE PREVIOUS ARRAY ----------
  const handleOpenSidebar = () => {
    setIsOpen(true)
    setProducts([])
    setInputText("")
  }
  // --------- FETCH THE PRODCTS ON THE BASIS OF TEXT SEARCHED---------
  useEffect(() => {

    if (!inputText) {
      setProducts([]);

    }
    const fetchSearch = setTimeout(async () => {
      if (inputText) {
        try {
          setIsLoading(true);

          const response = await axios.get(
            `${baseUrl}/product/search?title=${inputText}`
          );
          setIsLoading(false);

          setProducts(response?.data?.result);
        } catch (error: any) {
          console.log(error);
          setError(error);
        }
      }
    }, 600);
    return () => clearTimeout(fetchSearch);
  }, [inputText]);
  return (
    <section className="z-60 ">
      <Sheet>
        <SheetTrigger onClick={handleOpenSidebar} asChild>
          <SearchIcon className="cursor-pointer" />
        </SheetTrigger>

        {isOpen && (
          <SheetContent className="flex justify-center" side={"top"}>
            <Command className="w-1/2 ">
              <div className="relative">
                <CommandInput
                  onValueChange={setInputText}
                  value={inputText}
                  placeholder=" search..."
                />
                {
                  isLoading && <div className="absolute right-3 top-4"><LoadingDots /></div>
                }

              </div>

              <CommandList className="custom_scrollbar ">
                <CommandEmpty>{isLoading ? 'Searching...' : !inputText ? 'Search for results' : 'No results found.'}</CommandEmpty>
                {products && products.length !== 0 && (
                  <CommandGroup className="z-10  rounded-sm  w-full bg-inherit">
                    {products.slice(0, 5).map((v) => {
                      return (
                        <CommandItem
                          className="cursor-pointer h-32 overflow-hidden"
                          key={v._id}
                          value={v.title}
                          onSelect={() => handleOnSelect(v)}
                        >
                          {/* ----------Image----------- */}
                          <div className=" flex items-start capitalize justify-start overflow-hidden h-full  ">
                            <Image
                              alt="serch image"
                              width={100}
                              height={120}
                              className="w-20 h-auto "
                              src={v.imageData[0]}
                            />

                            {/*------- Title and Price----------- */}
                            <div className=" text-base py-2 px-8 font-medium">
                              <div>{v.title}</div>
                              <div>Rs. {v.price}</div>
                            </div>
                          </div>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                )}
                {
                  products && products.length > 0 && (< div className="text-base text-blue-500 font-medium">
                    <span onClick={() => handleShiftAllProducts(inputText)} className="hover:cursor-pointer hover:underline">
                      Click to see {products && products.length} products
                    </span>
                  </div>)
                }

              </CommandList>
            </Command>
          </SheetContent>
        )}
      </Sheet>
    </section >
  );
};

export default Search;
