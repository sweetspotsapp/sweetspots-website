'use client';

import React from 'react'
import { Button } from '../ui/button'

export default function TryTheAlphaButton() {
  return (
    <Button
      size="lg"
      variant="outline"
      onClick={() => window.open("https://app.sweetspotsapp.com", "_blank")}
    >
      Try the Alpha
    </Button>
  )
}
