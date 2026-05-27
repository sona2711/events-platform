import { FacebookFilled, InstagramFilled, LinkedinFilled } from '@ant-design/icons'
import { FOOTER_LINK_GROUPS, SOCIAL_LINKS } from './consts'
import styles from './styles.module.css'

const SOCIAL_ICONS = [<LinkedinFilled />, <InstagramFilled />, <FacebookFilled />] as const

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.top}>
          <p className={styles.brand}>Yerevan Pulsar</p>

          {FOOTER_LINK_GROUPS.map((group) => (
            <section key={group.title} aria-labelledby={`footer-${group.title.toLowerCase()}`}>
              <h2 className={styles.groupTitle} id={`footer-${group.title.toLowerCase()}`}>
                {group.title}
              </h2>
              <ul className={styles.linkList}>
                {group.links.map((link) => (
                  <li key={link}>
                    <a className={styles.footerLink} href="/">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className={styles.divider} />

        <div className={styles.bottom}>
          <p className={styles.copyright}>Copyright © 2026. All rights reserved.</p>
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
