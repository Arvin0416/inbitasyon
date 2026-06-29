import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-olive-600 text-white hover:bg-olive-700 shadow-sm hover:shadow-md",
        secondary:
          "bg-cream-100 text-olive-800 border border-olive-300 hover:bg-cream-200 hover:border-olive-400",
        outline:
          "border border-olive-300 bg-white text-olive-800 hover:bg-olive-50",
        ghost:
          "text-charcoal-500 hover:bg-olive-50 hover:text-olive-800",
        olive:
          "bg-olive-800 text-white hover:bg-olive-900 shadow-sm",
        gold: "bg-gold-400 text-white hover:bg-gold-500 shadow-sm",
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
