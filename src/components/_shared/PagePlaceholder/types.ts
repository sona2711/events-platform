export type PagePlaceholderProps =
  | {
      namespace?: string
      eyebrowKey?: string
      titleKey: string
      descriptionKey: string
    }
  | {
      eyebrow?: string
      title: string
      description: string
    }
