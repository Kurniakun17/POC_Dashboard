'use client'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { ChevronDown } from 'lucide-react'
import { t } from '@/lib/translations'

interface MultiSelectFilterProps {
  label: string
  options: { id: number; label: string }[]
  selected: number[]
  onChange: (ids: number[]) => void
}

export function MultiSelectFilter({ label, options, selected, onChange }: MultiSelectFilterProps) {
  const toggleItem = (id: number) => {
    if (selected.includes(id)) {
      onChange(selected.filter((v) => v !== id))
    } else {
      onChange([...selected, id])
    }
  }

  const displayText = selected.length > 0
    ? `${selected.length} ${t('selected')}`
    : t(label)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 min-w-[140px] justify-between text-xs font-normal"
        >
          <span className="truncate">{displayText}</span>
          <ChevronDown className="ml-1 h-3 w-3 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-2" align="start">
        <div className="max-h-[240px] overflow-y-auto space-y-1">
          {options.map((opt) => (
            <label
              key={opt.id}
              className="flex items-center gap-2 rounded px-2 py-1.5 hover:bg-accent cursor-pointer"
            >
              <Checkbox
                checked={selected.includes(opt.id)}
                onCheckedChange={() => toggleItem(opt.id)}
              />
              <span className="text-sm truncate">{opt.label}</span>
            </label>
          ))}
          {options.length === 0 && (
            <p className="text-xs text-muted-foreground px-2 py-1">{t('No data available')}</p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
