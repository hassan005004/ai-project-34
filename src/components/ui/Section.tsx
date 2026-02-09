import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { forwardRef, ReactNode } from "react";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: "section" | "div" | "article" | "aside";
  variant?: "default" | "primary" | "secondary" | "muted";
  size?: "sm" | "md" | "lg" | "xl" | "full";
  container?: boolean;
  animate?: boolean;
  delay?: number;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      children,
      className,
      as: Component = "section",
      variant = "default",
      size = "md",
      container = true,
      animate = true,
      delay = 0,
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      default: "bg-background",
      primary: "bg-primary/5",
      secondary: "bg-secondary/5",
      muted: "bg-muted/50",
    };

    const sizeClasses = {
      sm: "py-8 md:py-12",
      md: "py-12 md:py-16",
      lg: "py-16 md:py-24",
      xl: "py-20 md:py-32",
      full: "py-24 md:py-40",
    };

    const containerClasses = container
      ? "container mx-auto px-4 sm:px-6 lg:px-8"
      : "";

    const animationVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          delay: delay * 0.1,
          ease: "easeOut",
        },
      },
    };

    return (
      <Component
        ref={ref}
        className={cn(
          "w-full",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {animate ? (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={animationVariants}
            className={containerClasses}
          >
            {children}
          </motion.div>
        ) : (
          <div className={containerClasses}>{children}</div>
        )}
      </Component>
    );
  }
);

Section.displayName = "Section";

export default Section;