import { buildGoogleMapsEmbedUrl } from './utils'
import type { GoogleMapEmbedProps } from './types'
import styles from './styles.module.css'

export const GoogleMapEmbed = ({ lat, lng, title, placeName }: GoogleMapEmbedProps) => {
  const src = buildGoogleMapsEmbedUrl(lat, lng, placeName)

  return (
    <div className={styles.mapFrame}>
      <iframe
        key={src}
        title={title}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className={styles.map}
        allowFullScreen
      />
    </div>
  )
}
