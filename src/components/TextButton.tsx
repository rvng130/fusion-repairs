import { createContext, useContext, useRef, useState, type ReactNode } from 'react'
import { site } from '../site.config'
import { mailtoHref } from '../lib/sms'
import { IconMail } from './icons'
import { CopyButton } from './CopyButton'

type Variant = 'primary' | 'secondary' | 'ghost'

type Props = {
  message: string
  /** Email subject line */
  subject?: string
  children?: ReactNode
  variant?: Variant
  lang?: string
  className?: string
  /** Extra label for screen readers, e.g. which service */
  ariaLabel?: string
}

/**
 * The site's main call to action. Opens the visitor's email app with a
 * subject line and prefilled draft addressed to site.email.
 * If no email is configured, it opens a preview dialog instead.
 */
export function TextButton({
  message,
  subject = site.subjects.default,
  children = 'Email Us to Book',
  variant = 'primary',
  lang,
  className = '',
  ariaLabel,
}: Props) {
  const href = mailtoHref(subject, message)
  const preview = usePreview()
  const cls = `btn btn-${variant} ${className}`
  const content = (
    <>
      <IconMail size={18} />
      <span>{children}</span>
    </>
  )
  if (href) {
    return (
      <a className={cls} href={href} lang={lang} aria-label={ariaLabel} data-mail-subject={subject} data-mail-body={message}>
        {content}
      </a>
    )
  }
  return (
    <button
      type="button"
      className={cls}
      lang={lang}
      aria-label={ariaLabel}
      data-mail-subject={subject}
      data-mail-body={message}
      onClick={() => preview(message)}
    >
      {content}
    </button>
  )
}

/* ---------- Preview dialog (shown only while no email is configured) ---------- */

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
          <h2 id="preview-title">The booking email isn't set up yet</h2>
          <p className="muted">
            Once it's added in <code>src/site.config.ts</code>, this button opens an email with this draft:
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
