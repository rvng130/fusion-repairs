import { site } from '../site.config'

/** Pulls the 11-character video id out of any common YouTube link. */
export function youtubeId(url: string): string | null {
  const u = url.trim()
  if (!u) return null
  const m =
    u.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/) ??
    u.match(/^([A-Za-z0-9_-]{11})$/)
  return m ? m[1] : null
}

/** "Watch us build a PC" section. Uses youtube-nocookie.com so no tracking cookies until someone presses play. */
export function YouTubeSection() {
  const { url, title, description } = site.youtube
  const id = youtubeId(url)
  if (url && !id) console.warn(`[Fusion Repair] Couldn't read a YouTube video id from "${url}".`)
  if (!id && !site.showPhotoPlaceholders) return null
  return (
    <section className="section" aria-labelledby="yt-title">
      <div className="wrap">
        <div className="section-head">
          <div>
            <h2 id="yt-title">{title}</h2>
            {description && <p className="muted yt-desc">{description}</p>}
          </div>
        </div>
        <div className="yt-frame">
          {id ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${id}?rel=0`}
              title={title}
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <div className="photo-empty" role="img" aria-label="YouTube video coming soon">
              <span>YouTube video goes here</span>
              <small>Paste the link in site.config.ts → youtube.url</small>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
