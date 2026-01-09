import React from 'react';

export const FormInput = ({ label, error, className, ...props }) => {
  const baseStyles = "w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all hover:border-gray-400 bg-white";
  const readOnlyStyles = "bg-gray-100 text-gray-500 cursor-not-allowed hover:border-gray-300";

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        className={`${baseStyles} ${props.readOnly ? readOnlyStyles : ''}`}
        {...props} 
      />
      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  );
};