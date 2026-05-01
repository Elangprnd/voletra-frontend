import React from 'react';

interface FormFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
  required?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({ label, error, children, required }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-start gap-4 mb-4">
      <label className="md:w-1/4 pt-2 text-gray-700 font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex-1">
        {children}
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    </div>
  );
};

export default FormField;
