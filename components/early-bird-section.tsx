"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Link } from "@/i18n/navigation";
import PreSubscribeButton from "./buttons/PreSubscribeButton";

const PHRASES = ["EARLY BIRD DISCOUNT", "LIMITED TIME OFFER", "JOIN NOW"];

export default function EarlyBirdSection() {
  // make a row repeating all phrases
  const row = Array.from({ length: 6 }, () => PHRASES).flat();

  return (
    <div id='early-bird-section'>
      {/* Running text (multiple phrases) */}
      <div className="bg-orange-500 text-white font-bold">
        <div className="marquee">
          <div className="track">
            {row.map((t, i) => (
              <span key={`a-${i}`} className="item">
                {t}
              </span>
            ))}
            {/* duplicate immediately after */}
            {row.map((t, i) => (
              <span key={`b-${i}`} className="item">
                {t}
              </span>
            ))}
          </div>
        </div>
        <style jsx>{`
          .marquee {
            overflow: hidden;
            white-space: nowrap;
          }
          .track {
            display: inline-flex;
            align-items: center;
            gap: 2rem;
            padding-block: 0.5rem;
            animation: scroll 20s linear infinite;
            will-change: transform;
          }
          .item {
            display: inline-block;
          }
          @keyframes scroll {
            to {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </div>

      {/* Your existing section */}
      <div className="container mx-auto py-24">
        <div className="gap-4 items-center">
          <div className="flex flex-col items-center">
            <h2 className="text-4xl font-bold">
              Get an exclusive 50% early bird discount
            </h2>
            <p className="text-gray-600 py-4">
              Ready to plan your trips with friends?
            </p>

            <div className="flex space-x-4">
              <PreSubscribeButton/>
              <Link href="/learn-more">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>

            <p className="mt-4 text-lg font-semibold text-center">
              <span className="line-through text-gray-400 mr-2">AUD$59.9</span>
              <span className="text-black text-center">
                AUD$29.9/year early bird pricing
              </span>
            </p>

            <ul className="mt-2 space-y-1 text-gray-700 text-sm text-left">
              <li className="flex items-center space-x-2">
                <span>✔</span>
                <span>Risk free, fully refundable</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>📅</span>
                <span>Launch early 2026</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
