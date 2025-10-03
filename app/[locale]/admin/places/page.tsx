"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { getPlaces } from "@/api/places/endpoints";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/DataTable";
import { IPlace } from "@/dto/places/place.dto";
import { Link, useRouter } from "@/i18n/navigation";
import moment from "moment";
import { ApiPluralResponse } from "@/api/pagination.dto";
import { Paginator } from "@/components/ui/Paginator";
import { usePaginationParams } from "@/hooks/usePaginationParams";

export default function PlacesPage() {
  const router = useRouter();

  const { page, limit } = usePaginationParams();

  const [isLoading, setIsLoading] = React.useState(false);
  const [resp, setResp] = React.useState<ApiPluralResponse<IPlace> | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      setIsLoading(true);
      try {
        const r = await getPlaces({ page, limit }); // make sure your endpoint accepts { page, limit }
        if (!cancelled) setResp(r);
      } catch (error) {
        if (!cancelled) setResp(null);
      } finally {
        setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [page, limit]);

  const places = resp?.data?.data ?? [];

  function handleEdit(place: IPlace) {
    router.push(`/admin/places/${place.id}/edit`);
  }

  function handleViewDetails(place: IPlace) {
    router.push(`/admin/places/${place.id}`);
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <Link href="/admin/places/add" className="inline-block">
        <Button>Add New Place</Button>
      </Link>

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
          "types",
        ]}
        actions={[
          { label: "Edit", onClick: handleEdit },
          { label: "Details", onClick: handleViewDetails },
          // { label: "Delete", onClick: handleDelete },
        ]}
        cellRenderers={{
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