'use client';

import { updatePlace } from "@/api/places/endpoints";
import { IPlace } from "@/dto/places/place.dto";
import React, { useState } from "react";
import { Button } from "../ui/button";

export default function HidePlace({ place }: { place: IPlace }) {
  const [loading, setLoading] = useState(false);
  const [hidden, setHidden] = useState<boolean>(place.hidden);
  function handleHideToggle() {
    setLoading(true);
    updatePlace(place.id, { hidden: !hidden })
      .then(() => {
        setHidden((prev) => !prev);
      })
      .finally(() => setLoading(false));
  }
  return (
    <Button onClick={handleHideToggle} disabled={loading}>
      {hidden ? "Unhide" : "Hide"}
    </Button>
  );
}
