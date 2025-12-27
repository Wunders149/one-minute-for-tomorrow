import { forwardRef, TextareaHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  characterCount?: number;
  maxCharacters?: number;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, helperText, characterCount, maxCharacters, className, ...props }, ref) => {
    const baseClasses = `
      w-full px-4 py-3 bg-transparent border rounded-xl
      text-white placeholder-white/40
      focus:outline-none focus:ring-2 focus:ring-gold-400/30 focus:border-gold-400/50
      border-white/20
      ${error ? 'border-red-500 focus:ring-red-500/30 focus:border-red-500' : ''}
      transition-colors duration-300 resize-none
    `;
    
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-white/80 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          <textarea
            ref={ref}
            className={twMerge(baseClasses, className)}
            {...props}
          />
          {maxCharacters !== undefined && characterCount !== undefined && (
            <div className="absolute bottom-2 right-2 text-xs text-white/50">
              {characterCount}/{maxCharacters}
            </div>
          )}
        </div>
        {helperText && !error && (
          <p className="mt-1 text-xs text-white/50">{helperText}</p>
        )}
        {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;