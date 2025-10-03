"use client";

import { getPlace, updatePlace } from "@/api/places/endpoints";
import PlaceForm, { PlaceFormValues } from "@/components/admin-place/PlaceForm";
import { Button } from "@/components/ui/button";
import { IPlace } from "@/dto/places/place.dto";
import { Link, useRouter } from "@/i18n/navigation";
import { uniq } from "lodash";
import { notFound, useParams } from "next/navigation";
import React, { useEffect } from "react";

export default function EditPlacePage() {
  const { placeId } = useParams();

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [place, setPlace] = React.useState<IPlace | null>(null);

  useEffect(() => {
    if (!placeId) {
      return notFound();
    }
    getPlace(placeId as string).then((res) => {
      setPlace(res.data || null);
    });
  }, [placeId]);

  const router = useRouter();

  function handleSubmit(place: PlaceFormValues) {
    setIsSubmitting(true);
    updatePlace(placeId as string, place).finally(() => {
      setIsSubmitting(false);
      router.push('/admin/places/' + placeId);
    });
  }

  const defaultValues: PlaceFormValues | null = place
    ? {
        name: place?.name || "",
        description: place?.description || "",
        priceRange: (place?.priceRange as any) || "",
        vibes: place?.vibes || [],
        // types: place?.types || [],
        latitude: Number(place?.latitude || ""),
        longitude: Number(place?.longitude || ""),
        // category: place?.category || "",
        address: place?.address || "",
        images: place?.images ? uniq(place?.images?.map((img) => img.url)) : [],
      }
    : null;

  return (
    <div className="container mx-auto p-4">
      <Link href={`/admin/places/${placeId}`}>
        <Button>Back to Place</Button>
      </Link>
      {defaultValues && (
        <PlaceForm
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          defaultValues={defaultValues}
        />
      )}
    </div>
  );
}
