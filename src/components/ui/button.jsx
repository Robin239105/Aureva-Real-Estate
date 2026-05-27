import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-[12px] font-medium uppercase tracking-[0.12em] transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-gold text-navy hover:bg-gold-soft hover:shadow-[0_8px_24px_rgba(201,164,92,0.35)]',
        navy: 'bg-navy text-ivory hover:bg-navy-800',
        outline: 'border border-navy text-navy hover:bg-navy hover:text-ivory',
        'outline-gold': 'border border-gold text-gold-deep hover:bg-gold hover:text-navy',
        ghost: 'text-foreground hover:bg-ivory-warm',
        destructive: 'bg-destructive text-destructive-foreground hover:opacity-90',
        link: 'text-gold-deep underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-6',
        sm: 'h-8 px-4 text-[11px]',
        lg: 'h-12 px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = 'Button';
export { Button, buttonVariants };
