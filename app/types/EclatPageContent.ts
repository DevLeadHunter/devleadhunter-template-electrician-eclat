import type { SiteContent } from './SiteContent'
import type { SvgIconName } from './SvgIcon'

/** Contenu reçu : le contrat partagé, plus les données de la fiche Google que l'API joint au JSON. */
export type EclatSiteContentInput = SiteContent & {
  address?: string
  lat?: number | null
  lng?: number | null
  rating?: number | null
  reviewsCount?: number | null
}

/** Titre du haut de page, découpé autour du nom de la ville pour le mettre en couleur. */
export type EclatHeroTitle = {
  beforeCity: string
  city: string
  afterCity: string
}

export type EclatHero = {
  badge: string
  title: EclatHeroTitle
  lead: string
  quoteLabel: string
  points: string[]
  image: string
  fallbackImage: string
  secondaryImage: string
}

export type EclatGoogleRating = {
  value: string
  filledStars: number
  reviewsCount: string
}

export type EclatTrustItem = {
  value: string
  label: string
  icon: SvgIconName
}

export type EclatService = {
  number: string
  title: string
  description: string
  image: string
}

export type EclatFact = {
  label: string
  value: string
}

export type EclatStep = {
  number: string
  title: string
  description: string
}

export type EclatPhoto = {
  url: string
  alt: string
}

export type EclatReview = {
  author: string
  initials: string
  rating: number
  text: string
}

export type EclatQuestion = {
  question: string
  answer: string
}

export type EclatOpeningSlot = {
  day: string
  hours: string
}

export type EclatSocialLink = {
  network: string
  url: string
}

export type EclatMap = {
  embedUrl: string
  label: string
}

/** Nuances de la couleur d'accent, chacune lisible sur le fond où elle est posée. */
export type EclatAccentShades = {
  onNight: string
  largeText: string
  smallText: string
  soft: string
}

/** Contenu complet rendu par les sections : données du prospect fusionnées aux textes par défaut. */
export type EclatPageContent = {
  businessName: string
  logo: string
  city: string
  area: string
  phone: string
  phoneHref: string
  email: string
  address: string
  country: string
  googleRating: EclatGoogleRating | null
  hero: EclatHero
  trustItems: EclatTrustItem[]
  services: { heading: string; lead: string; items: EclatService[] }
  about: { heading: string; text: string; image: string; facts: EclatFact[] }
  method: { heading: string; steps: EclatStep[] }
  gallery: { heading: string; photos: EclatPhoto[] }
  reviews: { heading: string; items: EclatReview[] }
  faq: { heading: string; lead: string; questions: EclatQuestion[] }
  callBanner: { title: string; lead: string; image: string }
  contact: { heading: string; lead: string; openingHours: EclatOpeningSlot[]; map: EclatMap | null }
  footer: { tagline: string; licenseLine: string; social: EclatSocialLink[] }
  accent: EclatAccentShades
}
