import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-rosegold-100 text-rosegold-700",
        sage: "bg-sage-100 text-sage-700",
        navy: "bg-navy-100 text-navy-700",
        gold: "bg-gold-100 text-gold-800",
        warm: "bg-warm-100 text-warm-700",
        mauve: "bg-mauve-100 text-mauve-700",
        green: "bg-green-100 text-green-700",
        outline: "border border-warm-200 text-warm-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
