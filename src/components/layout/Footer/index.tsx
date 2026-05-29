import { FacebookFilled, InstagramFilled, LinkedinFilled } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { FOOTER_LINK_GROUPS, SOCIAL_LINKS } from './consts'
import styles from './styles.module.css'

const SOCIAL_ICONS = [<LinkedinFilled />, <InstagramFilled />, <FacebookFilled />] as const

export function Footer() {
  const { t } = useTranslation('common')

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.top}>
          <p className={styles.brand}>{t('brand')}</p>

          {FOOTER_LINK_GROUPS.map((group) => (
            <section key={group.id} aria-labelledby={`footer-${group.id}`}>
              <h2 className={styles.groupTitle} id={`footer-${group.id}`}>
                {t(group.titleKey)}
              </h2>
              <ul className={styles.linkList}>
                {group.linkKeys.map((linkKey) => (
                  <li key={linkKey}>
                    <a className={styles.footerLink} href="/">
                      {t(linkKey)}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className={styles.divider} />

        <div className={styles.bottom}>
          <p className={styles.copyright}>{t('footer.copyright')}</p>
          <div className={styles.socialLinks}>
            {SOCIAL_LINKS.map((link, index) => (
              <a
                key={link.label}
                className={styles.socialLink}
                href={link.href}
                aria-label={link.label}
                target="_blank"
                rel="noreferrer"
              >
                {SOCIAL_ICONS[index]}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
