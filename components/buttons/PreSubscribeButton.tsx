'use client';

import React, { useState } from "react";
import { Button } from "../ui/button";
import { useLocale } from "next-intl";

const PreSubscribeButton: React.FC = ({
    buttonLabel = "Pre-Order Now!"
}: {
    buttonLabel?: string;
}) => {
  const locale = useLocale();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        body: JSON.stringify({ locale }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setLoading(false);
        alert("Something went wrong");
      }
    } catch (error) {
      setLoading(false);
      alert("Something went wrong");
    }
  };

  return (
    <Button
      size="lg"
      variant="default"
      className="font-bold"
      onClick={handleClick}
      disabled={loading}
    >
      {buttonLabel}
    </Button>
  );
};

export default PreSubscribeButton;
