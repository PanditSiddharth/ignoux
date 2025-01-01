"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { useSession } from "next-auth/react";
// eslint-disable-next-line
const AdminPanelPage = () => {
const { data: session } = useSession()

  return (
    <Card className="rounded-lg shadow-lg md:p-6 max-w-7xl min-w-32 w-full mx-auto">
    {JSON.stringify(session?.user || {})}
    </Card>
  );
};

export default AdminPanelPage;
