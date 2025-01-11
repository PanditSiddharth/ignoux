"use client"

import * as React from "react"
import { Moon, MoonIcon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "./ui/switch"
import { Label } from "./ui/label"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("blue")}>
          Blue
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("purple")}>
          Purple
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


export function ModeToggleMobile() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
      setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
      <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start"
          onClick={toggleTheme}
      >
          <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-2">
                  <MoonIcon className="h-4 w-4" />
                  <Label htmlFor="dark-mode" className="text-sm font-medium">
                      Dark Mode
                  </Label>
              </div>
              <Switch
                  id="dark-mode"
                  checked={theme === "dark"}
                  onCheckedChange={toggleTheme}
              />
          </div>
      </Button>
  )
}