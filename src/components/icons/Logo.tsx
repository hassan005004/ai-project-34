import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  animated?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

const Logo = ({ className, animated = true, size = "md", ...props }: LogoProps) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const baseAnimation = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.3, ease: "easeOut" },
  };

  const svgContent = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(sizeClasses[size], "text-primary", className)}
      {...props}
    >
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );

  if (animated) {
    return (
      <motion.div {...baseAnimation}>
        {svgContent}
      </motion.div>
    );
  }

  return svgContent;
};

export default Logo;