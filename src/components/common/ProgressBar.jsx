import React from 'react';

export const ProgressBar = ({
  value = 0,
  max = 100,
  showLabel = true,
  labelPosition = 'right', // 'right' | 'top' | 'none'
  size = 'md', // 'sm' | 'md' | 'lg'
  color = 'bg-indigo-600',
  trackColor = 'bg-slate-100',
  className = ''
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && labelPosition === 'top' && (
        <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1.5">
          <span>Progress</span>
          <span>{percentage}%</span>
        </div>
      )}
      
      <div className="flex items-center gap-3">
        <div className={`flex-1 ${trackColor} rounded-full overflow-hidden ${heightClasses[size]}`}>
          <div
            className={`${color} ${heightClasses[size]} rounded-full transition-all duration-500 ease-out`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        {showLabel && labelPosition === 'right' && (
          <span className="text-xs font-bold text-slate-700 min-w-[2.5rem] text-right">
            {percentage}%
          </span>
        )}
      </div>
    </div>
  );
};
