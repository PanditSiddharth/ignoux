"use client"
// app/admin/components/Queries.tsx
import { Card, CardContent } from "@/components/ui/card";
import { IQuery } from "@/modals/query.model";
import { deleteQuery, getQueries } from "@/server-functions/query";
import { MessageCircleMore, Trash2 } from "lucide-react";
import React, { useEffect, useState, useTransition } from "react";
import { BarLoader } from "react-spinners";
import { FaReply } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Queries = () => {
  const [queries, setQueries] = useState<IQuery[]>([]);
  const [loading, setTransition] = useTransition()
  const router = useRouter()
  const pathname = usePathname()
  useEffect(() => {
 
    setTransition(async () => {
      const querie = await getQueries()
      if (Array.isArray(querie)) {
        setQueries(querie)
      } else {
        setQueries([])
      }
    })
    // eslint-disable-next-line
  }, [])

  if (loading) {
    return <div className="flex flex-1  justify-center items-center h-64">
      <BarLoader color="#36d7b7" />
    </div>
  }

  return (
    <div className="md:mx-2">
      <h2 className="text-2xl font-semibold my-4 ">Users Messages</h2>
      {queries && queries.map((query, index) => (
        <Card className="rounded-none p-0 m-0 flex gap-0" key={index}>
          <MessageCircleMore className="mt-2 ml-4" />
          <CardContent className="py-1 pl-2">
            <div className="font-bold">{query.name}</div>
            <div className="text-gray-500 text-sm">{query.email}</div>
            <div>{query.description}</div>
            <div className="flex gap-4 mt-3 ">
              <FaReply className="cursor-pointer text-sm" onClick={() => {
              const path = pathname.split("?")[0]
              router.push(path + "?first=Email&email=" + query.email + "&name=" + query.name
              )
              window.location.href = path + "?first=Email&email=" + query.email + "&name=" + query.name
              
            }}/>
            <Trash2 className="text-sm h-4 cursor-pointer" onClick={async () => {
            const delResponse = await deleteQuery(query._id + "")
            if(delResponse?.success)
            {
              window.location.reload()
              return toast.success("Successfully deleted")
            } else toast.error("Failed to delete")
            }}/>
            </div>
          </CardContent>
        </Card>
      ))
      }
    </div>
  );
}

export default Queries;