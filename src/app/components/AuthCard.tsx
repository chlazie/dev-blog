// src/components/AuthCard.tsx
import React from "react";

interface AuthCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const AuthCard = ({ title, subtitle, children }: AuthCardProps) => {
  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white dark:bg-gray-900 shadow-lg rounded-2xl border border-gray-200 dark:border-gray-800">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-1">
          {subtitle}
        </p>
      )}
      <div className="mt-6">{children}</div>
    </div>
  );
};

export default AuthCard;
