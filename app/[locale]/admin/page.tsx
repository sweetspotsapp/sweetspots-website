import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/DataTable'
import React from 'react'

export default function AdminPage() {
    const mockTable = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 3, name: 'Alice Johnson', email: 'alice@example.com' },
    ]
  return (
    <div className='container mx-auto p-4'>
        <Button>Add New Place</Button>
        <DataTable items={mockTable} />
    </div>
  )
}
