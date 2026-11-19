import { useState } from 'react'
import { IconCheck, IconCopy } from './icons'

async function copy(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Fallback for older browsers / non-secure contexts
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    let ok = false
    try {
      ok = document.execCommand('copy')
    } catch {
      ok = false
    }
    ta.remove()
    return ok
  }
}

export function CopyButton({ text, label, lang }: { text: string; label: string; lang?: string }) {
  const [state, setState] = useState<'idle' | 'done' | 'fail'>('idle')
  return (
    <button
      type="button"
      className="btn btn-secondary"
      lang={lang}
      onClick={async () => {
        setState((await copy(text)) ? 'done' : 'fail')
        window.setTimeout(() => setState('idle'), 2200)
      }}
    >
      {state === 'done' ? <IconCheck size={18} /> : <IconCopy size={18} />}
      <span>{state === 'done' ? 'Copied' : state === 'fail' ? 'Copy failed' : label}</span>
      <span className="sr-only" role="status" aria-live="polite">
        {state === 'done' ? 'Copied to clipboard' : state === 'fail' ? 'Could not copy' : ''}
      </span>
    </button>
  )
}
