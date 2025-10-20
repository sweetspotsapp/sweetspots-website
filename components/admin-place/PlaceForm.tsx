"use client";

import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Map, {
  MapMouseEvent,
  Marker,
  NavigationControl,
} from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

// shadcn/ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Icons
import { MapPin, Plus, X, Trash2 } from "lucide-react";
import UploadDropzone, { UploadedResult } from "@/components/UploadDropzone";
import { UploadResponseDto } from "@/dto/upload/upload-response.dto";
import { getReadSas } from "@/api/upload/endpoints";

export const placeFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  priceRange: z.enum(["$", "$$", "$$$", "$$$$"], {
    error: "Price range is required",
  }),
  latitude: z
    .number({ error: "Latitude must be a number" })
    .min(-90, "Min -90")
    .max(90, "Max 90"),
  longitude: z
    .number({ error: "Longitude must be a number" })
    .min(-180, "Min -180")
    .max(180, "Max 180"),
  address: z.string().min(1, "Address is required"),
  vibes: z.array(z.string().min(1), { error: "Vibes are required" }),
  hidden: z.boolean().optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  images: z.array(z.string().url()),
});

export type PlaceFormValues = z.infer<typeof placeFormSchema> & {
  showForDemo?: boolean;
};

const asNumber = (v: string) =>
  v === "" || v === undefined ? undefined : Number(v);

async function reverseGeocode(
  lat: number,
  lng: number
): Promise<string | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&zoom=18&addressdetails=1`,
      { headers: { "User-Agent": "PlaceForm/1.0 (contact: you@example.com)" } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return (
      data?.display_name ||
      [
        data?.address?.house_number,
        data?.address?.road,
        data?.address?.suburb,
        data?.address?.city || data?.address?.town || data?.address?.village,
        data?.address?.state,
        data?.address?.postcode,
        data?.address?.country,
      ]
        .filter(Boolean)
        .join(", ")
    );
  } catch {
    return null;
  }
}

export type PlaceFormProps = {
  defaultValues?: Partial<PlaceFormValues>;
  onSubmit: (values: PlaceFormValues) => Promise<void> | void;
  submittingText?: string;
  submitLabel?: string;
  onCancel?: () => void;
  className?: string;
  isSubmitting?: boolean;
};

export default function PlaceForm({
  defaultValues,
  onSubmit,
  submittingText = "Saving...",
  submitLabel = "Save Place",
  onCancel,
  className,
  isSubmitting = false,
}: PlaceFormProps) {
  const form = useForm<PlaceFormValues>({
    resolver: zodResolver(placeFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      priceRange: "$",
      latitude: defaultValues?.latitude ?? -37.8136,
      longitude: defaultValues?.longitude ?? 144.9631,
      address: defaultValues?.address ?? "",
      vibes: defaultValues?.vibes ?? [],
      images: defaultValues?.images ?? [], // 👈 start empty
      ...defaultValues,
    },
  });

  const { control, handleSubmit, setValue, watch } = form;

  const lat = watch("latitude");
  const lng = watch("longitude");
  const vibes = watch("vibes");
  const images = watch("images");

  const [fetchingAddress, setFetchingAddress] = useState(false);

  const handlePickLocation = useCallback(
    async (newLat: number, newLng: number) => {
      setValue("latitude", newLat, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
      setValue("longitude", newLng, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    },
    [setValue]
  );

  const autoFillAddress = useCallback(async () => {
    if (typeof lat !== "number" || typeof lng !== "number") return;
    setFetchingAddress(true);
    const addr = await reverseGeocode(lat, lng);
    if (addr) setValue("address", addr, { shouldDirty: true });
    setFetchingAddress(false);
  }, [lat, lng, setValue]);

  // Vibes
  const [vibeInput, setVibeInput] = useState("");
  const addVibe = useCallback(() => {
    const v = vibeInput.trim();
    if (!v || vibes.includes(v)) return;
    setValue("vibes", [...vibes, v], { shouldDirty: true });
    setVibeInput("");
  }, [vibeInput, vibes, setValue]);
  const removeVibe = useCallback(
    (v: string) =>
      setValue(
        "vibes",
        vibes.filter((x) => x !== v),
        { shouldDirty: true }
      ),
    [vibes, setValue]
  );

  function handleMapClick(event: MapMouseEvent) {
    handlePickLocation(event.lngLat.lat, event.lngLat.lng);
  }

  // --------- IMAGE MANAGEMENT ----------
  const handleFileUploaded = async (result: UploadedResult) => {
    if (result.ok && result.response) {
      const blobPath = result.response?.blobPath;
      if (!blobPath) return;
      const read = await getReadSas(blobPath);
      const readUrl = read.data?.url;
      if (!readUrl) return;
      setValue("images", [...images, readUrl], { shouldDirty: true });
    }
  };

  const removeImage = (url: string) => {
    setValue(
      "images",
      images.filter((u) => u !== url),
      { shouldDirty: true }
    );
  };

  return (
    <div className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" /> Place
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Hidden Alley Cafe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="minPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Min Price</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 10" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="maxPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Price</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 50" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="priceRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price Range</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select price" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="$">$</SelectItem>
                        <SelectItem value="$$">$$</SelectItem>
                        <SelectItem value="$$$">$$$</SelectItem>
                        <SelectItem value="$$$$">$$$$</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="address"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Address</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input placeholder="Street, City, State" {...field} />
                      </FormControl>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={autoFillAddress}
                        disabled={fetchingAddress}
                      >
                        {fetchingAddress ? "Finding..." : "Use Map Location"}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="description"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={4}
                        placeholder="What makes this place special?"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={control}
                name="latitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Latitude</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="any"
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(asNumber(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="longitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Longitude</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="any"
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(asNumber(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <FormLabel>Vibes</FormLabel>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a vibe (e.g., cozy, scenic)"
                    value={vibeInput}
                    onChange={(e) => setVibeInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addVibe();
                      }
                    }}
                  />
                  <Button type="button" variant="secondary" onClick={addVibe}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {vibes.map((v) => (
                    <Badge
                      key={v}
                      variant="secondary"
                      className="flex gap-1 items-center"
                    >
                      {v}
                      <button
                        type="button"
                        onClick={() => removeVibe(v)}
                        aria-label={`Remove ${v}`}
                      >
                        <X className="ml-1 h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* MAP */}
            <div className="space-y-3">
              <FormLabel>Pick Location on Map</FormLabel>
              <div className="rounded-md overflow-hidden border">
                <div className="h-[500px]">
                  <Map
                    initialViewState={{
                      longitude: lng ?? 144.9631,
                      latitude: lat ?? -37.8136,
                      zoom: 14,
                    }}
                    mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                    mapStyle="mapbox://styles/mapbox/streets-v12"
                    onClick={handleMapClick}
                    style={{ width: "100%", height: "100%" }}
                  >
                    <NavigationControl />
                    <Marker
                      longitude={lng ?? 144.9631}
                      latitude={lat ?? -37.8136}
                    />
                  </Map>
                </div>
              </div>
            </div>

            <Separator />

            {/* IMAGES */}
            <div className="space-y-3">
              <FormLabel>Images</FormLabel>
              <UploadDropzone
                multiple
                folder="places"
                accept={{ "image/*": [".png", ".jpg", ".jpeg", ".webp"] }}
                maxSize={30 * 1024 * 1024}
                onFileUploaded={handleFileUploaded}
              />

              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {images.map((url) => (
                    <div
                      key={url}
                      className="group relative overflow-hidden rounded-lg border"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={url}
                        alt=""
                        className="h-36 w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(url)}
                        className="absolute right-2 top-2 hidden rounded-md bg-white/90 p-1 text-rose-600 shadow-sm group-hover:block"
                        aria-label="Remove image"
                        title="Remove"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Separator />

            <div className="flex items-center justify-end gap-3">
              {onCancel && (
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
              )}
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? submittingText : submitLabel}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </div>
  );
}
