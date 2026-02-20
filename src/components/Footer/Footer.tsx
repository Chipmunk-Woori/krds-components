import { Fragment } from 'react'
import styles from './Footer.module.css'

export interface FooterRelatedSite {
  label: string
  href?: string
  onClick?: () => void
}

export interface FooterPhoneItem {
  label: string
  values: string[]
}

export interface FooterInfoItem {
  label: string
  value: string
}

export interface FooterLink {
  label: string
  href?: string
  onClick?: () => void
}

export type FooterSocialType = 'instagram' | 'youtube' | 'twitter' | 'facebook' | 'naverblog'

export interface FooterSocialLink {
  type: FooterSocialType
  href?: string
  onClick?: () => void
}

export interface FooterProps {
  logo?: React.ReactNode
  relatedSites?: FooterRelatedSite[]
  address?: string
  phones?: FooterPhoneItem[]
  infoItems?: FooterInfoItem[]
  utilityLinks?: FooterLink[]
  socialLinks?: FooterSocialLink[]
  policyLinks?: FooterLink[]
  copyright?: string
}

const SOCIAL_ICONS: Record<FooterSocialType, React.ReactNode> = {
  instagram: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  youtube: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
    </svg>
  ),
  twitter: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.26 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  facebook: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  naverblog: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 3H8C5.79 3 4 4.79 4 7v10c0 2.21 1.79 4 4 4h8c2.21 0 4-1.79 4-4V7c0-2.21-1.79-4-4-4zm-4.9 11.5H9.7V9.5h1.4v5zm5.2 0h-3.6V9.5h1.4v4h2.2v1.5z" />
    </svg>
  ),
}

function SocialButton({ link }: { link: FooterSocialLink }) {
  const icon = SOCIAL_ICONS[link.type]
  const label = link.type
  if (link.href) {
    return (
      <a href={link.href} className={styles.socialIcon} aria-label={label} onClick={link.onClick}>
        {icon}
      </a>
    )
  }
  return (
    <button type="button" className={styles.socialIcon} aria-label={label} onClick={link.onClick}>
      {icon}
    </button>
  )
}

function FooterLinkEl({ item, className }: { item: FooterLink; className: string }) {
  if (item.href) {
    return <a href={item.href} className={className} onClick={item.onClick}>{item.label}</a>
  }
  return <button type="button" className={className} onClick={item.onClick}>{item.label}</button>
}

export function Footer({
  logo,
  relatedSites = [],
  address,
  phones = [],
  infoItems = [],
  utilityLinks = [],
  socialLinks = [],
  policyLinks = [],
  copyright,
}: FooterProps) {
  const logoNode = logo ?? <div className={styles.logoPlaceholder}>로고</div>
  const hasGrid = address || phones.length > 0 || infoItems.length > 0 || utilityLinks.length > 0 || socialLinks.length > 0

  return (
    <footer className={styles.footer}>
      {relatedSites.length > 0 && (
        <div className={styles.relatedSiteBar}>
          <div className={styles.relatedSiteInner}>
            {relatedSites.map((site, i) => {
              const content = (
                <>
                  <span className={styles.relatedSiteLabel}>{site.label}</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className={styles.relatedSiteIcon}>
                    <line x1="10" y1="2.5" x2="10" y2="17.5" stroke="#33363d" strokeWidth="1.33" strokeLinecap="round" />
                    <line x1="2.5" y1="10" x2="17.5" y2="10" stroke="#33363d" strokeWidth="1.33" strokeLinecap="round" />
                  </svg>
                </>
              )
              return site.href ? (
                <a key={i} href={site.href} className={styles.relatedSiteItem} onClick={site.onClick}>{content}</a>
              ) : (
                <button key={i} type="button" className={styles.relatedSiteItem} onClick={site.onClick}>{content}</button>
              )
            })}
          </div>
        </div>
      )}

      <div className={styles.surface}>
        <div className={styles.inner}>
          <div className={styles.topArea}>
            <div className={styles.logoArea}>{logoNode}</div>

            {hasGrid && (
              <div className={styles.grid}>
                {(address || phones.length > 0) && (
                  <div className={styles.col1}>
                    {address && (
                      <p className={styles.addressText}>{address}</p>
                    )}
                    {phones.length > 0 && (
                      <div className={styles.phoneList}>
                        {phones.map((phone, i) => (
                          <div key={i} className={styles.phoneRow}>
                            <span className={styles.phoneLabel}>{phone.label}</span>
                            <div className={styles.phoneValues}>
                              {phone.values.map((v, j) => (
                                <Fragment key={j}>
                                  {j > 0 && <span className={styles.phoneDivider} aria-hidden="true" />}
                                  <span>{v}</span>
                                </Fragment>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {infoItems.length > 0 && (
                  <div className={styles.col2}>
                    {infoItems.map((item, i) => (
                      <div key={i} className={styles.infoItem}>
                        <span className={styles.infoLabel}>{item.label}</span>
                        <span className={styles.infoValue}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {(utilityLinks.length > 0 || socialLinks.length > 0) && (
                  <div className={styles.col3}>
                    {utilityLinks.length > 0 && (
                      <div className={styles.utilityLinks}>
                        {utilityLinks.map((link, i) => {
                          const content = (
                            <>
                              {link.label}
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#33363d" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <polyline points="9 18 15 12 9 6" />
                              </svg>
                            </>
                          )
                          return link.href ? (
                            <a key={i} href={link.href} className={styles.utilityLink} onClick={link.onClick}>{content}</a>
                          ) : (
                            <button key={i} type="button" className={styles.utilityLink} onClick={link.onClick}>{content}</button>
                          )
                        })}
                      </div>
                    )}
                    {socialLinks.length > 0 && (
                      <div className={styles.socialList}>
                        {socialLinks.map((link, i) => (
                          <SocialButton key={i} link={link} />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {(policyLinks.length > 0 || copyright) && (
            <div className={styles.copyrightRow}>
              {policyLinks.length > 0 && (
                <div className={styles.policyLinks}>
                  {policyLinks.map((link, i) => (
                    <FooterLinkEl key={i} item={link} className={styles.policyLink} />
                  ))}
                </div>
              )}
              {copyright && <span className={styles.copyrightText}>{copyright}</span>}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}
