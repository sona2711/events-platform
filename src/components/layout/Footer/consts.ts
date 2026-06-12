export const FOOTER_LINK_HREFS: Partial<Record<string, string>> = {
  'footer.groups.product.links.chat': '/schedule-assistant',
}

export const FOOTER_LINK_GROUPS = [
  {
    id: 'features',
    titleKey: 'footer.groups.features.title',
    linkKeys: [
      'footer.groups.features.links.blog',
      'footer.groups.features.links.about',
      'footer.groups.features.links.integrations',
      'footer.groups.features.links.crisisSupport',
    ],
  },
  {
    id: 'product',
    titleKey: 'footer.groups.product.title',
    linkKeys: [
      'footer.groups.product.links.pricing',
      'footer.groups.product.links.chat',
      'footer.groups.product.links.voiceAgents',
      'footer.groups.product.links.voiceDesign',
    ],
  },
  {
    id: 'company',
    titleKey: 'footer.groups.company.title',
    linkKeys: [
      'footer.groups.company.links.viewCatalog',
      'footer.groups.company.links.browseDatasets',
    ],
  },
  {
    id: 'resources',
    titleKey: 'footer.groups.resources.title',
    linkKeys: ['footer.groups.resources.links.privacy', 'footer.groups.resources.links.terms'],
  },
] as const

import facebookIcon from '@/assets/images/footer-social-facebook.png'
import instagramIcon from '@/assets/images/footer-social-instagram.png'
import linkedinIcon from '@/assets/images/footer-social-linkedin.png'

export const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com', iconSrc: linkedinIcon },
  { label: 'Instagram', href: 'https://www.instagram.com', iconSrc: instagramIcon },
  { label: 'Facebook', href: 'https://www.facebook.com', iconSrc: facebookIcon },
] as const
