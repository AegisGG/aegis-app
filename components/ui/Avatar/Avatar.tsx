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
    return <div className={clsx('block h-12 w-12 rounded-full bg-white')}></div>;
  }

  return (
    <div className="h-12 w-12 rounded-full bg-cover bg-top bg-no-repeat" style={{ backgroundImage: `url(${src})` }} />
  );
}
