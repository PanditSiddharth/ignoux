"use client"
import { SessionProvider as SP } from "next-auth/react";
import { ReactNode } from "react";

const SessionProvider = ({ children }: { children: ReactNode}) => {
  return (
    <SP>{children}</SP>
  )
}

export default SessionProvider