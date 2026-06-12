import { Flex, Tag, Typography } from 'antd'
import { formatEventTagLabel } from './utils'
import type { EventDetailTagsProps } from './types'
import styles from './styles.module.css'

export const EventDetailTags = ({ tags }: EventDetailTagsProps) => {
  if (tags.length === 0) return null

  return (
    <section className={styles.section} aria-labelledby="event-tags-heading">
      <Typography.Title level={2} id="event-tags-heading" className={styles.heading}>
        Tags
      </Typography.Title>
      <Flex wrap gap={12}>
        {tags.map((tag) => (
          <Tag key={tag} className={styles.tag}>
            {formatEventTagLabel(tag)}
          </Tag>
        ))}
      </Flex>
    </section>
  )
}
