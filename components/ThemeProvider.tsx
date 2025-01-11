"use client"
import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider      
   value={{
    light: 'light',
    dark: 'dark',
    purple: 'purple',
    blue: 'blue',
  }}
   {...props}>{children}</NextThemesProvider>
}
