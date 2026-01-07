import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 active:scale-[0.97]',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        gradient:
          'rounded-xl border border-white/20 text-white backdrop-blur-md \
          bg-[length:200%_200%] bg-gradient-to-r from-blue-500/20 via-purple-500/30 to-indigo-500/20 \
          transition-[background-position,box-shadow] duration-700 \
          hover:bg-[position:100%_0] hover:shadow-lg',
        outline:
          'rounded-xl bg-white/30 dark:bg-slate-800/30 backdrop-blur-md border border-white/20 dark:border-slate-700/50 text-gray-800 dark:text-gray-200 shadow-sm hover:bg-white/40 dark:hover:bg-slate-700/40 hover:shadow-md',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent/50 hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },

      size: {
        default: 'h-10 px-4 py-2 rounded-lg',
        sm: 'h-9 px-3 rounded-lg',
        lg: 'h-12  px-8 rounded-xl',
        icon: 'h-10 w-10 rounded-xl',
      },
    },

    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';

  return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
});

Button.displayName = 'Button';

export { Button, buttonVariants };
