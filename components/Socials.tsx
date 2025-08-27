import React from "react";
import { FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa";

interface SocialsProps {
  className?: string;
  iconSize?: number;
}

export default function Socials({
  className = "",
  iconSize = 24,
}: SocialsProps) {
  return (
    <div
      className={`flex gap-4 items-center justify-end ${className}`}
    >
      <a
        href="https://www.instagram.com/sweetspotsai/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="text-gray-500 hover:text-pink-500 transition-colors"
      >
        <FaInstagram size={iconSize} />
      </a>
      <a
        href="https://www.linkedin.com/company/108092493"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="text-gray-500 hover:text-blue-700 transition-colors"
      >
        <FaLinkedin size={iconSize} />
      </a>
      <a
        href="https://www.tiktok.com/@sweetspotsai"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="TikTok"
        className="text-gray-500 hover:text-black transition-colors"
      >
        <FaTiktok size={iconSize} />
      </a>
    </div>
  );
}
