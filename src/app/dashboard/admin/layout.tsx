import Sidebar from "@/components/dashboard/sidebar";
import { Suspense } from "react";
import Loading from "./loading";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-row">
        <Sidebar />
        <div className="ml-60 w-full"> {children}</div>
      </div>
    </Suspense>

  );
};

export default layout;
