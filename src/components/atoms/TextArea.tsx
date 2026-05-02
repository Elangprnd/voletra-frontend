import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

const TextArea: React.FC<TextAreaProps> = ({ error, className = '', ...props }) => {
  return (
    <textarea
      className={`w-full px-4 py-2 bg-white border border-gray-300 rounded-[10px] focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all ${
        error ? 'border-red-500' : 'border-[rgba(0,0,0,0.34)]'
      } ${className}`}
      {...props}
    />
  );
};

export default TextArea;
