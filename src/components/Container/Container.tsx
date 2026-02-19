import styles from './Container.module.css'

type ContainerSize = 'small' | 'medium' | 'large'

interface ContainerProps {
  size?: ContainerSize
  imageSrc?: string
  imageAlt?: string
  badge?: string
  title: string
  description?: string
  linkLabel?: string
  onLinkClick?: () => void
}

export function Container({
  size = 'medium',
  imageSrc,
  imageAlt = '',
  badge,
  title,
  description,
  linkLabel = '바로가기',
  onLinkClick,
}: ContainerProps) {
  return (
    <div className={[styles.container, styles[size]].join(' ')}>
      {imageSrc ? (
        <img src={imageSrc} alt={imageAlt} className={styles.image} />
      ) : (
        <div className={styles.imagePlaceholder} aria-hidden="true" />
      )}

      {badge && (
        <div className={styles.topRow}>
          <span className={styles.badge}>{badge}</span>
        </div>
      )}

      <div className={styles.cardTitle}>
        <p className={[styles.title, size === 'large' ? styles.titleLarge : ''].filter(Boolean).join(' ')}>
          {title}
        </p>
        {description && (
          <p className={styles.description}>{description}</p>
        )}
      </div>

      {onLinkClick && (
        <button className={styles.link} onClick={onLinkClick}>
          {linkLabel}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}
    </div>
  )
}
