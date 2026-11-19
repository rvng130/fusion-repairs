import { useState } from 'react'
import { site } from '../site.config'
import { copy } from './CopyButton'
import { IconCheck, IconCopy } from './icons'

/** "Or email us at …" with the address spelled out and a small copy button, for when mailto buttons don't open anything. */
export function EmailLine({ center = false }: { center?: boolean }) {
  const [state, setState] = useState<'idle' | 'done'>('idle')
  if (!site.email) return null
  return (
    <p className={`email-line ${center ? 'center' : ''}`}>
      <span>Or email us at </span>
      <a href={`mailto:${site.email}`}>{site.email}</a>
      <button
        type="button"
        className="email-copy"
        onClick={async () => {
          if (await copy(site.email)) {
            setState('done')
            window.setTimeout(() => setState('idle'), 2000)
          }
        }}
      >
        {state === 'done' ? <IconCheck size={15} /> : <IconCopy size={15} />}
        <span>{state === 'done' ? 'Copied' : 'Copy'}</span>
        <span className="sr-only" role="status" aria-live="polite">
          {state === 'done' ? 'Email address copied' : ''}
        </span>
      </button>
    </p>
  )
}
