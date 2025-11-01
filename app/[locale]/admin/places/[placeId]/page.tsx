import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { MapPin, Globe, Phone, ExternalLink, Pencil } from "lucide-react";
import { getPlace, updatePlace } from "@/api/places/endpoints";
import PlaceMap from "@/components/admin-place/PlaceMap";
import CopyButton from "@/components/CopyButton";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import DeletePlaceConfirmDialog from "@/components/admin-place/DeletePlaceConfirmDialog";
import { uniqBy } from "lodash";
import { useState } from "react";
import HidePlace from "@/components/admin-place/HidePlace";
import ShowDemoPlace from "@/components/admin-place/ShowDemoPlace";

export default async function PlaceDetailsPage({
  params,
}: {
  params: { placeId: string };
}) {
  const res = await getPlace(params.placeId);
  const place = res.data;
  if (!place) notFound();

  const {
    id,
    name,
    priceRange,
    rating,
    reviewCount,
    googleRating,
    googleReviewCount,
    vibes = [],
    address,
    description,
    whatToPrepare,
    whyVisit,
    latitude,
    longitude,
    googleWebsite,
    googlePhoneNumber,
    category,
    distance,
    duration,
    isActive,
  } = place;

  const displayRating =
    (rating ?? googleRating ?? null) != null
      ? Number(rating ?? googleRating).toFixed(1)
      : null;

  const displayReviews = reviewCount ?? googleReviewCount ?? null;
  const images = place.images ? uniqBy(place.images, 'url') : [];

  return (
    <div className="container mx-auto py-8 space-y-6">
      <Link href="/admin/places">
        <Button>Back to Places</Button>
      </Link>
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{name}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="secondary">{priceRange}</Badge>
            <span>•</span>
            <span className="capitalize">{category}</span>
            {isActive === false && (
              <>
                <span>•</span>
                <Badge variant="destructive">Inactive</Badge>
              </>
            )}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
            {displayRating && (
              <span className="font-medium">
                {displayRating} ★{displayReviews ? ` (${displayReviews})` : ""}
              </span>
            )}
            {(distance || duration) && (
              <span className="text-muted-foreground">
                {distance ? `${distance}` : ""}
                {distance && duration ? " • " : ""}
                {duration ? `${duration}` : ""}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          {/* Example edit path if you have an admin editor */}
          <Button asChild variant="outline">
            <Link href={`/admin/places/${id}/edit`}>
              <Pencil className="h-4 w-4" /> Edit
            </Link>
          </Button>
          <HidePlace place={place} />
          <ShowDemoPlace place={place} />
          <DeletePlaceConfirmDialog placeId={id} />
          {googleWebsite && (
            <Button asChild>
              <a href={googleWebsite} target="_blank" rel="noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Website
              </a>
            </Button>
          )}
        </div>
      </div>

      {/* Address & contact */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" /> Location
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-1 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{address}</span>
              <CopyButton value={address} />
            </div>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <span>Lat: {latitude}</span>
              <span>Lng: {longitude}</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {googleWebsite && (
                <a
                  className="inline-flex items-center gap-2 text-sm underline underline-offset-4"
                  href={googleWebsite}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Globe className="h-4 w-4" /> Website
                </a>
              )}
              {googlePhoneNumber && (
                <a
                  className="inline-flex items-center gap-2 text-sm underline underline-offset-4"
                  href={`tel:${googlePhoneNumber}`}
                >
                  <Phone className="h-4 w-4" /> {googlePhoneNumber}
                </a>
              )}
            </div>
          </div>

          <Separator />

          {/* Mapbox map (client component) */}
          <div className="rounded-md border overflow-hidden">
            <div className="h-[320px]">
              <PlaceMap lat={Number(latitude)} lng={Number(longitude)} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vibes */}
      {vibes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Vibes</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {vibes.map((v) => (
              <Badge key={v} variant="secondary" className="capitalize">
                {v}
              </Badge>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-6 text-muted-foreground whitespace-pre-wrap">
            {description}
          </p>
        </CardContent>
      </Card>
            <Card>
        <CardHeader>
          <CardTitle>Why Visit?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-6 text-muted-foreground whitespace-pre-wrap">
            {whyVisit}
          </p>
        </CardContent>
      </Card>

                  <Card>
        <CardHeader>
          <CardTitle>What to Prepare?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-6 text-muted-foreground whitespace-pre-wrap">
            {whatToPrepare}
          </p>
        </CardContent>
      </Card>
      {images.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Images</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {images.map((img, imgIdx) => (
                <div
                  key={imgIdx}
                  className="group relative overflow-hidden rounded-lg border"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.url}
                    alt=""
                    className="h-36 w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
