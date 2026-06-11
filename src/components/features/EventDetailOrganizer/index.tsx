import { useState } from 'react'
import { Button, Flex, Typography } from 'antd'
import { showSystemMessage } from '@/providers/notifications/utils'
import { getFollowSuccessMessage, getUnfollowSuccessMessage } from './consts'
import type { EventDetailOrganizerProps } from './types'
import styles from './styles.module.css'

export const EventDetailOrganizer = ({ organizer, eventTitle }: EventDetailOrganizerProps) => {
  const [isFollowing, setIsFollowing] = useState(false)

  const handleFollowToggle = () => {
    if (isFollowing) {
      setIsFollowing(false)
      showSystemMessage({
        content: getUnfollowSuccessMessage(eventTitle),
        variant: 'info',
      })
      return
    }

    setIsFollowing(true)
    showSystemMessage({
      content: getFollowSuccessMessage(eventTitle),
      variant: 'success',
    })
  }

  return (
    <section className={styles.section} aria-labelledby="event-organizer-heading">
      <Typography.Text className={styles.label}>Organized by</Typography.Text>
      <Flex align="center" justify="space-between" gap={16}>
        <Typography.Title level={2} id="event-organizer-heading" className={styles.name}>
          {organizer}
        </Typography.Title>
        <Button
          type="default"
          className={isFollowing ? styles.unfollowButton : styles.followButton}
          onClick={handleFollowToggle}
          aria-pressed={isFollowing}
        >
          {isFollowing ? 'Unfollow' : 'Follow'}
        </Button>
      </Flex>
    </section>
  )
}
