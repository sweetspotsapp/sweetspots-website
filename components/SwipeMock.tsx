"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Check } from "lucide-react";

const mockPlaces = [
  {
    id: "1",
    name: "Brunetti Oro Flinders Lane",
    address: "250 Flinders Ln, Melbourne VIC",
    rating: 4.2,
    reviews: 3477,
    image:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
    url: "https://brunettiere.com.au/",
  },
  {
    id: "2",
    name: "Chin Chin",
    address: "125 Flinders Ln, Melbourne VIC",
    rating: 4.4,
    reviews: 5234,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    url: "https://chinchin.melbourne/",
  },
  {
    id: "3",
    name: "Higher Ground",
    address: "650 Little Bourke St, Melbourne VIC",
    rating: 4.6,
    reviews: 2101,
    image:
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80",
    url: "https://highergroundmelbourne.com.au/",
  },
];

export default function SwipeMock() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [cardVisible, setCardVisible] = useState(true);
  const current = mockPlaces[index % mockPlaces.length];

  const swipe = (dir: "left" | "right") => {
    if (!cardVisible) return;

    setDirection(dir); // ✅ 1. set direction
    setCardVisible(false); // ✅ 2. trigger exit
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
      <div className="absolute -top-2 -left-4 px-4 py-2 rounded-full text-center text-white font-semibold text-lg mb-4 bg-emerald-400 z-10 -rotate-12">
        Try it!
      </div>
      <div className="relative bg-gray-900 rounded-[2.5rem] p-4 shadow-2xl w-full">
        <div className="bg-white rounded-[2rem] overflow-hidden">
          <div className="relative h-[600px] bg-white">
            {/* Status Bar */}
            <div className="flex justify-between items-center px-6 py-3 text-sm text-gray-900">
              <span className="font-semibold">SweetSpots</span>
              <div className="flex space-x-1">
                <div className="w-4 h-4 bg-emerald-500 rounded-full animate-pulse" />
                <div className="w-4 h-4 bg-rose-500 rounded-full animate-pulse delay-150" />
              </div>
            </div>

            {/* Card */}
            <div className="px-4 py-4 h-3/4 relative">
              <AnimatePresence
                custom={direction}
                onExitComplete={handleExitComplete}
              >
                {cardVisible && (
                  <motion.div
                    key={current.id + index}
                    className="absolute inset-0 bg-white rounded-2xl shadow-lg overflow-hidden m-4"
                    drag="x"
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
                    <div className="relative h-48">
                      <Image
                        src={current.image}
                        alt={current.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-full text-xs font-semibold">
                        {current.rating} ★
                      </div>
                    </div>
                    <div className="p-4 space-y-3">
                      <h3 className="font-serif text-xl font-semibold">
                        {current.name}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {current.name} is located at {current.address} with an
                        impressive rating of {current.rating} based on{" "}
                        {current.reviews} reviews. Learn more at{" "}
                        <a
                          href={current.url}
                          className="underline text-blue-600"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {new URL(current.url).hostname}
                        </a>
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Buttons */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex justify-center space-x-6 pt-4 z-10">
              <button
                onClick={() => swipe("left")}
                className="w-14 h-14 bg-rose-500 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
              >
                <span className="text-white text-2xl font-bold">✕</span>
              </button>
              <button
                onClick={() => swipe("right")}
                className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
              >
                <span className="text-white text-2xl font-bold"><Check size={28}/></span>
              </button>
            </div>

            {/* Bottom Nav */}
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100">
              <div className="flex justify-around py-4">
                <div className="text-center">
                  <div className="w-6 h-6 mx-auto mb-1 bg-emerald-500 rounded" />
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
