import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary-100 text-primary-700",
        secondary: "bg-gov-100 text-gov-700",
        accent: "bg-accent-100 text-accent-700",
        success: "bg-green-100 text-green-700",
        warning: "bg-amber-100 text-amber-700",
        error: "bg-red-100 text-red-700",
        outline: "border border-neutral-300 text-neutral-600",
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
