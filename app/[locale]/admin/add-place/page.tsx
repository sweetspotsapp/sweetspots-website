'use client'

import PlaceForm from '@/components/admin-place/PlaceForm'
import React from 'react'

export default function AddPlacePage() {
    function handleSubmit() {
        console.log("Form submitted");
        // form submission logic
    }
  return (
    <div>
        <PlaceForm onSubmit={handleSubmit} />
    </div>
  )
}
