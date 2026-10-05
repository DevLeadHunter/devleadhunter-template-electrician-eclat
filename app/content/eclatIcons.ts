import type { SvgIconName, SvgIconShape } from '../types/SvgIcon'

const CIRCLE_PATH: string = 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z'
const STAR_PATH: string =
  'm12 2.6 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3.1-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9L12 2.6Z'

/** Tracés des icônes de la template, dessinés sur une grille de 24 px. */
export const ECLAT_ICON_SHAPES: Record<SvgIconName, SvgIconShape> = {
  phone: {
    paths: [
      'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z',
    ],
    isFilled: false,
  },
  mail: {
    paths: [
      'M5.5 5h13A2.5 2.5 0 0 1 21 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 16.5v-9A2.5 2.5 0 0 1 5.5 5Z',
      'm3.5 7.5 8.5 6 8.5-6',
    ],
    isFilled: false,
  },
  pin: {
    paths: [
      'M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12Z',
      'M12 7.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z',
    ],
    isFilled: false,
  },
  area: {
    paths: [CIRCLE_PATH, 'M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z'],
    isFilled: false,
  },
  clock: { paths: [CIRCLE_PATH, 'M12 7.5V12l3 2'], isFilled: false },
  check: { paths: ['m5 12.5 4.5 4.5L19 7.5'], isFilled: false },
  zap: { paths: ['M13 2 4 14h7l-1 8 9-12h-7l1-8Z'], isFilled: false },
  shield: {
    paths: ['M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10Z', 'm9 12 2 2 4-4'],
    isFilled: false,
  },
  badge: { paths: [CIRCLE_PATH, 'm8.5 12.3 2.4 2.4 4.6-5'], isFilled: false },
  'quote-file': {
    paths: [
      'M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z',
      'M14 3v5h5',
      'M9 13h6',
      'M9 17h4',
    ],
    isFilled: false,
  },
  star: { paths: [STAR_PATH], isFilled: true },
  'star-outline': { paths: [STAR_PATH], isFilled: false },
  'chevron-down': { paths: ['m6 9 6 6 6-6'], isFilled: false },
  'chevron-left': { paths: ['m15 6-6 6 6 6'], isFilled: false },
  'chevron-right': { paths: ['m9 6 6 6-6 6'], isFilled: false },
  facebook: {
    paths: ['M15 3h-2a4 4 0 0 0-4 4v3H6v4h3v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h3V3Z'],
    isFilled: false,
  },
  instagram: {
    paths: [
      'M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3Z',
      'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z',
      'M17.2 6.8h.01',
    ],
    isFilled: false,
  },
  link: {
    paths: [
      'M10 13a5 5 0 0 0 7.1 0l3-3a5 5 0 0 0-7.1-7.1l-1 1',
      'M14 11a5 5 0 0 0-7.1 0l-3 3a5 5 0 0 0 7.1 7.1l1-1',
    ],
    isFilled: false,
  },
}
