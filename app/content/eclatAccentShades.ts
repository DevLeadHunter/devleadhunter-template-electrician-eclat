import type { EclatAccentShades } from '../types/EclatPageContent'
import { ECLAT_DEFAULT_ACCENT } from './eclatDefaults'

type RgbColor = [number, number, number]
type HslColor = [number, number, number]

const WHITE: RgbColor = [255, 255, 255]
const NIGHT: RgbColor = [11, 27, 46]
const HEX_COLOR: RegExp = /^#[0-9a-f]{6}$/i
const LARGE_TEXT_CONTRAST: number = 3
const SMALL_TEXT_CONTRAST: number = 4.5
const MINIMUM_TEXT_SATURATION: number = 0.82
const GREY_SATURATION_LIMIT: number = 0.08
const SOFT_TINT_WHITE_SHARE: number = 0.86

/**
 * Convertit une couleur `#rrggbb` en composantes rouge, vert, bleu.
 * @param hex - Couleur hexadécimale à six chiffres.
 * @returns Les trois composantes de 0 à 255.
 */
function toRgb(hex: string): RgbColor {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ]
}

/**
 * Convertit des composantes rouge, vert, bleu en `#rrggbb`.
 * @param color - Les trois composantes de 0 à 255.
 * @returns La couleur hexadécimale.
 */
function toHex(color: RgbColor): string {
  return `#${color
    .map((channel: number): string => Math.round(channel).toString(16).padStart(2, '0'))
    .join('')}`
}

/**
 * Mélange deux couleurs.
 * @param from - Couleur de départ.
 * @param to - Couleur vers laquelle on tend.
 * @param share - Part de la seconde couleur, de 0 à 1.
 * @returns La couleur mélangée.
 */
function mix(from: RgbColor, to: RgbColor, share: number): RgbColor {
  return [
    from[0] + (to[0] - from[0]) * share,
    from[1] + (to[1] - from[1]) * share,
    from[2] + (to[2] - from[2]) * share,
  ]
}

/**
 * Luminance relative d'une composante de couleur, au sens des règles d'accessibilité.
 * @param channel - Composante de 0 à 255.
 * @returns La luminance linéaire de la composante.
 */
function channelLuminance(channel: number): number {
  const value: number = channel / 255
  return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
}

/**
 * Rapport de contraste entre deux couleurs.
 * @param first - Première couleur.
 * @param second - Seconde couleur.
 * @returns Le rapport, de 1 (identiques) à 21 (noir sur blanc).
 */
function contrast(first: RgbColor, second: RgbColor): number {
  const [firstLuminance, secondLuminance]: number[] = [first, second].map(
    (color: RgbColor): number =>
      0.2126 * channelLuminance(color[0]) +
      0.7152 * channelLuminance(color[1]) +
      0.0722 * channelLuminance(color[2]),
  )
  const lighter: number = Math.max(firstLuminance ?? 0, secondLuminance ?? 0)
  const darker: number = Math.min(firstLuminance ?? 0, secondLuminance ?? 0)
  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Convertit une couleur en teinte, saturation, luminosité.
 * @param color - Les trois composantes de 0 à 255.
 * @returns La teinte en degrés, puis la saturation et la luminosité de 0 à 1.
 */
function toHsl(color: RgbColor): HslColor {
  const red: number = color[0] / 255
  const green: number = color[1] / 255
  const blue: number = color[2] / 255
  const highest: number = Math.max(red, green, blue)
  const lowest: number = Math.min(red, green, blue)
  const lightness: number = (highest + lowest) / 2
  if (highest === lowest) return [0, 0, lightness]
  const spread: number = highest - lowest
  const saturation: number = spread / (1 - Math.abs(2 * lightness - 1))
  let sextant: number = (red - green) / spread + 4
  if (highest === red) sextant = ((green - blue) / spread) % 6
  else if (highest === green) sextant = (blue - red) / spread + 2
  return [(sextant * 60 + 360) % 360, saturation, lightness]
}

/**
 * Convertit une teinte, saturation, luminosité en composantes rouge, vert, bleu.
 * @param color - La teinte en degrés, puis la saturation et la luminosité de 0 à 1.
 * @returns Les trois composantes de 0 à 255.
 */
function fromHsl(color: HslColor): RgbColor {
  const [hue, saturation, lightness]: HslColor = color
  const chroma: number = (1 - Math.abs(2 * lightness - 1)) * saturation
  const second: number = chroma * (1 - Math.abs(((hue / 60) % 2) - 1))
  const base: number = lightness - chroma / 2
  const sextants: RgbColor[] = [
    [chroma, second, 0],
    [second, chroma, 0],
    [0, chroma, second],
    [0, second, chroma],
    [second, 0, chroma],
    [chroma, 0, second],
  ]
  const [red, green, blue]: RgbColor = sextants[Math.floor(hue / 60) % 6] ?? [0, 0, 0]
  return [(red + base) * 255, (green + base) * 255, (blue + base) * 255]
}

/**
 * Éclaircit la couleur jusqu'à ce qu'elle se lise sur le fond bleu nuit.
 * @param color - Couleur de départ.
 * @returns La couleur en `#rrggbb`.
 */
function lightenUntilReadableOnNight(color: RgbColor): string {
  let shade: RgbColor = color
  for (let step: number = 0; step < 20 && contrast(shade, NIGHT) < SMALL_TEXT_CONTRAST; step += 1) {
    shade = mix(shade, WHITE, 0.08)
  }
  return toHex(shade)
}

/**
 * Fonce la couleur sans la ternir, jusqu'à ce qu'un texte de cette couleur se lise sur du blanc.
 * @param color - Couleur de départ.
 * @param minimumContrast - Rapport de contraste à atteindre.
 * @returns La couleur en `#rrggbb`.
 */
function darkenUntilReadableOnWhite(color: RgbColor, minimumContrast: number): string {
  const [hue, saturation, lightness]: HslColor = toHsl(color)
  const vividSaturation: number =
    saturation > GREY_SATURATION_LIMIT ? Math.max(saturation, MINIMUM_TEXT_SATURATION) : saturation
  let shadeLightness: number = Math.min(lightness, 0.5)
  let shade: RgbColor = fromHsl([hue, vividSaturation, shadeLightness])
  while (contrast(shade, WHITE) < minimumContrast && shadeLightness > 0.1) {
    shadeLightness -= 0.015
    shade = fromHsl([hue, vividSaturation, shadeLightness])
  }
  return toHex(shade)
}

/**
 * Dérive de la couleur de marque du prospect les nuances lisibles sur chaque fond de la template.
 * @param brandColor - Couleur de marque en `#rrggbb` ; toute autre valeur donne l'ambre par défaut.
 * @returns Les nuances pour le fond bleu nuit, les titres, les petits textes et les fonds pâles.
 */
export function eclatAccentShades(brandColor: string | undefined): EclatAccentShades {
  const color: RgbColor = toRgb(
    brandColor && HEX_COLOR.test(brandColor.trim()) ? brandColor.trim() : ECLAT_DEFAULT_ACCENT,
  )
  return {
    onNight: lightenUntilReadableOnNight(color),
    largeText: darkenUntilReadableOnWhite(color, LARGE_TEXT_CONTRAST),
    smallText: darkenUntilReadableOnWhite(color, SMALL_TEXT_CONTRAST),
    soft: toHex(mix(color, WHITE, SOFT_TINT_WHITE_SHARE)),
  }
}
