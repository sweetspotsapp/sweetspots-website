"use client";

import React from "react";
import Map, {
  Marker,
  NavigationControl,
} from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

export default function PlaceMap({ lat, lng }: { lat: number; lng: number }) {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  // uncontrolled map (drag works out of the box)
  return (
    <Map
      initialViewState={{ latitude: lat, longitude: lng, zoom: 14 }}
      mapboxAccessToken={token}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      style={{ width: "100%", height: "100%" }}
    >
      <NavigationControl position="top-right" />
      <Marker latitude={lat} longitude={lng} />
    </Map>
  );
}