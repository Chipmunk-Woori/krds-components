import { useState } from 'react'
import styles from './SideNavigation.module.css'

export interface SideNavSubItem {
  label: string
  href?: string
  onClick?: () => void
}

export interface SideNavSection {
  label: string
  items: SideNavSubItem[]
  defaultOpen?: boolean
}

export interface SideNavigationProps {
  title: string
  sections: SideNavSection[]
}

function ArrowDownIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 8L10 13L15 8" stroke="#33363D" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowUpIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 13L10 8L15 13" stroke="#33363D" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SubItem({ item }: { item: SideNavSubItem }) {
  const content = (
    <>
      <span className={styles.bullet} aria-hidden="true" />
      <span>{item.label}</span>
    </>
  )
  if (item.href) {
    return (
      <a href={item.href} className={styles.lastDepthItem} onClick={item.onClick}>
        {content}
      </a>
    )
  }
  return (
    <button type="button" className={styles.lastDepthItem} onClick={item.onClick}>
      {content}
    </button>
  )
}

export function SideNavigation({ title, sections }: SideNavigationProps) {
  const [openIndices, setOpenIndices] = useState<Set<number>>(
    () => new Set(sections.flatMap((s, i) => (s.defaultOpen ? [i] : [])))
  )

  const toggle = (i: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev)
      if (next.has(i)) {
        next.delete(i)
      } else {
        next.add(i)
      }
      return next
    })
  }

  return (
    <nav className={styles.nav} aria-label={title}>
      <div className={styles.title}>{title}</div>
      {sections.map((section, i) => {
        const isOpen = openIndices.has(i)
        return (
          <div key={i} className={styles.sectionWrapper}>
            <button
              type="button"
              className={isOpen ? styles.sectionHeaderOpen : styles.sectionHeader}
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
            >
              <span className={styles.sectionLabel}>{section.label}</span>
              {isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
            </button>
            {isOpen && section.items.length > 0 && (
              <div className={styles.openList}>
                {section.items.map((item, j) => (
                  <SubItem key={j} item={item} />
                ))}
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}
