import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gov-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-primary-500 text-white shadow-sm hover:bg-primary-600 active:bg-primary-700",
        secondary:
          "bg-gov-500 text-white shadow-sm hover:bg-gov-600 active:bg-gov-700",
        outline:
          "border-2 border-primary-500 text-primary-500 hover:bg-primary-50 active:bg-primary-100",
        outlineGov:
          "border-2 border-gov-500 text-gov-500 hover:bg-gov-50 active:bg-gov-100",
        ghost:
          "text-neutral-600 hover:bg-neutral-100 active:bg-neutral-200",
        link: "text-gov-500 underline-offset-4 hover:underline",
        accent:
          "bg-accent-500 text-white shadow-sm hover:bg-accent-600 active:bg-accent-700",
      },
      size: {
        sm: "h-9 px-3 text-xs",
        default: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-11 w-11",
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
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
