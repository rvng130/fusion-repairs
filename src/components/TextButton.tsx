import { createContext, useContext, useRef, useState, type ReactNode } from 'react'
import { smsHref } from '../lib/sms'
import { IconText } from './icons'
import { CopyButton } from './CopyButton'

type Variant = 'primary' | 'secondary' | 'ghost'

type Props = {
  message: string
  children?: ReactNode
  variant?: Variant
  lang?: string
  className?: string
  /** Extra label for screen readers, e.g. which service */
  ariaLabel?: string
}

/**
 * The site's main call to action. Opens the Messages app with a prefilled draft.
 * If no business number is set, it opens a preview dialog instead (never a fake number).
 */
export function TextButton({ message, children = 'Text Us to Book', variant = 'primary', lang, className = '', ariaLabel }: Props) {
  const href = smsHref(message)
  const preview = usePreview()
  const cls = `btn btn-${variant} ${className}`
  const content = (
    <>
      <IconText size={18} />
      <span>{children}</span>
    </>
  )
  if (href) {
    return (
      <a className={cls} href={href} lang={lang} aria-label={ariaLabel} data-sms-body={message}>
        {content}
      </a>
    )
  }
  return (
    <button type="button" className={cls} lang={lang} aria-label={ariaLabel} data-sms-body={message} onClick={() => preview(message)}>
      {content}
    </button>
  )
}

/* ---------- Preview dialog (shown only while no number is configured) ---------- */

const PreviewCtx = createContext<(msg: string) => void>(() => {})
const usePreview = () => useContext(PreviewCtx)

export function PreviewProvider({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null)
  const [msg, setMsg] = useState('')
  const open = (m: string) => {
    setMsg(m)
    ref.current?.showModal()
  }
  return (
    <PreviewCtx.Provider value={open}>
      {children}
      <dialog
        ref={ref}
        className="dialog"
        aria-labelledby="preview-title"
        onClick={(e) => {
          if (e.target === ref.current) ref.current?.close()
        }}
      >
        <div className="dialog-inner">
          <p className="eyebrow">Preview only</p>
          <h2 id="preview-title">The business number isn't set up yet</h2>
          <p className="muted">
            Once it's added in <code>src/site.config.ts</code>, this button opens the Messages app with this draft:
          </p>
          <blockquote className="draft">{msg}</blockquote>
          <div className="row">
            <CopyButton text={msg} label="Copy message" />
            <button type="button" className="btn btn-secondary" onClick={() => ref.current?.close()}>
              Close
            </button>
          </div>
        </div>
      </dialog>
    </PreviewCtx.Provider>
  )
}
