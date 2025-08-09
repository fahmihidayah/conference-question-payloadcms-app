'use client';

import { cn } from '@/utilities/ui'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 touch-manipulation select-none',
  {
    defaultVariants: {
      size: 'default',
      variant: 'primary',
    },
    variants: {
      size: {
        sm: 'h-9 px-3 text-sm min-h-[36px]',
        default: 'h-12 px-6 text-base min-h-[48px]',
        lg: 'h-14 px-8 text-lg min-h-[56px]',
        icon: 'h-12 w-12 min-h-[48px] min-w-[48px]',
        clear: 'p-0 h-auto w-auto min-h-0 min-w-0',
      },
      variant: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-400',
        success: 'bg-green-600 text-white hover:bg-green-700 active:bg-green-800',
        danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
        warning: 'bg-yellow-500 text-white hover:bg-yellow-600 active:bg-yellow-700',
        outline: 'border-2 border-blue-600 text-blue-600 bg-transparent hover:bg-blue-50 active:bg-blue-100',
        ghost: 'text-gray-700 bg-transparent hover:bg-gray-100 active:bg-gray-200',
        link: 'text-blue-600 bg-transparent hover:underline p-0 h-auto font-normal',
      },
    },
  },
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  loadingText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  asChild = false,
  className,
  size,
  variant,
  loading = false,
  loadingText,
  leftIcon,
  rightIcon,
  children,
  disabled,
  ...props
}, ref) => {
  const Comp = asChild ? Slot : 'button'
  
  const isDisabled = disabled || loading;
  
  return (
    <Comp 
      className={cn(buttonVariants({ className, size, variant }))} 
      ref={ref} 
      disabled={isDisabled}
      style={{
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation'
      }}
      onTouchStart={() => {}}
      {...props}
    >
      {loading && (
        <div className="w-4 h-4 mr-2 animate-spin border-2 border-current border-t-transparent rounded-full flex-shrink-0" />
      )}
      
      {!loading && leftIcon && (
        <span className="mr-2 flex-shrink-0 pointer-events-none">
          {leftIcon}
        </span>
      )}
      
      <span className="pointer-events-none">
        {loading && loadingText ? loadingText : children}
      </span>
      
      {!loading && rightIcon && (
        <span className="ml-2 flex-shrink-0 pointer-events-none">
          {rightIcon}
        </span>
      )}
    </Comp>
  )
});

Button.displayName = 'Button';

export { Button, buttonVariants }
