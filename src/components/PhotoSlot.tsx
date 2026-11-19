import { site, type Photo } from '../site.config'

type Props = {
  photo: Photo
  /** Label shown inside an empty slot, e.g. "Photo of Andrew" */
  placeholder: string
  ratio?: string
  className?: string
  showCaption?: boolean
  priority?: boolean
}

/**
 * Shows a photo from site.config.ts, or a labeled empty box if the slot
 * isn't filled yet (hidden entirely when showPhotoPlaceholders is false).
 */
export function PhotoSlot({ photo, placeholder, ratio = '4 / 5', className = '', showCaption = true, priority }: Props) {
  if (!photo.src && !site.showPhotoPlaceholders) return null
  return (
    <figure className={`photo ${className}`}>
      <div className="photo-frame" style={{ aspectRatio: ratio }}>
        {photo.src ? (
          <img src={photo.src} alt={photo.alt} loading={priority ? 'eager' : 'lazy'} />
        ) : (
          <div className="photo-empty" role="img" aria-label={`Photo coming soon: ${placeholder}`}>
            <span>{placeholder}</span>
            {photo.caption && <small>{photo.caption}</small>}
          </div>
        )}
      </div>
      {showCaption && photo.src && photo.caption && <figcaption>{photo.caption}</figcaption>}
    </figure>
  )
}

/** Only the slots that should render (filled, or placeholders allowed). */
export function shownPhotos(list: Photo[]) {
  return list.filter((p) => p.src || site.showPhotoPlaceholders)
}
