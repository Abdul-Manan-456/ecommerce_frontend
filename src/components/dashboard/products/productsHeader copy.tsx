// "use client";
// import { Button } from "@/components/ui/button";
// import Heading from "@/components/ui/typography/heading";
// import EditPen from "../../../../public/icons/EditPen";
// import { Trash } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
// import { useToast } from "@/components/ui/use-toast";
// import DeleteProduct from "./deleteProduct";

// const ProductsHeader = () => {
//   const router = useRouter();
//   const { toast } = useToast();
//   const { productIds } = useAppSelector((state) => state.products);
//   const isTrashDisabled = productIds.length === 0 || productIds.length > 1;
//   const css = !isTrashDisabled ? "text-black" : "text-gray-500";
//   const dispatch = useAppDispatch();
//   const navigateAddProducts = () => {
//     router.push("/dashboard/products/add-products");
//   };
//   const navigateEditProduct = () => {
//     if (productIds.length === 0) {
//       return toast({
//         description: "Please select a product",
//       });
//     }
//     if (productIds.length > 1) {
//       return toast({
//         description: "Please select Single product",
//       });
//     }
//     router.push("/dashboard/products/edit-product");
//   };

//   const handleDeleteProduct = () => {
//     if (productIds.length === 0) {
//       return toast({
//         description: "Please select a product",
//       });
//     }
//     if (productIds.length > 1) {
//       return toast({
//         description: "Please select Single product",
//       });
//     }
//   };

//   return (
//     <div className="flex items-center justify-between mb-3">
//       <Heading as="h4">Products</Heading>
//       <div className="flex items-center space-x-2 ">
//         <EditPen
//           onClick={navigateEditProduct}
//           className={`w-4 h-4 cursor-pointer   ${css}`}
//         />

//         <div onClick={handleDeleteProduct}>
//           <div
//             className={`${isTrashDisabled ? "pointer-events-none opacity-50" : ""
//               } `}
//           >
//             <DeleteProduct>
//               <Trash className={`w-4 h-4 cursor-pointer hover:text-rose-500`} />
//             </DeleteProduct>
//           </div>
//         </div>

//         <div
//           onClick={navigateAddProducts}
//           className="hover:bg-success cursor-pointer w-32 flex items-center justify-center h-10 bg-black text-base rounded-sm text-white  "
//         >
//           + Add Products
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductsHeader;
