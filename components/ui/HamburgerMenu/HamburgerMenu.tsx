import { motion } from 'framer-motion';
import { hamburgerMenuVariant } from '@utils/framer-variants';

interface HamburgerMenuProps {
  opened?: boolean;
  onClick: () => void;
}

export default function HamburgerMenu({ opened, ...others }: HamburgerMenuProps) {
  return (
    <motion.button className="flex w-5 flex-col gap-1" {...others}>
      <motion.span
        className="h-0.5 w-full bg-white"
        animate={opened ? 'opened' : 'closed'}
        variants={hamburgerMenuVariant.top}
      />
      <motion.span
        className="h-0.5 w-full bg-white"
        animate={opened ? 'opened' : 'closed'}
        variants={hamburgerMenuVariant.middle}
      />
      <motion.span
        className="h-0.5 w-full bg-white"
        animate={opened ? 'opened' : 'closed'}
        variants={hamburgerMenuVariant.bottom}
      />
    </motion.button>
  );
}
