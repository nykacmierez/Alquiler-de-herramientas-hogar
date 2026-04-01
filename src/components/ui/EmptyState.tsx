import React from 'react';
import { PackageOpen } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, description, icon }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="bg-gray-50 p-6 rounded-full mb-4">
        {icon || <PackageOpen className="w-12 h-12 text-gray-400" />}
      </div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-500 max-w-xs mt-2">{description}</p>
    </div>
  );
};
