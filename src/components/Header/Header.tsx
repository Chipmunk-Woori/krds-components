import { Fragment, useState, useRef, useEffect } from 'react'
import styles from './Header.module.css'

export interface NavItem {
  label: string
  href?: string
  onClick?: () => void
}

export interface DropdownItem {
  label: string
  href?: string
  onClick?: () => void
}

export interface UtilityItem {
  label: string
  href?: string
  onClick?: () => void
  dropdownItems?: DropdownItem[]
}

export interface HeaderProps {
  variant?: 'union' | 'horizontal'
  logo?: React.ReactNode
  showSlogan?: boolean
  officialNotice?: string
  utilityItems?: UtilityItem[]
  navItems?: NavItem[]
  headerMenuItems?: NavItem[]
}


function NavLink({ item, className }: { item: NavItem; className: string }) {
  if (item.href) {
    return (
      <a href={item.href} className={className} onClick={item.onClick}>
        {item.label}
      </a>
    )
  }
  return (
    <button type="button" className={className} onClick={item.onClick}>
      {item.label}
    </button>
  )
}

function UtilityLink({
  item,
  isOpen,
  onToggle,
}: {
  item: UtilityItem
  isOpen: boolean
  onToggle: () => void
}) {
  const hasDropdown = (item.dropdownItems?.length ?? 0) > 0

  const handleClick = () => {
    if (hasDropdown) {
      onToggle()
    } else {
      item.onClick?.()
    }
  }

  const chevron = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={hasDropdown
        ? { transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.15s ease' }
        : undefined
      }
    >
      {hasDropdown
        ? <polyline points="6 9 12 15 18 9" />
        : <polyline points="9 18 15 12 9 6" />
      }
    </svg>
  )

  return (
    <div className={styles.utilityLinkWrapper}>
      {item.href && !hasDropdown ? (
        <a href={item.href} className={styles.utilityItem} onClick={item.onClick}>
          {item.label}
          {chevron}
        </a>
      ) : (
        <button
          type="button"
          className={styles.utilityItem}
          onClick={handleClick}
          aria-expanded={hasDropdown ? isOpen : undefined}
        >
          {item.label}
          {chevron}
        </button>
      )}
      {hasDropdown && isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownArrow} />
          <div className={styles.dropdownBox}>
            {item.dropdownItems!.map((di, j) =>
              di.href ? (
                <a key={j} href={di.href} className={styles.dropdownItem} onClick={di.onClick}>
                  {di.label}
                </a>
              ) : (
                <button key={j} type="button" className={styles.dropdownItem} onClick={di.onClick}>
                  {di.label}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function UtilityBar({ items }: { items: UtilityItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setOpenIndex(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={styles.utilityBar} ref={barRef}>
      {items.map((item, i) => (
        <Fragment key={i}>
          {i > 0 && <span className={styles.utilityDivider} aria-hidden="true" />}
          <UtilityLink
            item={item}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        </Fragment>
      ))}
    </div>
  )
}

export function Header({
  variant = 'union',
  logo,
  showSlogan = true,
  officialNotice,
  utilityItems = [],
  navItems = [],
  headerMenuItems = [],
}: HeaderProps) {
  const logoNode = logo ?? <div className={styles.logoPlaceholder}>로고</div>

  if (variant === 'union') {
    return (
      <header className={[styles.header, styles.union].join(' ')}>
        <div className={styles.inner}>
          {utilityItems.length > 0 && <UtilityBar items={utilityItems} />}
          <div className={styles.mainRow}>
            <div className={styles.logoArea}>
              {logoNode}
              {showSlogan && <div className={styles.sloganPlaceholder}>슬로건</div>}
            </div>
            {navItems.length > 0 && (
              <nav className={styles.navItems}>
                {navItems.map((item, i) => (
                  <NavLink key={i} item={item} className={styles.navItem} />
                ))}
              </nav>
            )}
          </div>
        </div>
      </header>
    )
  }

  // horizontal
  return (
    <header className={[styles.header, styles.horizontal].join(' ')}>
      {officialNotice && (
        <div className={styles.masthead}>
          <div className={styles.mastheadInner}>
            <svg className={styles.flagIcon} viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="2" y="5" width="20" height="14" rx="1" fill="#003964" />
              <rect x="2" y="5" width="20" height="7" rx="1" fill="#D63D4A" />
            </svg>
            <span>{officialNotice}</span>
          </div>
        </div>
      )}

      <div className={styles.headerBody}>
        <div className={styles.inner}>
          {utilityItems.length > 0 && <UtilityBar items={utilityItems} />}
          <div className={styles.mainRow}>
            <div className={styles.logoArea}>{logoNode}</div>
            {headerMenuItems.length > 0 && (
              <nav className={styles.headerMenuItems}>
                {headerMenuItems.map((item, i) => (
                  <NavLink key={i} item={item} className={styles.headerMenuItem} />
                ))}
              </nav>
            )}
          </div>
        </div>
      </div>

      {navItems.length > 0 && (
        <div className={styles.menuBar}>
          <div className={styles.menuBarInner}>
            {navItems.map((item, i) => (
              <NavLink key={i} item={item} className={styles.menuBarNavItem} />
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
