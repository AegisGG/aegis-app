import type { ReactNode } from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  children: ReactNode;
  className?: string;
  component?: React.ElementType;
  type?: 'submit' | 'button' | 'reset';
  direction?: 'left' | 'right';
  href?: string;
  target?: string;
  rel?: string;
  disabled?: boolean;
}

export default function Button(props: ButtonProps) {
  const { children, className, component: Component = 'button', direction = 'left', ...others } = props;

  const defaultStyling =
    "relative after:ease-[cubic-bezier(0.4, 0, 0.2, 1)] border-primary-800 after:absolute after:top-0 after:left-0 after:h-full after:w-0 after:bg-primary-800 after:transition-all after:duration-400 after:content-[''] hover:after:w-full overflow-hidden border py-2 px-10";

  if (direction === 'right') {
    return (
      <Component className={clsx(defaultStyling, '-skew-x-45 ', className)} {...others}>
        <span className="relative z-10 block skew-x-45">{children}</span>
      </Component>
    );
  }

  return (
    <Component className={clsx(defaultStyling, 'skew-x-45', className)} {...others}>
      <span className="relative z-10 block -skew-x-45">{children}</span>
    </Component>
  );
}
