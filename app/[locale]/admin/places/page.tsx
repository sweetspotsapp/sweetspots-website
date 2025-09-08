"use client";

import { getPlaces } from "@/api/places/endpoints";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/DataTable";
import { IPlace } from "@/dto/places/place.dto";
import { Link } from "@/i18n/navigation";
import moment from "moment";
import React, { useEffect } from "react";

export default function PlacesPage() {
  const [places, setPlaces] = React.useState<IPlace[]>([]);

  useEffect(() => {
    getPlaces().then((res) => {
      if (res.data) {
        setPlaces(res.data?.data || []);
      }
    });
  }, []);

  function handleEdit(place: IPlace) {

    // Handle edit action
  }

  function handleDelete(place: IPlace) {
    // Handle delete action
  }

  return (
    <div className="container mx-auto p-4">
      <Link href="/admin/places/add">
        <Button>Add New Place</Button>
      </Link>
      <DataTable
        items={places}
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
          {
            label: "Edit",
            onClick: (item) => {
              // Handle edit action
            },
          },
          {
            label: "Delete",
            onClick: (item) => {
              // Handle delete action
            },
          },
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
    </div>
  );
}
