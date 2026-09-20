import React from "react"
import { MessageCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WhatsAppButtonProps {
  onClick?: () => void
  href?: string
  loading?: boolean
  disabled?: boolean
  variant?: "primary" | "outline" | "secondary" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  children?: React.ReactNode
  className?: string
  targetBlank?: boolean
}

export function WhatsAppButton({
  onClick,
  href,
  loading = false,
  disabled = false,
  variant = "primary",
  size = "default",
  children,
  className = "",
  targetBlank = true,
}: WhatsAppButtonProps) {
  const isCustomPrimary = variant === "primary"

  const customClasses = isCustomPrimary
    ? "bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm dark:bg-emerald-600 dark:hover:bg-emerald-700"
    : ""

  const content = (
    <>
      {loading ? (
        <Loader2 className="size-4 animate-spin shrink-0" />
      ) : (
        <MessageCircle className="size-4 shrink-0 fill-current" />
      )}
      {children || <span>Order via WhatsApp</span>}
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        target={targetBlank ? "_blank" : undefined}
        rel={targetBlank ? "noopener noreferrer" : undefined}
        className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors ${
          size === "sm"
            ? "h-8 px-3 text-xs"
            : size === "lg"
            ? "h-11 px-5 text-base"
            : "h-9 px-4 text-sm"
        } ${customClasses} ${className}`}
      >
        {content}
      </a>
    )
  }

  return (
    <Button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      size={size}
      variant={isCustomPrimary ? "default" : variant}
      className={`gap-2 font-medium ${customClasses} ${className}`}
    >
      {content}
    </Button>
  )
}
