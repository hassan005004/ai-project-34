import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  fullWidth?: boolean
  animation?: "pulse" | "bounce" | "none"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, fullWidth = false, animation = "none", children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    const animationProps = React.useMemo(() => {
      switch (animation) {
        case "pulse":
          return {
            animate: { scale: [1, 1.02, 1] },
            transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }
        case "bounce":
          return {
            animate: { y: [0, -2, 0] },
            transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
          }
        default:
          return {}
      }
    }, [animation])

    return (
      <motion.div
        className={cn(fullWidth && "w-full")}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        {...animationProps}
      >
        <Comp
          className={cn(
            buttonVariants({ variant, size, className }),
            fullWidth && "w-full",
            loading && "relative text-transparent hover:text-transparent"
          )}
          ref={ref}
          disabled={disabled || loading}
          {...props}
        >
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          )}
          {children}
        </Comp>
      </motion.div>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
export default Button