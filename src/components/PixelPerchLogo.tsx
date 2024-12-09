import React from 'react';

export function PixelPerchLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-white transform rotate-45" />
          <div className="w-4 h-4 bg-white" />
        </div>
        <span className="text-white text-xl font-bold">ixel</span>
        <span className="text-[#4477FF] text-xl font-bold">Perch</span>
      </div>
    </div>
  );
}