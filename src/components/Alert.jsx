import React from 'react';

export const Alert = ({ children, variant = "default", className = "" }) => {
  const baseStyles = "p-4 rounded-lg border flex items-start gap-3";
  const variantStyles = {
    default: "bg-gray-50 border-gray-200 text-gray-800",
    destructive: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    success: "bg-green-50 border-green-200 text-green-800"
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  );
};

export const AlertTitle = ({ children, className = "" }) => (
  <h5 className={`font-medium leading-none tracking-tight ${className}`}>
    {children}
  </h5>
);

export const AlertDescription = ({ children, className = "" }) => (
  <div className={`text-sm opacity-90 ${className}`}>
    {children}
  </div>
);