import { Divider, Flex, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { FOOTER_LINK_GROUPS, FOOTER_LINK_HREFS, SOCIAL_LINKS } from './consts'
import styles from './styles.module.css'

const { Title, Text, Paragraph } = Typography

export const Footer = () => {
  const { t } = useTranslation('common')

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.brandBlock}>
            <Title className={styles.brand} level={3}>
              {t('brand')}
            </Title>
            <Paragraph className={styles.tagline}>{t('footer.tagline')}</Paragraph>
          </div>

          <div className={styles.navSpacer} aria-hidden="true" />

          {FOOTER_LINK_GROUPS.map((group) => (
            <section key={group.id} aria-labelledby={`footer-${group.id}`}>
              <Title className={styles.groupTitle} id={`footer-${group.id}`} level={5}>
                {t(group.titleKey)}
              </Title>
              <ul className={styles.linkList}>
                {group.linkKeys.map((linkKey) => (
                  <li key={linkKey}>
                    <a className={styles.footerLink} href={FOOTER_LINK_HREFS[linkKey] ?? '/'}>
                      {t(linkKey)}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className={styles.bottomSection}>
          <Divider className={styles.divider} />

          <Flex
            className={styles.bottom}
            align="center"
            justify="space-between"
            wrap="wrap"
            gap={16}
          >
            <Text className={styles.copyright}>{t('footer.copyright')}</Text>
            <Flex className={styles.socialLinks} gap={12}>
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  className={styles.socialLink}
                  href={link.href}
                  aria-label={link.label}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img className={styles.socialIcon} src={link.iconSrc} alt="" />
                </a>
              ))}
            </Flex>
          </Flex>
        </div>
      </div>
    </footer>
  )
}
