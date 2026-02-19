import { useState } from 'react'
import styles from './Calendar.module.css'

type SelectionMode = 'single' | 'range'

interface CalendarProps {
  mode?: SelectionMode
  value?: Date | null
  rangeValue?: { start: Date | null; end: Date | null }
  onChange?: (date: Date) => void
  onRangeChange?: (range: { start: Date | null; end: Date | null }) => void
  disabledDates?: (date: Date) => boolean
  initialMonth?: Date
}

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function isInRange(date: Date, start: Date | null, end: Date | null) {
  if (!start || !end) return false
  const t = date.getTime()
  const s = start.getTime()
  const e = end.getTime()
  return t > Math.min(s, e) && t < Math.max(s, e)
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function buildWeeks(year: number, month: number): Date[][] {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const weeks: Date[][] = []
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())

  let current = new Date(startDate)
  while (current <= lastDay || weeks.length < 6) {
    const week: Date[] = []
    for (let i = 0; i < 7; i++) {
      week.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }
    weeks.push(week)
    if (weeks.length >= 6) break
  }
  return weeks
}

export function Calendar({
  mode = 'single',
  value = null,
  rangeValue = { start: null, end: null },
  onChange,
  onRangeChange,
  disabledDates,
  initialMonth,
}: CalendarProps) {
  const today = startOfDay(new Date())
  const [viewDate, setViewDate] = useState(() => {
    const base = initialMonth ?? value ?? rangeValue.start ?? new Date()
    return new Date(base.getFullYear(), base.getMonth(), 1)
  })

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const weeks = buildWeeks(year, month)

  const goToPrev = () => setViewDate(new Date(year, month - 1, 1))
  const goToNext = () => setViewDate(new Date(year, month + 1, 1))

  const handleDayClick = (date: Date) => {
    if (disabledDates?.(date)) return

    if (mode === 'single') {
      onChange?.(date)
      return
    }

    const { start, end } = rangeValue
    if (!start || (start && end)) {
      onRangeChange?.({ start: date, end: null })
    } else {
      const newStart = date < start ? date : start
      const newEnd = date < start ? start : date
      onRangeChange?.({ start: newStart, end: newEnd })
    }
  }

  const getDayClass = (date: Date): string => {
    const classes: string[] = [styles.day]
    const dayOfWeek = date.getDay()

    if (date.getMonth() !== month) {
      classes.push(styles.otherMonth)
      return classes.join(' ')
    }

    if (isSameDay(date, today)) classes.push(styles.today)

    if (dayOfWeek === 0) classes.push(styles.sunday)
    if (dayOfWeek === 6) classes.push(styles.saturday)

    if (disabledDates?.(date)) {
      classes.push(styles.disabled)
      return classes.join(' ')
    }

    if (mode === 'single' && value && isSameDay(date, value)) {
      classes.push(styles.selected)
    }

    if (mode === 'range') {
      const { start, end } = rangeValue
      if (start && isSameDay(date, start) && !end) classes.push(styles.selected)
      if (start && end) {
        if (isSameDay(date, start)) classes.push(styles.rangeStart)
        else if (isSameDay(date, end)) classes.push(styles.rangeEnd)
        else if (isInRange(date, start, end)) classes.push(styles.inRange)
      }
    }

    return classes.join(' ')
  }

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <button className={styles.navButton} onClick={goToPrev} aria-label="이전 달">
          <svg className={styles.navIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div className={styles.headerCenter}>
          <span className={styles.headerTitle}>
            {year}년 {month + 1}월
          </span>
        </div>
        <button className={styles.navButton} onClick={goToNext} aria-label="다음 달">
          <svg className={styles.navIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div className={styles.weekdays}>
        {WEEKDAYS.map((day, i) => (
          <div
            key={day}
            className={[
              styles.weekday,
              i === 0 ? styles.sunday : '',
              i === 6 ? styles.saturday : '',
            ].filter(Boolean).join(' ')}
          >
            {day}
          </div>
        ))}
      </div>

      <div className={styles.grid}>
        {weeks.map((week, wi) => (
          <div key={wi} className={styles.week}>
            {week.map((date, di) => (
              <button
                key={di}
                className={getDayClass(date)}
                onClick={() => handleDayClick(date)}
                aria-label={`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`}
                aria-pressed={
                  mode === 'single' && value ? isSameDay(date, value) : undefined
                }
                disabled={disabledDates?.(date) || date.getMonth() !== month}
              >
                {date.getDate()}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
