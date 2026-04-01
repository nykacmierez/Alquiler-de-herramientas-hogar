import React from 'react';
import { cn } from '../../utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all',
        onClick && 'cursor-pointer active:scale-[0.98] hover:shadow-md',
        className
      )}
    >
      {children}
    </div>
  );
};
