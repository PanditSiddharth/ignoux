"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Mail} from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";

const Auth = () => {
    return (
      <div className="w-full flex flex-1 items-center justify-center ">
        <Card className="max-w-md">
            <CardHeader className="" >
                <CardTitle className="">
                    Welcome Again...
                </CardTitle>
                <CardDescription>
                    Login Or Register With Your Account
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col w-80 gap-2">
                <Button onClick={() => signIn('google')} className='w-full'><Mail className="h-4 w-4 mr-2" /> Login With Google</Button>
                <Button onClick={() => signIn('github')} className='w-full'><Github className="h-4 w-4 mr-2" />Login With Github</Button>
            <p className="text-sm justify-self-auto">Agree with our <Link href={"/terms"} className="text-sky-600 hover:text-sky-700"> Terms and Conditions</Link></p>
            </CardContent>
        </Card>
        </div>);
}

export default Auth;