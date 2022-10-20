import clsx from 'clsx';

interface AvatarProps {
  src?: string;
  type?: string;
  alt?: string;
  width?: number;
  height?: number;
}

export default function Avatar({ src, type, alt, width = 40, height = 40 }: AvatarProps) {
  if (!src) {
    return <div className={clsx('block h-10 w-10 rounded-full bg-white', `h-[${height}px]`, `w-[${width}px]`)}></div>;
  }

  return (
    <picture>
      <source srcSet={src} type={type} />
      <img className="rounded-full" alt={alt} width={width} height={height} />
    </picture>
  );
}
