import * as React from 'react';

import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
}

const buttonStyles = {
  base: 'inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20 disabled:cursor-not-allowed disabled:opacity-50',
  variants: {
    primary: 'bg-ink text-white hover:bg-ink/90',
    secondary: 'border border-line-strong bg-surface text-ink hover:bg-surface-raised',
    ghost: 'text-ink-muted hover:text-ink',
  },
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonStyles.base, buttonStyles.variants[variant], className)}
      {...props}
    />
  ),
);

Button.displayName = 'Button';
