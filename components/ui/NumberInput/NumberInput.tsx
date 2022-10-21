import type { ChangeEvent } from 'react';

interface NumberInputProps {
  className?: string;
  defaultValue?: number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function NumberInput({ className, ...others }: NumberInputProps) {
  return <input type="number" step="any" defaultValue="0.00" {...others} />;
}
