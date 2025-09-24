import React, { ButtonHTMLAttributes } from 'react'
import { motion } from 'framer-motion'
import { useDrag } from '@use-gesture/react';
import { XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '../ui/button';

interface XButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const XButton: React.FC<XButtonProps> = (props) => {
  return (
    <button {...props} className={`p-2 text-black border-neutral-300 flex items-center justify-center rounded-full ${props.className}`}>
      <XIcon/>
    </button>
  );
};

export default function CTAToast({
  show,
  onClose,
  onClickAction,
}: {
  show: boolean
  onClose: () => void
  onClickAction: () => void
}) {
  const t = useTranslations('ctaToast');
  const bind = useDrag(
    ({ last, movement: [, my], cancel }) => {
      if (my > 100 && last) {
        onClose();
      } else if (my < 0 && last) {
        cancel?.();
      }
    },
    { filterTaps: true }
  );

  return (
    <motion.div
    initial={{ y: "100%", opacity: 0 }}
    animate={show ? { y: -20, opacity: 1 } : { y: "100%", opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="fixed flex items-center justify-center bottom-0 w-full z-50"
    {...bind() as any}
  >
    <div className="bg-white p-4 flex flex-col md:flex-row items-center gap-3 text-neutral-800 shadow-lg rounded-xl">
      <div className="flex items-center md:flex-row-reverse">
      <p className="ml-3 md:ml-0 font-bold">{t('title')}</p>
      {/* <XButton onClick={onClose}/> */}
      </div>
      <Button className="w-full md:w-fit" onClick={onClickAction}>{t('action')}</Button>
    </div>
  </motion.div>
  )
}
