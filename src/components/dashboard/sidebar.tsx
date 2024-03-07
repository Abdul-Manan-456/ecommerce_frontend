"use client";

import { Category, Element3, ShoppingCart } from "iconsax-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import OrderIcon from "../../../public/icons/OrderIcon";

function Sidebar() {
  const pathname = usePathname();
  const sidebarItems = [
    {
      path: "/",
      text: "Dashboard",
      icon: <Element3 variant="Outline" size={16} />,
    },
    {
      path: "/dashboard/admin/categories",
      text: "Categories",
      icon: <Category size={16} />,
    },
    {
      path: "/dashboard/admin/products",
      text: "Products",
      icon: <ShoppingCart size={16} />,
    },
    // {
    //   path: "/app/documents",
    //   text: "Orders",
    //   icon: <OrderIcon className="text-lg" />,
    // },
  ];
  return (
    <div className="w-60 shrink-0 md:block h-screen fixed top-0 overflow-hidden">
      <div className="w-full h-full bg-white border-r">
        <div className="flex flex-col h-full justify-between">
          <div className="pt-6 text-gray-500 font-medium space-y-2 md:px-2 text-xs">
            {sidebarItems.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className={`flex ${pathname === item.path ? "text-primary" : ""
                  } hover:px-8 duration-200 rounded-md w-full py-2 px-6 items-center gap-2`}
              >
                {item.icon}
                {item.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
