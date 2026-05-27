import * as React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef(({ className, type = 'text', ...props }, ref) => (
  <input
    type={type}
    ref={ref}
    className={cn(
      'flex h-10 w-full rounded-sm border border-input bg-white px-3 py-2 text-sm transition-colors',
      'placeholder:text-slate file:border-0 file:bg-transparent file:text-sm file:font-medium',
      'focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold',
      'disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    {...props}
  />
));
Input.displayName = 'Input';
export { Input };
