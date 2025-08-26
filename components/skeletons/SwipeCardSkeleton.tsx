import React from 'react'
import { Skeleton } from '../ui/skeleton'

export default function SwipeCardSkeleton() {
    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <Skeleton className="relative h-64">
                <div className="absolute flex top-3 right-3 bg-white/90 px-2 py-1 rounded-full text-xs font-semibold">
                    <Skeleton/> ★
                </div>
            </Skeleton>
            <div className="p-4 space-y-3">
                <Skeleton className="h-8 w-24"/>
                <Skeleton className="h-4 w-3/4"/>
            </div>
        </div>
    )
}
