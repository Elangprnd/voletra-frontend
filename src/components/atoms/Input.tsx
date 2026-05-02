import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input: React.FC<InputProps> = ({ error, className = '', ...props }) => {
  return (
    <input
      className={`w-full px-4 py-2 bg-white border border-gray-300 rounded-[10px] focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all ${
        error ? 'border-red-500' : 'border-[rgba(0,0,0,0.34)]'
      } ${className}`}
      {...props}
    />
  );
};

export default Input;
