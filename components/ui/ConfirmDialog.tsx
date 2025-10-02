'use client'

import React, { useCallback, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type ConfirmDialogProps = {
  /** Trigger element (button, text, icon, etc.) */
  children: React.ReactNode;

  /** Title text or node */
  title?: React.ReactNode | string;

  /** Description text or node */
  description?: React.ReactNode | string;

  /** Confirm button label */
  confirmText?: string;

  /** Cancel button label */
  cancelText?: string;

  /** Called when user presses Confirm */
  onConfirm: () => void | Promise<void>;

  /** Optional callback when user cancels */
  onCancel?: () => void;

  /** Disable the confirm button */
  disabled?: boolean;

  /** Style confirm button as destructive */
  destructive?: boolean;

  /** Controlled open state */
  open?: boolean;

  /** Controlled open state updater */
  onOpenChange?: (open: boolean) => void;

  /** Auto-close after successful confirm (default: true) */
  closeOnConfirmSuccess?: boolean;
};

export default function ConfirmDialog({
  children,
  title = "Are you sure?",
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  disabled,
  destructive,
  open,
  onOpenChange,
  closeOnConfirmSuccess = true,
}: ConfirmDialogProps) {
  const isControlled = typeof open === "boolean";
  const [internalOpen, setInternalOpen] = useState(false);
  const actualOpen = isControlled ? (open as boolean) : internalOpen;

  const [loading, setLoading] = useState(false);

  const setOpen = useCallback(
    (val: boolean) => {
      if (isControlled) onOpenChange?.(val);
      else setInternalOpen(val);
    },
    [isControlled, onOpenChange]
  );

  const handleCancel = useCallback(() => {
    onCancel?.();
    setOpen(false);
  }, [onCancel, setOpen]);

  const handleConfirm = useCallback(async () => {
    if (disabled || loading) return;
    try {
      const maybePromise = onConfirm?.();
      if (
        maybePromise &&
        typeof (maybePromise as Promise<void>).then === "function"
      ) {
        setLoading(true);
        await maybePromise;
      }
      if (closeOnConfirmSuccess) setOpen(false);
    } finally {
      setLoading(false);
    }
  }, [onConfirm, disabled, loading, closeOnConfirmSuccess, setOpen]);

  const confirmVariant = useMemo(
    () => (destructive ? "destructive" : "default"),
    [destructive]
  );

  return (
    <Dialog open={actualOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description ? (
            <DialogDescription>{description}</DialogDescription>
          ) : null}
        </DialogHeader>

        <div className="flex mt-4 flex-row justify-end gap-2">
          <Button variant="outline" onClick={handleCancel}>
            {cancelText}
          </Button>

          <Button
            variant={confirmVariant as any}
            onClick={handleConfirm}
            disabled={disabled || loading}
          >
            {confirmText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
