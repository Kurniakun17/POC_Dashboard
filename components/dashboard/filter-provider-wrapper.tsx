'use client'

import { FilterProvider } from '@/lib/filter-context'

export function FilterProviderWrapper({ children }: { children: React.ReactNode }) {
  return <FilterProvider>{children}</FilterProvider>
}
