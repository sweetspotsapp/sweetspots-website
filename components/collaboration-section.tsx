"use client";

import React, { useEffect, useRef, useState } from "react";
import PlanCard, { PlanCardProps, PlanCardRefs } from "./PlanCard";
import { placesMock } from "@/mockData/placesMock";
import Cursor from "./Cursor";
import { Button } from "./ui/button";
import { useAnimationControls, useInView } from "framer-motion";

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

function getCoordsInContainer(target: HTMLElement, container: HTMLElement) {
  const t = target.getBoundingClientRect();
  const c = container.getBoundingClientRect();
  return {
    x: t.left - c.left + container.scrollLeft + t.width / 2,
    y: t.top - c.top + container.scrollTop + t.height / 2,
  };
}

export default function CollaborationSection() {
  const [plan1, setPlan1] = useState<PlanCardProps | null>({
    place: placesMock[0],
    placeId: placesMock[0].id,
    costRange: [15, 40],
    closingTime: new Date("2025-08-27T18:00:00.000Z"),
    collaborators: [{ name: "Zio" }, { name: "Dennis" }],
    dateText: "27 August 2025",
    timeText: "08:00",
  });
  const [plan2, setPlan2] = useState<PlanCardProps | null>({
    place: placesMock[1],
    placeId: placesMock[1].id,
    costRange: [10, 30],
    closingTime: new Date("2025-08-27T18:00:00.000Z"),
    collaborators: [{ name: "Zio" }, { name: "Dennis" }],
    dateText: "28 August 2025",
    timeText: "08:00",
  });


  const containerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<PlanCardRefs>(null);
  const card2Ref = useRef<PlanCardRefs>(null);
  const cursor1Controls = useAnimationControls();
  const cursor2Controls = useAnimationControls();
  const cursor3Controls = useAnimationControls();

  const isInView = useInView(containerRef, {
    amount: 0.5,
    once: true,
  });

  const [cursor1AllGood, setCursor1AllGood] = useState(false);
  const [cursor2AllGood, setCursor2AllGood] = useState(false);
  const [cursor3AllGood, setCursor3AllGood] = useState(false);

  const moveAndClick = async () => {
    const container = containerRef.current;

    const btn1 = card1Ref.current?.buttonEl;
    const btn2 = card2Ref.current?.buttonEl;

    const time1 = card1Ref.current?.timeEl;
    const time2 = card2Ref.current?.timeEl;

    const budget1 = card1Ref.current?.budgetEl;
    const budget2 = card2Ref.current?.budgetEl;

    const date1 = card1Ref.current?.dateEl;
    const date2 = card2Ref.current?.dateEl;

    if (
      !btn1 ||
      !btn2 ||
      !container ||
      !time1 ||
      !time2 ||
      !budget1 ||
      !budget2 ||
      !date1 ||
      !date2
    )
      return;

    const { x: btnX1, y: btnY1 } = getCoordsInContainer(btn1, container);
    const { x: btnX2, y: btnY2 } = getCoordsInContainer(btn2, container);
    const { x: timeX1, y: timeY1 } = getCoordsInContainer(time1, container);
    const { x: timeX2, y: timeY2 } = getCoordsInContainer(time2, container);
    const { x: budgetX1, y: budgetY1 } = getCoordsInContainer(
      budget1,
      container
    );
    const { x: budgetX2, y: budgetY2 } = getCoordsInContainer(
      budget2,
      container
    );
    const { x: dateX1, y: dateY1 } = getCoordsInContainer(date1, container);
    const { x: dateX2, y: dateY2 } = getCoordsInContainer(date2, container);

    const checkAllElement =
      !btn1 || !btn2 || !container || !time1 || !time2 || !budget1 || !budget2;

    async function startCursor1() {
      if (checkAllElement) return;
      await cursor1Controls.start({
        x: btnX1,
        y: btnY1,
        transition: { duration: 0.8, ease: "easeInOut" },
      });
      btn1.click();
      await sleep(500);
      await cursor1Controls.start({
        x: timeX1,
        y: timeY1,
        transition: { duration: 0.8, ease: "easeInOut" },
      });
      setPlan1((prev) => (prev ? { ...prev, selectedField: "time" } : prev));
      await sleep(200);
      setPlan1((prev) => (prev ? { ...prev, timeText: "09:00" } : prev));
      await sleep(300);
      await cursor1Controls.start({
        x: budgetX1,
        y: budgetY1,
        transition: { duration: 0.8, ease: "easeInOut" },
      });
      await sleep(200);
      setPlan1((prev) => (prev ? { ...prev, selectedField: "budget" } : prev));
      await sleep(400);
      setPlan1((prev) => (prev ? { ...prev, costRange: [40, 60] } : prev));
      await cursor1Controls.start({
        x: budgetX1 + 120,
        y: budgetY1 + 30,
        transition: { duration: 1, ease: "easeInOut" },
      });
      setPlan1((prev) => (prev ? { ...prev, selectedField: null } : prev));
      await sleep(500);
      await cursor1Controls.start({
        x: btnX2,
        y: btnY2,
        transition: { duration: 1, ease: "easeInOut" },
      });
      await sleep(100);
      btn2.click();
    }

    async function startCursor2() {
      if (checkAllElement) return;
      await cursor2Controls.start({
        x: btnX2,
        y: btnY2,
        transition: { duration: 1, ease: "easeInOut" },
      });
      await sleep(100);
      btn2.click();
      await sleep(500);
      await cursor2Controls.start({
        x: btnX2 + 120,
        y: btnY2 + 60,
        transition: { duration: 1, ease: "easeInOut" },
      });
      await sleep(250);
      await cursor2Controls.start({
        x: dateX2,
        y: dateY2,
        transition: { duration: 1, ease: "easeInOut" },
      });
      // await sleep(1000);
      setPlan2((prev) => (prev ? { ...prev, selectedField: "date" } : prev));
      await sleep(300);
      setPlan2((prev) =>
        prev ? { ...prev, dateText: "29 August 2025" } : prev
      );
      await sleep(250);
      setPlan2((prev) =>
        prev ? { ...prev, dateText: "30 August 2025" } : prev
      );
      await cursor2Controls.start({
        x: dateX2 + 140,
        y: dateY2 + 30,
        transition: { duration: 1, ease: "easeInOut" },
      });
      setPlan2((prev) => (prev ? { ...prev, selectedField: null } : prev));
      await sleep(500);
      await cursor2Controls.start({
        x: timeX2,
        y: timeY2,
        transition: { duration: 0.8, ease: "easeInOut" },
      });
      setPlan2((prev) => (prev ? { ...prev, selectedField: "time" } : prev));
      await sleep(200);
      setPlan2((prev) => (prev ? { ...prev, timeText: "09:30" } : prev));
      await sleep(300);
      await cursor2Controls.start({
        x: timeX2 + 30,
        y: timeY2 + 50,
        transition: { duration: 0.8, ease: "easeInOut" },
      });
      setPlan2((prev) => (prev ? { ...prev, selectedField: null } : prev));
    }

    async function startCursor3() {
      if (checkAllElement) return;
      await cursor3Controls.start({
        x: btnX2 + 60,
        y: btnY2 + 50,
        transition: { duration: 1, ease: "easeInOut" },
      });
      await sleep(500);
      await cursor3Controls.start({
                x: budgetX2 - 70,
        y: budgetY2 + 95,
        transition: { duration: 1.2, ease: "easeInOut" },
      })
      await sleep(270)
      await cursor3Controls.start({
        x: btnX1,
        y: btnY1,
        transition: { duration: 1, ease: "easeInOut" },
      });
      await sleep(330);
      btn1.click();
      await sleep(360);
      await cursor3Controls.start({
        x: btnX1 + 50,
        y: btnY1 - 40,
        transition: { duration: 1, ease: "easeInOut" },
      });
      await sleep(240);
      await cursor3Controls.start({
        x: btnX1 + 20,
        y: btnY1 - 80,
        transition: { duration: 1, ease: "easeInOut" },
      });
    }

    async function setAllGood() {
      await sleep(8000)
      setCursor1AllGood(true);
      await sleep(150)
      setCursor2AllGood(true);
      await sleep(150)
      setCursor3AllGood(true);
    }

    startCursor1();
    startCursor2();
    startCursor3();
    setAllGood()
  };

  useEffect(() => {
    if (isInView) {
      moveAndClick();
    } 
  }, [isInView])

  return (
    <>
      <Cursor pointerColor="#FF0000" animate={cursor1Controls} allGood={cursor1AllGood} />
      <Cursor pointerColor="orange" animate={cursor2Controls} allGood={cursor2AllGood} />
      <Cursor pointerColor="green" animate={cursor3Controls} allGood={cursor3AllGood} />
      <div className="w-full bg-orange-500 overflow-hidden" ref={containerRef}>
        <div className="container mx-auto py-20">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 animate-slide-in-left items-center ld:items-start lg:mt-20 text-white">
              <p className="text-xl font-bold">Beautiful!</p>
              <p className="text-3xl font-bold">
                But what&apos;s a memory without anyone to share it with?
              </p>
              <p className="text-lg">
                Share and build your trip plan with your buddies!
              </p>
            </div>
            <div>
              {plan1 && (
                <PlanCard
                  place={plan1?.place}
                  costRange={plan1?.costRange}
                  closingTime={plan1?.closingTime}
                  collaborators={plan1?.collaborators}
                  placeId={plan1?.placeId}
                  timeText={plan1?.timeText}
                  selectedField={plan1?.selectedField}
                  dateText={plan1?.dateText}
                  ref={card1Ref}
                />
              )}
              {plan2 && (
                <PlanCard
                  place={plan2?.place}
                  costRange={plan2?.costRange}
                  closingTime={plan2?.closingTime}
                  collaborators={plan2?.collaborators}
                  placeId={plan2?.placeId}
                  timeText={plan2?.timeText}
                  selectedField={plan2?.selectedField}
                  dateText={plan2?.dateText}
                  ref={card2Ref}
                />
              )}
              <small className="text-xs text-orange-800">
                For illustration purposes only.
              </small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
