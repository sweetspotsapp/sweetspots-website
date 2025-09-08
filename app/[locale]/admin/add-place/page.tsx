'use client'

import PlaceForm from '@/components/admin-place/PlaceForm'
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import React from 'react'

export default function AddPlacePage() {
    function handleSubmit() {
        console.log("Form submitted");
    }
  return (
    <div className='container mx-auto p-4'>
      <Link href="/admin">
        <Button>
          Back to Admin
        </Button>
      </Link>
        <PlaceForm onSubmit={handleSubmit} />
    </div>
  )
}
