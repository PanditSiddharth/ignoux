"use client"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardCheck, } from "lucide-react";
import { SiMinutemailer } from "react-icons/si";
import { TbCurrencyRupee } from "react-icons/tb";
import { AiOutlineProduct } from "react-icons/ai";
import { ReactNode } from "react";


const AdminTabs: React.FC<{children: ReactNode}> = ({ children }) => {
  return (
    <Tabs className="mb-6 w-full " defaultValue="ReviewReport" orientation="horizontal">
      <TabsList className=" sm:gap-3 mx-2 mt-1 md:mt-0">
        <TabsTrigger value="UserManagement" className="flex items-center text-xs sm:text-base">
          <AiOutlineProduct className="w-5 h-5 mr-2" /> <span className="hidden sm:flex">
          User & Product
            </span>
        </TabsTrigger>
        <TabsTrigger value="Queries" className="flex items-center text-xs sm:text-base">
          <ClipboardCheck className="w-5 h-5 mr-2" /> <span className="hidden sm:flex">
          Messages
            </span>
        </TabsTrigger>
        <TabsTrigger value="PaymentPayout" className="flex items-center text-xs sm:text-base">
          <TbCurrencyRupee className="w-5 h-5 mr-2 " /> <span className="hidden sm:flex">
          Payout
            </span>
        </TabsTrigger>
        <TabsTrigger value="Email" className="flex items-center text-xs sm:text-base">
          <SiMinutemailer className="w-5 h-5 mr-2" /> <span className="hidden sm:flex">
          Email
            </span>
        </TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
};

export default AdminTabs;
