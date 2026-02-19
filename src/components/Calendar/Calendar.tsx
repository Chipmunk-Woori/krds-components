import { useState, useRef, useEffect } from 'react'
import styles from './Calendar.module.css'

type SelectionMode = 'single' | 'range'
type DropdownType = 'year' | 'month'

interface CalendarProps {
  mode?: SelectionMode
  value?: Date | null
  rangeValue?: { start: Date | null; end: Date | null }
  onChange?: (date: Date) => void
  onRangeChange?: (range: { start: Date | null; end: Date | null }) => void
  disabledDates?: (date: Date) => boolean
  initialMonth?: Date
  showFooter?: boolean
  onCancel?: () => void
  onConfirm?: () => void
}

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']
const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

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
  showFooter = false,
  onCancel,
  onConfirm,
}: CalendarProps) {
  const today = startOfDay(new Date())
  const [viewDate, setViewDate] = useState(() => {
    const base = initialMonth ?? value ?? rangeValue.start ?? new Date()
    return new Date(base.getFullYear(), base.getMonth(), 1)
  })
  const [openDropdown, setOpenDropdown] = useState<DropdownType | null>(null)

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const weeks = buildWeeks(year, month)

  const headerRef = useRef<HTMLDivElement>(null)
  const activeYearRef = useRef<HTMLButtonElement>(null)
  const activeMonthRef = useRef<HTMLButtonElement>(null)

  const yearList = Array.from({ length: 21 }, (_, i) => year - 10 + i)

  // Close dropdown on outside click
  useEffect(() => {
    if (!openDropdown) return
    const handleClick = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [openDropdown])

  // Scroll active item into view when dropdown opens
  useEffect(() => {
    if (openDropdown === 'year') activeYearRef.current?.scrollIntoView({ block: 'center' })
    if (openDropdown === 'month') activeMonthRef.current?.scrollIntoView({ block: 'center' })
  }, [openDropdown])

  const toggleDropdown = (type: DropdownType) =>
    setOpenDropdown(prev => (prev === type ? null : type))

  const goToPrev = () => {
    setViewDate(new Date(year, month - 1, 1))
    setOpenDropdown(null)
  }
  const goToNext = () => {
    setViewDate(new Date(year, month + 1, 1))
    setOpenDropdown(null)
  }
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

  const getDayWrapperClass = (date: Date): string => {
    const classes: string[] = [styles.dayWrapper]

    if (date.getMonth() !== month || mode !== 'range') return classes.join(' ')

    const { start, end } = rangeValue
    if (!start || !end) return classes.join(' ')

    if (isSameDay(date, start) && isSameDay(date, end)) return classes.join(' ')

    if (isSameDay(date, start)) classes.push(styles.wrapperRangeStart)
    else if (isSameDay(date, end)) classes.push(styles.wrapperRangeEnd)
    else if (isInRange(date, start, end)) classes.push(styles.wrapperInRange)

    return classes.join(' ')
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

  const chevronClass = (type: DropdownType) =>
    [styles.chevron, openDropdown === type ? styles.chevronOpen : ''].filter(Boolean).join(' ')

  const dropdownItemClass = (active: boolean) =>
    [styles.dropdownItem, active ? styles.dropdownItemActive : ''].filter(Boolean).join(' ')

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <button className={styles.navButton} onClick={goToPrev} aria-label="이전 달">
          <svg className={styles.navIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className={styles.headerDate} ref={headerRef}>
          {/* Year dropdown */}
          <div className={styles.dropdownContainer}>
            <button
              className={styles.headerTitle}
              onClick={() => toggleDropdown('year')}
              aria-expanded={openDropdown === 'year'}
            >
              {year}년
              <svg className={chevronClass('year')} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {openDropdown === 'year' && (
              <div className={styles.dropdown}>
                {yearList.map(y => (
                  <button
                    key={y}
                    ref={y === year ? activeYearRef : undefined}
                    className={dropdownItemClass(y === year)}
                    onClick={() => { setViewDate(new Date(y, month, 1)); setOpenDropdown(null) }}
                  >
                    {y}년
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Month dropdown */}
          <div className={styles.dropdownContainer}>
            <button
              className={styles.headerTitle}
              onClick={() => toggleDropdown('month')}
              aria-expanded={openDropdown === 'month'}
            >
              {month + 1}월
              <svg className={chevronClass('month')} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {openDropdown === 'month' && (
              <div className={styles.dropdown}>
                {MONTHS.map(m => (
                  <button
                    key={m}
                    ref={m - 1 === month ? activeMonthRef : undefined}
                    className={dropdownItemClass(m - 1 === month)}
                    onClick={() => { setViewDate(new Date(year, m - 1, 1)); setOpenDropdown(null) }}
                  >
                    {m}월
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <button className={styles.navButton} onClick={goToNext} aria-label="다음 달">
          <svg className={styles.navIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div className={styles.daySection}>
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
                <div key={di} className={getDayWrapperClass(date)}>
                  <button
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
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {showFooter && (
        <div className={styles.footer}>
          <span className={styles.footerSelectedDate}>
            {mode === 'single' && value
              ? `${value.getFullYear()}. ${value.getMonth() + 1}. ${value.getDate()}`
              : mode === 'range' && rangeValue.start
                ? rangeValue.end
                  ? `${rangeValue.start.getFullYear()}. ${rangeValue.start.getMonth() + 1}. ${rangeValue.start.getDate()} ~ ${rangeValue.end.getFullYear()}. ${rangeValue.end.getMonth() + 1}. ${rangeValue.end.getDate()}`
                  : `${rangeValue.start.getFullYear()}. ${rangeValue.start.getMonth() + 1}. ${rangeValue.start.getDate()} ~`
                : ''}
          </span>
          <div className={styles.footerActions}>
            <button
              className={[styles.footerBtn, styles.footerBtnCancel].join(' ')}
              onClick={onCancel}
            >
              취소
            </button>
            <button
              className={[styles.footerBtn, styles.footerBtnConfirm].join(' ')}
              onClick={onConfirm}
            >
              선택
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
