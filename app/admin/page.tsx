"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Package, User, TrendingUp, Plus, Settings } from "lucide-react";
import { SiThreedotjs } from "react-icons/si";

export default function AdminHomePage() {
  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      icon: User,
    },
    {
      title: "Total Products",
      value: "567",
      icon: Package,
    },
    {
      title: "Total Blogs",
      value: "34",
      icon: Package,
    },
    {
      title: "Total Courses",
      value: "10",
      icon: Package,
    },
    {
      title: "Monthly Revenue",
      value: "₹12,345",
      icon: TrendingUp,
    },
    {
      title: "More Analytics",
      value: "....",
      icon: SiThreedotjs,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Heading */}
      <h1 className="text-2xl font-bold text-sky-700">Welcome to Admin Panel</h1>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Card key={idx} className="shadow-sm border">
            <CardHeader className="flex items-center gap-4">
              <stat.icon className="w-8 h-8 text-sky-700" />
              <CardTitle className="">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-sky-700">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Content */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-4 bg-sky-100 hover:bg-sky-200 rounded-md shadow-sm">
            <Plus className="w-5 h-5 mr-2 text-sky-700" />
            Add New
          </button>
          <button className="flex items-center justify-center p-4 bg-sky-100 hover:bg-sky-200 rounded-md shadow-sm">
            <LineChart className="w-5 h-5 mr-2 text-sky-700" />
            View Analytics
          </button>
          <button className="flex items-center justify-center p-4 bg-sky-100 hover:bg-sky-200 rounded-md shadow-sm">
            <Settings className="w-5 h-5 mr-2 text-sky-700" />
            Tools/Settings
          </button>
        </div>
      </div>
    </div>
  );
}

