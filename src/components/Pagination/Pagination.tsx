import { useState, useEffect } from 'react'
import styles from './Pagination.module.css'

export interface PaginationProps {
  currentPage: number
  totalPages: number
  onChange: (page: number) => void
  showPageInput?: boolean
}

function range(from: number, to: number): number[] {
  return Array.from({ length: to - from + 1 }, (_, i) => from + i)
}

function getPageItems(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 10) return range(1, total)
  if (current <= 5) return [...range(1, 8), 'ellipsis', total]
  if (current >= total - 4) return [1, 'ellipsis', ...range(total - 7, total)]
  return [1, 'ellipsis', ...range(current - 2, current + 2), 'ellipsis', total]
}

function ArrowLeftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M12.5 4L5.5 10L12.5 16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M7.5 4L14.5 10L7.5 16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function EllipsisIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="10.6" width="2.8" height="2.8" rx="1.4" fill="currentColor" />
      <rect x="10.6" y="10.6" width="2.8" height="2.8" rx="1.4" fill="currentColor" />
      <rect x="17.2" y="10.6" width="2.8" height="2.8" rx="1.4" fill="currentColor" />
    </svg>
  )
}

export function Pagination({
  currentPage,
  totalPages,
  onChange,
  showPageInput = true,
}: PaginationProps) {
  const [inputValue, setInputValue] = useState(String(currentPage))

  useEffect(() => {
    setInputValue(String(currentPage))
  }, [currentPage])

  const prevDisabled = currentPage <= 1
  const nextDisabled = currentPage >= totalPages
  const pageItems = getPageItems(currentPage, totalPages)

  const handleGo = () => {
    const n = parseInt(inputValue, 10)
    if (!isNaN(n) && n >= 1 && n <= totalPages) {
      onChange(n)
    } else {
      setInputValue(String(currentPage))
    }
  }

  return (
    <div className={styles.pagination}>
      <div className={styles.numberRow}>
        <button
          type="button"
          className={`${styles.prevBtn} ${prevDisabled ? styles.navDisabled : styles.navEnabled}`}
          onClick={() => onChange(currentPage - 1)}
          disabled={prevDisabled}
          aria-label="이전 페이지"
        >
          <ArrowLeftIcon />
          <span>이전</span>
        </button>

        {pageItems.map((item, i) => {
          if (item === 'ellipsis') {
            return (
              <span key={`ellipsis-${i}`} className={styles.ellipsisBtn} aria-hidden="true">
                <EllipsisIcon />
              </span>
            )
          }
          const isActive = item === currentPage
          return (
            <button
              key={item}
              type="button"
              className={`${styles.numberBtn} ${isActive ? styles.numberActive : styles.numberInactive}`}
              onClick={() => onChange(item)}
              aria-label={`${item}페이지`}
              aria-current={isActive ? 'page' : undefined}
            >
              {item}
            </button>
          )
        })}

        <button
          type="button"
          className={`${styles.nextBtn} ${nextDisabled ? styles.navDisabled : styles.navEnabled}`}
          onClick={() => onChange(currentPage + 1)}
          disabled={nextDisabled}
          aria-label="다음 페이지"
        >
          <span>다음</span>
          <ArrowRightIcon />
        </button>
      </div>

      {showPageInput && (
        <div className={styles.inputRow}>
          <div className={styles.form}>
            <input
              type="text"
              inputMode="numeric"
              className={styles.pageInput}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value.replace(/[^0-9]/g, ''))}
              onKeyDown={(e) => e.key === 'Enter' && handleGo()}
              aria-label="페이지 번호 입력"
            />
            <span className={styles.totalPages}>/{totalPages}</span>
          </div>
          <button type="button" className={styles.goBtn} onClick={handleGo}>
            이동
          </button>
        </div>
      )}
    </div>
  )
}
