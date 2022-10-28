import { useEffect } from 'react';
import { Dialog } from '@headlessui/react';

interface ModalProps {
  open: boolean;
  title?: string | undefined;
  message?: string | undefined;
  onClose: () => void;
}

export default function Modal({ open, title, message, onClose }: ModalProps) {
  return (
    <Dialog className="relative z-50" open={open} onClose={onClose}>
      <div className="fixed inset-0 bg-black-900/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-4 text-black-900">
          <Dialog.Title className="text-2xl text-primary-900">{title}</Dialog.Title>
          {message && <p>{message}</p>}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
