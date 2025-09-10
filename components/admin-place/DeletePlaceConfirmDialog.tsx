"use client";

import React, { useState } from "react";
import ConfirmDialog from "../ConfirmDialog";
import { Button } from "../ui/button";
import { deletePlace } from "@/api/places/endpoints";
import { useRouter } from "@/i18n/navigation";

export default function DeletePlaceConfirmDialog({
  placeId,
}: {
  placeId: string;
}) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  function handleConfirm() {
    setIsDeleting(true);
    deletePlace(placeId).then(() => {
      router.replace('/admin/places');
    }).finally(() => {
      setIsDeleting(false);
    });
  }
  return (
    <ConfirmDialog
      onConfirm={handleConfirm}
      title="Delete Place"
      description="Are you sure you want to delete this place? This action cannot be undone."
      confirmText="Delete"
      cancelText="Cancel"
      destructive
      disabled={isDeleting}
    >
      <Button variant='destructive'>
      Delete
      </Button>
    </ConfirmDialog>
  );
}
