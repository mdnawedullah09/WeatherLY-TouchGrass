import type { ReactNode } from 'react'

type HeadingProps = { eyebrow?: string; title: ReactNode; copy?: ReactNode; align?: 'left' | 'center' }

export function Heading({ eyebrow, title, copy, align = 'left' }: HeadingProps) {
  return <div className={`heading section-title heading-${align}`}>{eyebrow && <span className="heading-eyebrow text-emerald-600 font-medium">{eyebrow}</span>}<h2 className="text-slate-900">{title}</h2>{copy && <p className="!text-slate-500 !text-base sm:!text-lg !leading-relaxed !max-w-[85%] mt-3">{copy}</p>}</div>
}
