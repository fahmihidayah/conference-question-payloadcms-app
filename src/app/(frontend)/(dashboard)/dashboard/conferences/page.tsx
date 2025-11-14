import { Suspense } from 'react'
import { ConferencesDataTable } from '@/features/conferences/components/conferences-data-table'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function ConferencesPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Conferences</h1>
        <Link href={"/dashboard/conferences/create"}>
          <Button>
            Create
          </Button>
        </Link>
      </div>
     <ConferencesDataTable />
    </div>
  )
}