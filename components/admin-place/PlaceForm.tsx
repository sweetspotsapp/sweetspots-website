"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Map, { MapMouseEvent, Marker, NavigationControl } from "react-map-gl/mapbox";
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
import { MapPin, Plus, X } from "lucide-react";

// ——————————————————————————————————————————
// ZOD SCHEMA (aligns with your Drizzle table where relevant)
// ——————————————————————————————————————————
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
});

export type PlaceFormValues = z.infer<typeof placeFormSchema>;

// Small helper to coerce input string → number in RHF Controller
const asNumber = (v: string) =>
  v === "" || v === undefined ? undefined : Number(v);

// Reverse geocode via Nominatim (OpenStreetMap)
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
  } catch (e) {
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
};

export default function PlaceForm({
  defaultValues,
  onSubmit,
  submittingText = "Saving...",
  submitLabel = "Save Place",
  onCancel,
  className,
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
      vibes: defaultValues?.vibes ?? [], // keep it present
      ...defaultValues,
    } satisfies Partial<PlaceFormValues>,
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    watch,
  } = form;

  const lat = watch("latitude");
  const lng = watch("longitude");

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

  // Vibes tagging helpers
  const [vibeInput, setVibeInput] = useState("");
  const vibes = watch("vibes");
  const addVibe = useCallback(() => {
    const v = vibeInput.trim();
    if (!v) return;
    if (vibes.includes(v)) return;
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

  // Map click handler component
  function handleMapClick(event: MapMouseEvent) {
    // const [lng, lat] = event.lngLat;
    const lng = event.lngLat.lng;
    const lat = event.lngLat.lat;
    handlePickLocation(lat, lng);
  }

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
                  <FormItem>
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
                    // longitude={lng ?? 144.9631}
                    // latitude={lat ?? -37.8136}
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
              <p className="text-sm text-muted-foreground">
                Click anywhere on the map to set latitude & longitude. Then use
                &quot;Use Map Location&quot; to auto-fill the address from
                OpenStreetMap.
              </p>
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

// ——————————————————————————————————————————
// QUICK USAGE EXAMPLE (adjust imports/paths as needed)
// ——————————————————————————————————————————
// import PlaceForm, { PlaceFormValues } from "@/components/PlaceForm";
//
// export default function NewPlacePage() {
//   const handleSubmit = async (values: PlaceFormValues) => {
//     // call your API here
//     console.log(values);
//   };
//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <PlaceForm onSubmit={handleSubmit} />
//     </div>
//   );
// }
//
// ——————————————————————————————————————————
// INSTALL NOTES
// ——————————————————————————————————————————
// npm i react-hook-form zod @hookform/resolvers leaflet react-leaflet
// Ensure shadcn/ui components (Form, Input, Textarea, Select, Button, Badge, Card, Separator) are installed.
// Add `import "leaflet/dist/leaflet.css";` globally (e.g., in app/layout.tsx) if you prefer.
