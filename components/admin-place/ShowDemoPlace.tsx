'use client';

import { updatePlace } from "@/api/places/endpoints";
import { IPlace } from "@/dto/places/place.dto";
import React, { useState } from "react";
import { Button } from "../ui/button";

export default function ShowDemoPlace({ place }: { place: IPlace }) {
  const [loading, setLoading] = useState(false);
  const [showForDemo, setShowForDemo] = useState<boolean>(place.showForDemo);
  function handleShowForDemoToggle() {
    setLoading(true);
    updatePlace(place.id, { showForDemo: !showForDemo })
      .then(() => {
        setShowForDemo((prev) => !prev);
      })
      .finally(() => setLoading(false));
  }
  return (
    <Button onClick={handleShowForDemoToggle} disabled={loading}>
      {showForDemo ? "Hide for Demo" : "Show for Demo"}
    </Button>
  );
}
