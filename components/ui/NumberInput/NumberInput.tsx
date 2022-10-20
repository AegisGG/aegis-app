import type { ReactNode } from 'react';

interface NumberInputProps {
  className?: string;
  defaultValue?: number;
  onChange?: () => void;
}

export default function NumberInput({ className, ...others }: NumberInputProps) {
  return <input defaultValue="0.00" {...others} />;
}
