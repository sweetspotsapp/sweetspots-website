"use client";

import { createPlace } from "@/api/places/endpoints";
import PlaceForm, { PlaceFormValues } from "@/components/admin-place/PlaceForm";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import React from "react";

export default function AddPlacePage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  function handleSubmit(place: PlaceFormValues) {
    setIsSubmitting(true);
    createPlace(place).finally(() => {
      setIsSubmitting(false);
    });
  }
  return (
    <div className="container mx-auto p-4">
      <Link href="/admin">
        <Button>Back to Admin</Button>
      </Link>
      <PlaceForm isSubmitting={isSubmitting} onSubmit={handleSubmit} />
    </div>
  );
}
