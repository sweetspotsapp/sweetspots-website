import React from "react";
import { Card, CardContent } from "../ui/card";
import { Clock, Pin, Users } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

export default function TripCardSkeleton() {
  return (
    <Card className="rounded-3xl">
      <CardContent className="p-6 flex flex-col gap-2">
        <Skeleton className="h-24 md:h-36 overflow-hidden" />
        <Skeleton className="h-6 w-12" />
        <Skeleton className="h-4 w-12" />
        <div className="flex gap-2 items-center mb-2">
          <Users size={16} />
          <Skeleton className="h-4 w-12" />
        </div>
        <div className="flex gap-2 items-center">
          <Clock size={16} />
          <Skeleton className="h-4 w-12" />
        </div>
        <div className="flex gap-2 items-center">
          <Pin size={16} />
          <Skeleton className="h-4 w-12" />
        </div>
      </CardContent>
    </Card>
  );
}
