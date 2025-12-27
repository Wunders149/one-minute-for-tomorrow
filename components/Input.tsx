import { twMerge } from 'tailwind-merge';
import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    const baseClasses = `
      w-full px-4 py-3 bg-transparent border rounded-xl
      text-white placeholder-white/40
      focus:outline-none focus:ring-2 focus:ring-gold-400/30 focus:border-gold-400/50
      border-white/20
      ${error ? 'border-red-500 focus:ring-red-500/30 focus:border-red-500' : ''}
      transition-colors duration-300
    `;
    
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-white/80 mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={twMerge(baseClasses, className)}
          {...props}
        />
        {helperText && !error && (
          <p className="mt-1 text-xs text-white/50">{helperText}</p>
        )}
        {error && <p className="mt-1 text-xs text-red-400">{error}</p>
        }
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;