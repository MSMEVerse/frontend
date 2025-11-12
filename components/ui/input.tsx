import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-[#2F3136] selection:text-[#FFFFFF] dark:bg-[#202225] dark:text-[#FFFFFF] dark:border-[rgba(255,255,255,0.06)] dark:placeholder:text-[#B9BBBE] dark:selection:bg-[#2F3136] dark:selection:text-[#FFFFFF] border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-[rgba(255,255,255,0.2)] focus-visible:ring-[rgba(255,255,255,0.1)] focus-visible:ring-[3px] dark:focus-visible:border-[rgba(255,255,255,0.2)] dark:focus-visible:ring-[rgba(255,255,255,0.1)]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
