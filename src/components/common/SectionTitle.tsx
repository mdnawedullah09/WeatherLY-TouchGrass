import { Heading } from './Heading'

type SectionTitleProps = { eyebrow: string; title: string; copy?: string; align?: 'left' | 'center' }

export function SectionTitle({ eyebrow, title, copy, align = 'left' }: SectionTitleProps) {
  return <Heading eyebrow={eyebrow} title={title} copy={copy} align={align} />
}
