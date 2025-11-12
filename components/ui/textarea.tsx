import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-[#202225] dark:text-[#FFFFFF] dark:border-[rgba(255,255,255,0.06)] dark:placeholder:text-[#B9BBBE] dark:focus-visible:border-[rgba(255,255,255,0.2)] dark:focus-visible:ring-[rgba(255,255,255,0.1)] dark:selection:bg-[#2F3136] dark:selection:text-[#FFFFFF] flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
