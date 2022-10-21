import type { ReactNode } from 'react';
import clsx from 'clsx';
import CardFrame from '@assets/icons/card-frame.svg';

interface CardProps {
  children?: ReactNode;
  className?: string;
  background?: string;
  withFrame?: boolean;
}

export default function Card({ children, className, background, withFrame = false }: CardProps) {
  return (
    <div
      className={clsx(
        className,
        "relative border border-black-400 before:absolute before:top-0 before:left-0 before:-z-[1] before:h-full before:w-full before:backdrop-blur-[1.6px] before:content-['']",
        { 'before:bg-white/5': background === undefined },
        background
      )}>
      {withFrame && <CardFrame className="absolute top-5 right-5" />}
      {children}
    </div>
  );
}
