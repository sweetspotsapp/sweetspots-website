"use client";

import * as React from "react";
import { getPlaces, updatePlace } from "@/api/places/endpoints";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/DataTable";
import { IPlace } from "@/dto/places/place.dto";
import { Link, useRouter } from "@/i18n/navigation";
import moment from "moment";
import { ApiPluralResponse } from "@/api/pagination.dto";
import { Paginator } from "@/components/ui/Paginator";
import { usePaginationParams } from "@/hooks/usePaginationParams";
import { Input } from "@/components/ui/input";

export default function PlacesPage() {
  const router = useRouter();

  const { page, limit } = usePaginationParams();

  const [isLoading, setIsLoading] = React.useState(false);
  const [resp, setResp] = React.useState<ApiPluralResponse<IPlace> | null>(
    null
  );

  const [query, setQuery] = React.useState("");

  function changePage(newPage: number) {
    const params = new URLSearchParams();
    if (newPage !== 1) params.set("page", newPage.toString());
    if (limit !== 10) params.set("limit", limit.toString());
    const queryString = params.toString();
    const url = `/admin/places${queryString ? `?${queryString}` : ""}`;
    router.push(url);
  }

  React.useEffect(() => {
    changePage(1);
  }, [query]);

  function fetchPlaces() {
    setIsLoading(true);
    getPlaces({ page, limit, query, showHidden: true })
      .then((r) => setResp(r))
      .catch(() => setResp(null))
      .finally(() => setIsLoading(false));
  }

  React.useEffect(() => {
    let cancelled = false;
    fetchPlaces();
    return () => {
      cancelled = true;
    };
  }, [page, limit, query]);

  const places = resp?.data?.data ?? [];

  console.log(places)

  function handleEdit(place: IPlace) {
    router.push(`/admin/places/${place.id}/edit`);
  }

  function handleViewDetails(place: IPlace) {
    router.push(`/admin/places/${place.id}`);
  }

  function toggleHidePlace(place: IPlace) {
    updatePlace(place.id, { hidden: !place.hidden }).then((res) => {
      fetchPlaces();
    });
  }

  function toggleShowForDemo(place: IPlace) {
    updatePlace(place.id, { showForDemo: !place.showForDemo }).then((res) => {
      fetchPlaces();
    });
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center">
        <Link href="/admin/places/add" className="inline-block">
          <Button>Add New Place</Button>
        </Link>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search places..."
          className="max-w-xs"
        />
      </div>

      <DataTable
        items={places}
        isLoading={!resp || isLoading}
        excludeFields={[
          "reviews",
          "googlePlaceId",
          "googlePhoneNumber",
          "latitude",
          "longitude",
          "googleTypes",
          "calculatedDistance",
          "createdBy",
          "placeImages" as any,
          "images" as any,
          "types",
          "rating",
          "googleRating",
          "priceRange",
          "minPrice",
          "maxPrice",
          "updatedAt",
          "createdAt",
          "googleReviewCount",
          "reviewCount"
        ]}
        actions={[
          { label: "Edit", onClick: handleEdit },
          { label: "Details", onClick: handleViewDetails },
          // { label: "Delete", onClick: handleDelete },
        ]}
        cellRenderers={{
          showForDemo: (value, item) => (
            <div>
              <Button onClick={() => toggleShowForDemo(item)} variant={value ? "default" : "outline"} size="sm">{value ? "Hide from Demo" : "Show in Demo"}</Button>
            </div>
          ),
          hidden: (value, item) => <div>
            <Button onClick={() => toggleHidePlace(item)} variant={!value ? "default" : "outline"} size="sm">{value ? "Unhide" : "Hide"}</Button>
          </div>,
          name: (value, item) => (
            <Link href={`/admin/places/${item.id}`} className="font-medium">
              {value}
            </Link>
          ),
          vibes: (value) => (
            <div className="flex flex-wrap gap-1">
              {value.map((vibe: string, index: number) => (
                <Badge key={index}>{vibe}</Badge>
              ))}
            </div>
          ),
          createdAt: (value) => moment(value).format("LLL"),
          updatedAt: (value) => moment(value).format("LLL"),
        }}
      />

      {resp && <Paginator source={resp} />}
    </div>
  );
}
