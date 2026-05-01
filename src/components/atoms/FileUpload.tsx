import React, { useRef } from 'react';

interface FileUploadProps {
  onChange: (files: File[]) => void;
  error?: string;
  multiple?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onChange, error, multiple = true }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onChange(Array.from(e.target.files));
    }
  };

  return (
    <div className="w-full">
      <div
        onClick={() => inputRef.current?.click()}
        className={`w-full border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-gray-50 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      >
        <svg
          className="w-12 h-12 text-gray-400 mb-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          ></path>
        </svg>
        <p className="text-gray-600">Klik untuk upload foto</p>
        <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
      </div>
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
        multiple={multiple}
      />
    </div>
  );
};

export default FileUpload;
