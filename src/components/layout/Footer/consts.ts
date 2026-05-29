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
      'footer.groups.company.links.requestDataset',
    ],
  },
  {
    id: 'resources',
    titleKey: 'footer.groups.resources.title',
    linkKeys: ['footer.groups.resources.links.privacy', 'footer.groups.resources.links.terms'],
  },
] as const

export const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com' },
  { label: 'Instagram', href: 'https://www.instagram.com' },
  { label: 'Facebook', href: 'https://www.facebook.com' },
] as const
