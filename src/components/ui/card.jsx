import * as React from 'react';
import { cn } from '@/lib/utils';

const Card = React.forwardRef(({ className, ...p }, ref) => (
  <div ref={ref} className={cn('rounded-sm border border-border bg-card text-card-foreground shadow-sm', className)} {...p} />
));
Card.displayName = 'Card';
const CardHeader = React.forwardRef(({ className, ...p }, ref) => (
  <div ref={ref} className={cn('flex flex-col gap-1.5 p-6', className)} {...p} />
));
CardHeader.displayName = 'CardHeader';
const CardTitle = React.forwardRef(({ className, ...p }, ref) => (
  <h3 ref={ref} className={cn('font-serif text-xl font-medium leading-none tracking-tight text-navy', className)} {...p} />
));
CardTitle.displayName = 'CardTitle';
const CardDescription = React.forwardRef(({ className, ...p }, ref) => (
  <p ref={ref} className={cn('text-sm text-slate', className)} {...p} />
));
CardDescription.displayName = 'CardDescription';
const CardContent = React.forwardRef(({ className, ...p }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...p} />
));
CardContent.displayName = 'CardContent';
const CardFooter = React.forwardRef(({ className, ...p }, ref) => (
  <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...p} />
));
CardFooter.displayName = 'CardFooter';
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
