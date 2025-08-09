'use client';

import { cn } from '@/utilities/ui'
import { Eye, EyeOff } from 'lucide-react';
import { forwardRef, useState, InputHTMLAttributes } from 'react';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  type?: 'text' | 'number' | 'email' | 'password';
  label?: string;
  error?: string;
  helperText?: string;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', label, error, helperText, className = '', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [currentType, setCurrentType] = useState(type);

    const handlePasswordToggle = () => {
      setShowPassword(!showPassword);
      setCurrentType(showPassword ? 'password' : 'text');
    };

    const baseInputClasses = `
      text-black
      flex h-12 w-full rounded-lg border px-4 py-3 text-base transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
      disabled:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50
      placeholder:text-gray-400 touch-manipulation
    `;

    const inputClasses = error
      ? `${baseInputClasses} border-red-300 focus:ring-red-500 focus:border-red-500`
      : `${baseInputClasses} border-gray-300 hover:border-gray-400 focus:border-blue-500`;

    const finalInputClasses = cn(
      inputClasses,
      type === 'password' ? 'pr-12' : '',
      className
    );

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          <input
            ref={ref}
            type={currentType}
            className={finalInputClasses}
            style={{
              WebkitTapHighlightColor: 'transparent',
              touchAction: 'manipulation'
            }}
            {...props}
          />
          
          {type === 'password' && (
            <button
              type="button"
              onClick={handlePasswordToggle}
              onTouchStart={() => {}}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-md text-gray-400 hover:text-gray-600 transition-colors duration-200 touch-manipulation select-none min-w-[44px] min-h-[44px] flex items-center justify-center"
              style={{
                WebkitTapHighlightColor: 'transparent',
                touchAction: 'manipulation'
              }}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5 pointer-events-none" />
              ) : (
                <Eye className="w-5 h-5 pointer-events-none" />
              )}
            </button>
          )}
        </div>

        {error && (
          <p className="mt-2 text-sm text-red-600">
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p className="mt-2 text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input }
