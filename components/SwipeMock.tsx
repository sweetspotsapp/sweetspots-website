"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSwipedPlaces } from "@/store/useSwipedPlaces";
// import { placesMock } from "@/mockData/placesMock";
import { IPlace } from "@/dto/places/place.dto";
import { getRecommendations } from "@/api/recommendations/endpoints";
import { IRecommendedPlace } from "@/dto/recommendations/recommendation.dto";
import SwipeCard from "./SwipePlaceCard";
import SwipeCardSkeleton from "./skeletons/SwipeCardSkeleton";

// const mockPlaces = placesMock;

export default function SwipeMock() {
  const t = useTranslations("solution");
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [location, setLocation] = useState<
    { lat: number; lng: number } | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [cardVisible, setCardVisible] = useState(true);
  const [places, setPlaces] = useState<IRecommendedPlace[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => {
        setError(err.message);
      }
    );
  }, []);

  useEffect(() => {
    async function fetchData(
      loc: { lat: number; lng: number } = {
        lat: -37.8174877,
        lng: 144.9582011,
      }
    ) {
      setIsLoading(true)
      try {
        const res = await getRecommendations({
          distance: 7,
          latitude: loc.lat,
          longitude: loc.lng,
          withReviews: false,
          diversity: 0.67,
        });
        if (res.data) {
          setPlaces(res.data);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchData(location);
  }, [location]);

  const current = places[index % places.length];

  const { addSwipedPlaceId } = useSwipedPlaces();

  const handleSwipeRight = (id: string) => {
    addSwipedPlaceId(id);
  };

  const swipe = (dir: "left" | "right") => {
    if (!cardVisible) return;

    if (dir === "right") {
      handleSwipeRight(current.id);
    }

    setDirection(dir);
    setCardVisible(false);
  };

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x < -100) swipe("left");
    else if (info.offset.x > 100) swipe("right");
  };

  const handleExitComplete = () => {
    setIndex((prev) => prev + 1);
    setDirection(null);
    setCardVisible(true);
  };

  return (
    <div className="relative">
      <div className="absolute -top-2 -left-4 px-4 py-2 rounded-full text-center text-white font-semibold text-lg mb-4 bg-orange-400 z-10 -rotate-12">
        {t("tryIt")}
      </div>
      <div className="relative bg-gray-900 rounded-[2.5rem] p-4 shadow-2xl w-full">
        <div className="bg-white rounded-[2rem] overflow-hidden">
          <div className="relative h-[600px] bg-white">
            {/* Status Bar */}
            <div className="flex justify-between items-center px-6 py-3 text-sm text-gray-900">
              <span className="font-semibold text-xl text-orange-500">SweetSpots</span>
              <div className="flex space-x-1">
                <div className="w-4 h-4 bg-orange-500 rounded-full animate-pulse" />
                <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse delay-150" />
              </div>
            </div>

            {/* Card */}
            <div className="px-4 py-4 h-3/4 relative">
              {current ? (
                <AnimatePresence
                  custom={direction}
                  onExitComplete={handleExitComplete}
                >
                  {cardVisible && (
                    <motion.div
                      key={current.id + index}
                      drag="x"
                      className="absolute inset-0 m-4"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.5}
                      onDragEnd={handleDragEnd}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit="exit"
                      custom={direction}
                      variants={{
                        exit: (dir: "left" | "right") => ({
                          x: dir === "left" ? -400 : 400,
                          rotate: dir === "left" ? -20 : 20,
                          opacity: 0,
                          transition: { duration: 0.25 },
                        }),
                      }}
                    >
                      <SwipeCard
                        recommendedPlace={current}
                        name={current.name}
                        images={current.images}
                        rating={current.rating}
                        address={current.address}
                        reviews={current.reviews}
                        description={current.description}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              ) : (
                <SwipeCardSkeleton/>
              )}
            </div>

            {/* Buttons */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex justify-center space-x-6 pt-4 z-40">
              <button
                onClick={() => swipe("left")}
                className="w-14 h-14 bg-white border border-orange-500 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
              >
                <span className="text-orange-500 text-2xl font-bold">✕</span>
              </button>
              <button
                onClick={() => swipe("right")}
                className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
              >
                <span className="text-white text-2xl font-bold">
                  <Heart size={28} />
                </span>
              </button>
            </div>

            {/* Bottom Nav */}
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100">
              <div className="flex justify-around py-4">
                <div className="text-center">
                  <div className="w-6 h-6 mx-auto mb-1 bg-orange-500 rounded" />
                  <span className="text-xs text-gray-600">Discover</span>
                </div>
                <div className="text-center">
                  <div className="w-6 h-6 mx-auto mb-1 bg-gray-200 rounded" />
                  <span className="text-xs text-gray-600">Saved</span>
                </div>
                <div className="text-center">
                  <div className="w-6 h-6 mx-auto mb-1 bg-gray-200 rounded" />
                  <span className="text-xs text-gray-600">Profile</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -left-1 top-16 w-1 h-8 bg-gray-800 rounded-l"></div>
      <div className="absolute -left-1 top-28 w-1 h-12 bg-gray-800 rounded-l"></div>
      <div className="absolute -left-1 top-44 w-1 h-12 bg-gray-800 rounded-l"></div>
      <div className="absolute -right-1 top-20 w-1 h-16 bg-gray-800 rounded-r"></div>
    </div>
  );
}
