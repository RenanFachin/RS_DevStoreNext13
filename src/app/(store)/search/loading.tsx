'use client'

import { Skeleton } from '@/components/skeleton'
import { CurrentSearch } from './current-search'
import { Suspense } from 'react'

// Nas páginas de loading não tem como acessar os parâmetro de busca, por isso vamos precisar transformar em um client component

export default function SearchLoading() {
  return (
    <div className="flex flex-col gap-4">
      <Suspense>
        <CurrentSearch />
      </Suspense>

      <div className="grid grid-cols-3 gap-6">
        <Skeleton className="h-[380px]" />
        <Skeleton className="h-[380px]" />
        <Skeleton className="h-[380px]" />
        <Skeleton className="h-[380px]" />
        <Skeleton className="h-[380px]" />
        <Skeleton className="h-[380px]" />
      </div>
    </div>
  )
}
