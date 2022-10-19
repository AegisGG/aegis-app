import type { ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={clsx(
        "relative border border-black-400 before:absolute before:top-0 before:left-0 before:-z-[1] before:h-full before:w-full before:bg-white/5 before:backdrop-blur-[1.6px] before:content-['']",
        className
      )}>
      {children}
    </div>
  );
}
