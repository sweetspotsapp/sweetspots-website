import { useEffect } from "react";
import { useMap } from "react-leaflet";

function Recenter({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    if (typeof lat === "number" && typeof lng === "number") {
      map.setView([lat, lng]);
    }
  }, [lat, lng, map]);
  return null;
}

export default Recenter;
