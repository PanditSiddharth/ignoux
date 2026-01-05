import { cn } from '@/modals/utils';
import React from 'react';

const colors = [
  'background',
  'foreground',
  'card',
  'card-foreground',
  'popover',
  'popover-foreground',
  'primary',
  'primary-foreground',
  'secondary',
  'secondary-foreground',
  'muted',
  'muted-foreground',
  'accent',
  'accent-foreground',
  'destructive',
  'destructive-foreground',
  'border',
  'input',
  'ring',
  'chart-1',
  'chart-2',
  'chart-3',
  'chart-4',
  'chart-5',
];

const ColorsPage = () => {
  return (
    <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
      {colors.map((color) => (
        <div key={color} className={cn(`p-4 rounded-lg`, "bg-" + color, "text-" + color)} >
          <span className="text-white">{color}</span>
        </div>
      ))}
    </div>
  );
};

export default ColorsPage;