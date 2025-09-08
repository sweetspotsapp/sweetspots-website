'use client'

import { getPlaces } from '@/api/places/endpoints'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/DataTable'
import { IPlace } from '@/dto/places/place.dto'
import { Link } from '@/i18n/navigation'
import React, { useEffect } from 'react'

export default function PlacesPage() {
    const [places, setPlaces] = React.useState<IPlace[]>([])

    useEffect(() => {
       getPlaces().then((res) => {
        if (res.data) {
            setPlaces(res.data?.data || [])
        }
    })
    }, [])

  return (
    <div className='container mx-auto p-4'>
        <Link href="/admin/places/add">
          <Button>Add New Place</Button>
        </Link>
        <DataTable items={places} excludeFields={[
        'reviews',
        'googlePlaceId',
        'googlePhoneNumber',
        'latitude',
        'longitude',
        'googleTypes',
        'calculatedDistance'
        ]} />
    </div>
  )
}
