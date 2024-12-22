import { HTMLAttributes, ButtonHTMLAttributes } from "react"

export type BaseProps = HTMLAttributes<HTMLElement>

export type WithChildren<T = {}> = T & {
  children?: React.ReactNode
}

export type WithClassName<T = {}> = T & {
  className?: string
}

export type ButtonBaseProps = ButtonHTMLAttributes<HTMLButtonElement>

export type Size = "sm" | "md" | "lg"
export type Variant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"

export type DialogTriggerProps = {
  trigger: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export type LoadingProps = {
  isLoading?: boolean
  loadingText?: string
}