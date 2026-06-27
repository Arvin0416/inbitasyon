import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-rosegold-500 text-white hover:bg-rosegold-600 shadow-sm hover:shadow-md",
        secondary:
          "bg-cream-50 text-rosegold-800 border border-rosegold-200 hover:bg-cream-100 hover:border-rosegold-300",
        outline:
          "border border-sage-300 bg-white text-sage-800 hover:bg-sage-50",
        ghost:
          "text-warm-600 hover:bg-warm-100 hover:text-warm-800",
        navy:
          "bg-navy-700 text-white hover:bg-navy-800 shadow-sm",
        gold: "bg-gold-500 text-white hover:bg-gold-600 shadow-sm",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 rounded-full px-4 text-xs",
        lg: "h-12 rounded-full px-8 text-base",
        xl: "h-14 rounded-full px-10 text-lg",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
