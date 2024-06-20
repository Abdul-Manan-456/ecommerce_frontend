'use client'
import ProductsHeader from "@/components/dashboard/products/productsHeader";
import ProductsTable from "@/components/dashboard/products/productsTable";
import { Suspense, useState } from "react";
import Loading from "./loading";

const Page = () => {

  const [selectedProductId, setSelectedProductId] = useState<string[]>([]);
  const handleProductSelection = (productId: string) => {
    if (selectedProductId.includes(productId)) {
      setSelectedProductId(selectedProductId.filter(id => id !== productId));
    } else {
      setSelectedProductId([...selectedProductId, productId]);
    }
  };



  return (
    <Suspense fallback={<Loading />}>
      <main className="px-8 py-4 container">
        <ProductsHeader selectedProductId={selectedProductId} />
        <ProductsTable handleProductSelection={handleProductSelection} />
      </main>
    </Suspense>

  );
};

export default Page;
