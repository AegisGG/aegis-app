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
    <div className={clsx('card', { 'before:bg-white/5': background === undefined }, className, background)}>
      {withFrame && <CardFrame className="absolute top-5 right-5" />}
      {children}
    </div>
  );
}
