import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { IItinerary } from "@/dto/itineraries/itinerary.dto";
import PlanCard from "./PlanCard";
import { priceLevelToCost } from "@/lib/utils";
import ItineraryTransport from "./ItineraryTransport";

export default function ItineraryModal({
  open,
  onOpenChange,
  itinerary,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itinerary: IItinerary;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-[80dvh] overflow-y-scroll rounded-lg">
        <DialogHeader>
          <DialogTitle>{itinerary.name}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          {(itinerary.itineraryPlaces || []).map((ip, ipIdx) => {
            const place = ip.place;
            const nextPlace =
              ipIdx < (itinerary.itineraryPlaces || []).length - 1
                ? itinerary.itineraryPlaces?.[ipIdx + 1]?.place
                : null;
            if (place) {
              return (
                <>
                  <PlanCard
                    place={place}
                    key={ipIdx}
                    costRange={priceLevelToCost(place.priceRange)}
                    dateText={ip.visitDate || ""}
                    timeText={ip.visitTime || ""}
                    // closingTime={ip.closingTime}
                    // collaborators={ip.collaborators}
                    // weather={}
                    closingTime={new Date()}
                    placeId={""}
                    collaborators={[]}
                  />
                  {nextPlace && (
                    <ItineraryTransport placeFrom={place} placeTo={nextPlace} />
                  )}
                </>
              );
            } else {
              return null;
            }
          })}
        </div>
        {/* <pre>{JSON.stringify(itinerary, null, 2)}</pre> */}
      </DialogContent>
    </Dialog>
  );
}
