"use client";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { MdSelectAll } from "react-icons/md";
import { EyeIcon } from "lucide-react";
import { IUser } from "@/modals/user.model";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { UserOptions } from "@/types";
import clsx from "clsx";
import { IAnalytics } from "@/modals/analytics.model";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";
import { sendMail } from "@/server-functions/mailer";
import { paidRevenueEmail } from "@/modals/data";
import { updateUserAnalytics } from "@/server-functions/user";
import Loader from "../others/loader";

const UserCard = ({
    user,
    username,
    options,
    setUser
}: {
    user: IUser; // Extend IUser with revenue-related fields
    username?: string;
    options: UserOptions;
    setUser: (user: IUser) => void;
}) => {
    const [isOwner, setIsOwner] = useState(false);
    const [amount, setAmount] = useState<string | number | undefined>();
    const { data: session, status } = useSession();

    const showToast = (description: string, variant: "destructive" = "destructive") => {
        toast({
            title: "Error!",
            description,
            variant,
            duration: 1000
        })
    }

    const handleAnalyticsUpdate = async (data: Partial<IAnalytics>) => {
        try {
        const resAnalytics = await updateUserAnalytics(user.userId, data)
            if(resAnalytics.error)
                return showToast(resAnalytics?.error)

            const htmlEmail = paidRevenueEmail(amount + "", user.name)
           
            const mail = await sendMail({
                email: user?.email,
                subject: "Congratulations! on your site payout",
                message: htmlEmail
            })
        
            if(mail.message){
                return showToast(mail.message)
            }

            if(user && user.analytics && typeof user.analytics !== "string"){
                setUser({...user, analytics: {
                    ...user.analytics, 
                    totalPaidAmount: user.analytics.totalPaidAmount + Number(amount)
                } } as IUser)
            }

            toast({
                title: "Payment success!",
                description: "Successfully paid amount",
                duration: 1000
            })
        
        } catch (error) {
            showToast('An error occurred' + (error as {message: string}).message);
        } 
    };


    useEffect(() => {
        if (
            username?.split("@")[1] === session?.user.username ||
            session?.user.role == "admin"
        )
            setIsOwner(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);

    if (!user) {
        return <div>Faltu ka call kiu kar raha</div>;
    }

    if (!user.analytics || typeof user.analytics == "string") {
        return <div><Loader /> </div>;
    }

    options.hz = options.hz || false;
    const pendingPayout = user?.analytics?.totalRevenue  - user.analytics.totalPaidAmount 
    return (
        <Card className="flex flex-col overflow-hidden rounded-md shadow-lg ">
            {/* Profile Section */}
            <Card className={
                clsx("flex", "overflow-hidden relative rounded-none  ", !options.hz && "md:flex-col")
            }>
                <CardHeader className="px-2 py-0">
                    <Link href={`/@${user.username}`}
                        className={clsx("relative", "aspect-square", "md:aspect-square", "blur-animation h-full rounded-full",
                            !options.hz ? "md:w-full" : "md:h-full",
                            !options.hz ? "md:h-auto" : "md:w-auto"
                        )}
                    >
                        <Image
                            src={user?.image + ""}
                            alt={user.name}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-full p-1"
                        />
                        {isOwner &&
                            <div className="relative">
                                <EyeIcon className="absolute bottom-0 right-0 text-gray-500" size={24} />
                            </div>
                        }
                    </Link>
                </CardHeader>

                <div className="pl-4 flex flex-col justify-center h-full min-h-28">
                    <CardTitle className="min-h-5 line-clamp-2">{user.name}</CardTitle>
                    <CardDescription className="text-xs min-h-5 line-clamp-2">
                        @ {user.username}
                    </CardDescription>
                    <Link href={`/@${user.username}/products`} className=" text-blue-600">
                        View Profile
                    </Link>
                </div>
            </Card>

            {/* Revenue and Payout Section */}
            <Card className="p-4 space-y-2 rounded-none">
                <div className="grid grid-cols-2 justify-between items-center gap-3">
                    {[
                        { label: "Revenue", value: `₹${user?.analytics?.totalRevenue.toLocaleString()}`, color: "text-red-600" },
                        { label: "Pending", value: `₹${pendingPayout.toLocaleString()}`, color: "text-red-600" },
                        { label: "Orders", value: user?.analytics?.productsSold.toLocaleString(), color: "text-red-600" },
                        { label: "Products", value: (user as { products: number } & IUser)?.products?.toString(), color: "text-red-600" },
                    ].map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-600">{item.label}:</span>
                            <span className={`text-lg font-semibold ${item.color}`}>{item.value}</span>
                        </div>
                    ))}
                </div>
            </Card>


            {/* Action Section */}
            <Card className="p-4 border-t flex rounded-none">
                {status ==  "authenticated" ? <div className="flex w-full">
                    <div className="relative">
                        <MdSelectAll className="absolute h-4 left-2 top-2.5 cursor-pointer" onClick={() => { setAmount(pendingPayout) }} />
                    </div>
                    <Input placeholder="Pay Revenue " className="pl-8 rounded-lg"
                        value={amount} onChange={e => {
                            if (!isNaN(+e.target.value))
                                setAmount(e.target.value.replace(" ", ""))
                        }} />
                    <div className="relative">
                        <Button className="absolute right-0 bg-slate-400 rounded-l-none dark:text-gray-100 dark:bg-gray-800"
                            onClick={async () => {
                                let description: string = ""
                                if (amount == "0")
                                    description = "Amount must be greater than 0"
                                else if (!amount)
                                    description = "Please enter amount "
                                else if (pendingPayout < +amount)
                                    description = "Amount is greater than pending payout"
                                else {
                                    if(user && user.analytics && typeof user.analytics != "string")
                                    return await handleAnalyticsUpdate({totalPaidAmount: user?.analytics?.totalPaidAmount + Number(amount)})
                                }

                                toast({
                                    title: "Error!",
                                    description,
                                    variant: "destructive",
                                    duration: 1000
                                })

                            }}>Pay</Button>
                    </div>
                </div> : <div><Loader /></div>}
            </Card>
        </Card>
    );
};

export default UserCard;
