export type SvgIconName =
  | 'phone'
  | 'mail'
  | 'pin'
  | 'area'
  | 'clock'
  | 'check'
  | 'zap'
  | 'shield'
  | 'badge'
  | 'quote-file'
  | 'star'
  | 'star-outline'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'facebook'
  | 'instagram'
  | 'link'

export type SvgIconProps = {
  name: SvgIconName
}

/** Tracé d'une icône : ses chemins SVG, pleins ou au trait. */
export type SvgIconShape = {
  paths: string[]
  isFilled: boolean
}
