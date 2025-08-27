'use client';

import useScrollTrigger, { Trigger } from "@/hooks/useScrollTrigger";
import { useState } from "react";
import CTAToast from "./CTAToast";

export default function CTAToastOnScroll({
  trigger = { percent: 55 },
  stickyOnceClosed = true,
  onClickAction = () => {},
}: {
  trigger?: Trigger;
  stickyOnceClosed?: boolean;
  onClickAction?: () => void;
}) {
  const reached = useScrollTrigger(trigger);
  const [dismissed, setDismissed] = useState(false);

  const show = reached && (!stickyOnceClosed || !dismissed);

  return (
    <CTAToast
      show={show}
      onClose={() => setDismissed(true)}
      onClickAction={onClickAction}
    />
  );
}