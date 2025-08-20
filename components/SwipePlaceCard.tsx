import React from 'react'

interface SwipePlaceCardProps {
    // Add your prop definitions here, for example:
    title: string;
    images?: string[];
    description?: string;
    distance?: number;
    duration?: number; // in seconds
}


export default function SwipePlaceCard({
    title,
    images = [],
    description,
    distance,
    duration
}: SwipePlaceCardProps) {
  return (
    <div className='rounded-xl bg-white shadow-lg p-4 flex flex-col gap-2'>
        {
            images.length > 0 && (
                <img src={images[0]} alt={title} className='rounded-xl w-full h-full absolute inset-0 object-cover' />
            )
        }
    </div>
  )
}
