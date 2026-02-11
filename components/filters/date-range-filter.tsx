'use client'

import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { id as idLocale } from 'date-fns/locale'
import { t } from '@/lib/translations'
import type { DateRange } from 'react-day-picker'

interface DateRangeFilterProps {
  start: Date | null
  end: Date | null
  onChange: (start: Date | null, end: Date | null) => void
}

export function DateRangeFilter({ start, end, onChange }: DateRangeFilterProps) {
  const [open, setOpen] = useState(false)

  const range: DateRange | undefined =
    start || end ? { from: start ?? undefined, to: end ?? undefined } : undefined

  const handleSelect = (selected: DateRange | undefined) => {
    onChange(selected?.from ?? null, selected?.to ?? null)
  }

  const displayText = start && end
    ? `${format(start, 'dd MMM yy', { locale: idLocale })} - ${format(end, 'dd MMM yy', { locale: idLocale })}`
    : start
      ? `${format(start, 'dd MMM yy', { locale: idLocale })} - ...`
      : t('Date Range')

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 min-w-[180px] justify-start text-xs font-normal"
        >
          <CalendarIcon className="mr-1.5 h-3 w-3 opacity-50" />
          <span className="truncate">{displayText}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={range}
          onSelect={handleSelect}
          numberOfMonths={2}
          locale={idLocale}
          defaultMonth={start ?? new Date(2019, 0)}
        />
      </PopoverContent>
    </Popover>
  )
}
