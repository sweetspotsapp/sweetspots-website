import { LucideIcon } from 'lucide-react'
import React from 'react'
import { Card, CardContent, CardHeader } from './ui/card'

export type Benefit = {
    icon: LucideIcon,
    title: string,
    description: string
}

export default function BenefitCard({
    icon: Icon,
    title,
    description
}: Benefit) {
  return (
    <Card>
        <CardHeader>
            <Icon size={32} className='text-orange-500' />
        </CardHeader>
        <CardContent>
            <h3 className='text-lg font-bold mb-2'>{title}</h3>
            <p className='text-gray-600'>{description}</p>
        </CardContent>
    </Card>
  )
}
