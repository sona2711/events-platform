import { ExportOutlined } from '@ant-design/icons'
import { Flex, Typography } from 'antd'
import { GoogleMapEmbed } from '@/components/_shared/GoogleMapEmbed'
import { buildGoogleMapsDirectionsUrl } from '@/components/_shared/GoogleMapEmbed/utils'
import type { EventDetailLocationProps } from './types'
import styles from './styles.module.css'

export const EventDetailLocation = ({ location }: EventDetailLocationProps) => {
  const directionsUrl = buildGoogleMapsDirectionsUrl(location.lat, location.lng, location.name)

  return (
    <section className={styles.section} aria-labelledby="event-location-heading">
      <Typography.Title level={2} id="event-location-heading" className={styles.heading}>
        Location
      </Typography.Title>

      <div className={styles.mapCard}>
        <GoogleMapEmbed
          lat={location.lat}
          lng={location.lng}
          placeName={location.name}
          title={location.name}
        />

        <Flex vertical className={styles.details}>
          <Typography.Text strong className={styles.placeName}>
            {location.name}
          </Typography.Text>
          <Typography.Text className={styles.address}>{location.address}</Typography.Text>
          <Typography.Link
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.directionsLink}
          >
            Get Directions
            <ExportOutlined aria-hidden />
          </Typography.Link>
        </Flex>
      </div>
    </section>
  )
}
