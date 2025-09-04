"use client";

import React, { useState } from "react";
import { Card } from "./ui/card";
import { Slider } from "./ui/slider";
// import { getRandomVibes } from "@/api/places/endpoints";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

const DEFAULT_VIBES = ["Chill", "Local", "Aesthetic", "Nature", "Creative"];

type FilterCardProps = {
  maxBudget?: number;
  vibes?: string[];
  onChangeMaxBudget: (value: number) => void;
  onChangeVibes: (value: string[]) => void;
};

export default function FilterCard({
  maxBudget,
  vibes,
  onChangeMaxBudget,
  onChangeVibes,
}: FilterCardProps) {
  const [allVibes, setAllVibes] = useState<string[]>(DEFAULT_VIBES);

  // useEffect(() => {
  //   getRandomVibes().then((res) => {
  //     if (res.data) setAllVibes(res.data);
  //   });
  // }, []);

  function handleBadgeClick(vibe: string) {
    if (vibes?.includes(vibe)) {
      onChangeVibes(vibes.filter((v) => v !== vibe));
    } else {
      onChangeVibes([...(vibes || []), vibe]);
    }
  }

  return (
    <Card className="p-4">
      <p className="font-bold mb-2">Your Budget</p>
      <Slider
        value={[maxBudget || 0]}
        onValueChange={(vals) => onChangeMaxBudget(vals[0])}
        max={5}
        step={1}
      />
      <div className="flex justify-between text-sm mt-2">
        <span className="text-gray-500">Free</span>
        <span className="text-gray-500">$100/per person</span>
      </div>
      <p className="font-bold mb-4 mt-4">Your Vibes</p>
      <div className="flex flex-wrap gap-2">
        {allVibes.map((vibe) => (
          <Badge
            variant="outline"
            onClick={() => handleBadgeClick(vibe)}
            className={cn(
              "border shadow-sm !border-orange-500 bg-white text-black cursor-pointer",
              vibes?.includes(vibe) ? "bg-orange-500 text-white" : ""
            )}
            key={vibe}
          >
            {vibe}
          </Badge>
        ))}
      </div>
    </Card>
  );
}
