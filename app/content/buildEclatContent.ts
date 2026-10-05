import type {
  EclatFact,
  EclatGoogleRating,
  EclatHeroTitle,
  EclatMap,
  EclatOpeningSlot,
  EclatPageContent,
  EclatPhoto,
  EclatQuestion,
  EclatReview,
  EclatService,
  EclatSiteContentInput,
  EclatSocialLink,
  EclatStep,
  EclatTrustItem,
} from '../types/EclatPageContent'
import type {
  SiteContentFaqItem,
  SiteContentGalleryImage,
  SiteContentOpeningHours,
  SiteContentReview,
  SiteContentService,
  SiteContentSocialLink,
  SiteContentStep,
  SiteContentTrustItem,
} from '../types/SiteContent'
import type { SvgIconName } from '../types/SvgIcon'
import { professionalLicenseLine } from '@devleadhunter/website-content'
import { eclatAccentShades } from './eclatAccentShades'
import {
  ECLAT_DEFAULT_COPY,
  ECLAT_DEFAULT_IMAGES,
  ECLAT_DEFAULT_QUESTIONS,
  ECLAT_DEFAULT_SERVICES,
  ECLAT_DEFAULT_STEPS,
  ECLAT_DEFAULT_TRUST_ITEMS,
  ECLAT_MINIMUM_DISPLAYED_RATING,
} from './eclatDefaults'
import {
  authorInitials,
  contractCityPreposition,
  firstFilled,
  formatRating,
  glueShortWords,
  glueTrailingSpace,
  phoneHref,
  withoutLeadingArticle,
} from './eclatText'

type TrustItemText = { value: string; label: string }

const MAXIMUM_TRUST_ITEMS: number = 4
const MAXIMUM_SERVICES: number = 6
const MAXIMUM_REVIEWS: number = 6
const STREET_LEVEL_MAP_ZOOM: number = 14
const AREA_LEVEL_MAP_ZOOM: number = 11
const RATING_VALUE: RegExp = /^\d(?:[.,]\d)?\s*\/\s*5$/

/**
 * Découpe le titre du haut de page autour du nom de la ville, pour le colorer.
 * @param content - Contenu du prospect.
 * @param city - Ville du prospect, ou une chaîne vide.
 * @returns Le titre en trois morceaux ; sans ville reconnue, tout est dans le premier.
 */
function buildHeroTitle(content: EclatSiteContentInput, city: string): EclatHeroTitle {
  const defaultTitle: string = city
    ? contractCityPreposition(`${ECLAT_DEFAULT_COPY.heroTitleWithCity} ${city}`)
    : ECLAT_DEFAULT_COPY.heroTitle
  const title: string = firstFilled(content.heroTitle, defaultTitle)
  const cityCandidates: string[] = [city, withoutLeadingArticle(city)].filter(
    (candidate: string): boolean => candidate.length > 0,
  )
  for (const candidate of cityCandidates) {
    const cityStart: number = title.toLowerCase().lastIndexOf(candidate.toLowerCase())
    if (cityStart >= 0) {
      return {
        beforeCity: glueTrailingSpace(glueShortWords(title.slice(0, cityStart))),
        city: title.slice(cityStart, cityStart + candidate.length),
        afterCity: title.slice(cityStart + candidate.length),
      }
    }
  }
  return { beforeCity: glueShortWords(title), city: '', afterCity: '' }
}

/**
 * Points forts affichés sous les boutons du haut de page.
 * @param content - Contenu du prospect.
 * @returns Les points renseignés, sinon ceux de la template.
 */
function buildHeroPoints(content: EclatSiteContentInput): string[] {
  const points: string[] = (content.heroPoints ?? [])
    .map((point: string): string => firstFilled(point))
    .filter((point: string): boolean => point.length > 0)
  return points.length > 0 ? points : ECLAT_DEFAULT_COPY.heroPoints
}

/**
 * Note Google affichable, ou rien quand elle manque ou qu'elle est trop basse pour être mise en avant.
 * @param content - Contenu du prospect.
 * @returns La note et le nombre d'avis mis en forme, ou null.
 */
function buildGoogleRating(content: EclatSiteContentInput): EclatGoogleRating | null {
  const rating: number | null | undefined = content.rating
  if (typeof rating !== 'number' || rating < ECLAT_MINIMUM_DISPLAYED_RATING) return null
  const reviewsCount: number | null | undefined = content.reviewsCount
  return {
    value: formatRating(rating),
    filledStars: Math.round(rating),
    reviewsCount: typeof reviewsCount === 'number' && reviewsCount > 0 ? String(reviewsCount) : '',
  }
}

/**
 * Choisit l'icône d'un repère de confiance d'après ses mots.
 * @param item - Valeur et libellé du repère.
 * @returns Le nom de l'icône.
 */
function trustItemIcon(item: TrustItemText): SvgIconName {
  const words: string = `${item.value} ${item.label}`.toLowerCase()
  if (RATING_VALUE.test(item.value) || words.includes('avis')) return 'star-outline'
  if (words.includes('7j') || words.includes('urgence') || words.includes('dépannage')) return 'zap'
  if (words.includes('devis')) return 'quote-file'
  if (words.includes('garanti') || words.includes('assur')) return 'shield'
  if (words.includes('conform') || words.includes('norme')) return 'badge'
  return 'check'
}

/**
 * Repères de confiance, chacun avec l'icône qui correspond à ce qu'il annonce.
 * @param content - Contenu du prospect.
 * @returns Quatre repères au plus ; ceux de la template quand le contenu n'en a pas.
 */
function buildTrustItems(content: EclatSiteContentInput): EclatTrustItem[] {
  const filledItems: TrustItemText[] = (content.trustItems ?? [])
    .map((item: SiteContentTrustItem): TrustItemText => ({
      value: firstFilled(item.value),
      label: firstFilled(item.label),
    }))
    .filter((item: TrustItemText): boolean => item.value.length > 0 || item.label.length > 0)
  const items: TrustItemText[] = filledItems.length > 0 ? filledItems : ECLAT_DEFAULT_TRUST_ITEMS
  return items
    .slice(0, MAXIMUM_TRUST_ITEMS)
    .map((item: TrustItemText): EclatTrustItem => ({ ...item, icon: trustItemIcon(item) }))
}

/**
 * Prestations affichées, chacune avec sa photo.
 * @param content - Contenu du prospect.
 * @returns Six prestations au plus ; celles de la template quand le contenu n'en a pas.
 */
function buildServices(content: EclatSiteContentInput): EclatService[] {
  const titledServices: SiteContentService[] = (content.services ?? []).filter(
    (service: SiteContentService): boolean => firstFilled(service.title).length > 0,
  )
  const services: SiteContentService[] =
    titledServices.length > 0 ? titledServices : ECLAT_DEFAULT_SERVICES
  return services
    .slice(0, MAXIMUM_SERVICES)
    .map((service: SiteContentService, index: number): EclatService => ({
      number: String(index + 1).padStart(2, '0'),
      title: firstFilled(service.title),
      description: firstFilled(service.description),
      image: firstFilled(
        service.image,
        ECLAT_DEFAULT_IMAGES.services[index % ECLAT_DEFAULT_IMAGES.services.length],
      ),
    }))
}

/**
 * Lignes de repères de la section « À propos ».
 * @param city - Ville du prospect.
 * @param area - Secteur d'intervention.
 * @param googleRating - Note Google affichable, ou null.
 * @returns Les lignes dont la donnée existe.
 */
function buildFacts(
  city: string,
  area: string,
  googleRating: EclatGoogleRating | null,
): EclatFact[] {
  const facts: EclatFact[] = []
  if (city) facts.push({ label: 'Basé à', value: city })
  if (area) facts.push({ label: 'Secteur', value: area })
  if (googleRating) {
    const reviews: string = googleRating.reviewsCount ? `, ${googleRating.reviewsCount} avis` : ''
    facts.push({ label: 'Avis Google', value: `${googleRating.value} sur 5${reviews}` })
  }
  return facts
}

/**
 * Étapes du déroulé d'une intervention.
 * @param content - Contenu du prospect.
 * @returns Les étapes renseignées, sinon celles de la template.
 */
function buildSteps(content: EclatSiteContentInput): EclatStep[] {
  const titledSteps: SiteContentStep[] = (content.steps ?? []).filter(
    (step: SiteContentStep): boolean => firstFilled(step.title).length > 0,
  )
  const steps: SiteContentStep[] = titledSteps.length > 0 ? titledSteps : ECLAT_DEFAULT_STEPS
  return steps.map((step: SiteContentStep, index: number): EclatStep => ({
    number: String(index + 1).padStart(2, '0'),
    title: firstFilled(step.title),
    description: firstFilled(step.description),
  }))
}

/**
 * Photos de réalisations propres au prospect.
 * @param content - Contenu du prospect.
 * @param businessName - Nom de l'entreprise, pour le texte alternatif.
 * @returns Les photos renseignées, ou une liste vide.
 */
function buildProspectPhotos(content: EclatSiteContentInput, businessName: string): EclatPhoto[] {
  return (content.gallery ?? [])
    .filter((image: SiteContentGalleryImage): boolean => firstFilled(image.url).length > 0)
    .map((image: SiteContentGalleryImage): EclatPhoto => ({
      url: firstFilled(image.url),
      alt: firstFilled(image.alt, `Réalisation de ${businessName}`),
    }))
}

/**
 * Avis clients qui ont un texte.
 * @param content - Contenu du prospect.
 * @returns Six avis au plus.
 */
function buildReviews(content: EclatSiteContentInput): EclatReview[] {
  return (content.reviews ?? [])
    .filter((review: SiteContentReview): boolean => firstFilled(review.text).length > 0)
    .slice(0, MAXIMUM_REVIEWS)
    .map((review: SiteContentReview): EclatReview => {
      const author: string = firstFilled(review.author, 'Client')
      return {
        author,
        initials: authorInitials(author),
        rating: typeof review.rating === 'number' && review.rating > 0 ? review.rating : 5,
        text: firstFilled(review.text),
      }
    })
}

/**
 * Questions fréquentes.
 * @param content - Contenu du prospect.
 * @returns Les questions complètes, sinon celles de la template.
 */
function buildQuestions(content: EclatSiteContentInput): EclatQuestion[] {
  const questions: EclatQuestion[] = (content.faq ?? [])
    .map((item: SiteContentFaqItem): EclatQuestion => ({
      question: firstFilled(item.question),
      answer: firstFilled(item.answer),
    }))
    .filter((item: EclatQuestion): boolean => item.question.length > 0 && item.answer.length > 0)
  return questions.length > 0 ? questions : ECLAT_DEFAULT_QUESTIONS
}

/**
 * Horaires d'ouverture complets (jour et heures).
 * @param content - Contenu du prospect.
 * @returns Les créneaux renseignés.
 */
function buildOpeningHours(content: EclatSiteContentInput): EclatOpeningSlot[] {
  return (content.openingHours ?? [])
    .map((slot: SiteContentOpeningHours): EclatOpeningSlot => ({
      day: firstFilled(slot.day),
      hours: firstFilled(slot.hours),
    }))
    .filter((slot: EclatOpeningSlot): boolean => slot.day.length > 0 && slot.hours.length > 0)
}

/**
 * Carte du secteur : centrée sur l'adresse quand elle existe, sinon sur la ville.
 * @param content - Contenu du prospect.
 * @param address - Adresse postale, ou une chaîne vide.
 * @param city - Ville du prospect.
 * @param area - Secteur d'intervention.
 * @returns La carte à intégrer, ou null sans aucun lieu connu.
 */
function buildMap(
  content: EclatSiteContentInput,
  address: string,
  city: string,
  area: string,
): EclatMap | null {
  const hasCoordinates: boolean =
    typeof content.lat === 'number' &&
    typeof content.lng === 'number' &&
    (content.lat !== 0 || content.lng !== 0)
  const place: string = hasCoordinates
    ? `${content.lat},${content.lng}`
    : firstFilled(address, city, area)
  if (!place) return null
  const zoom: number =
    hasCoordinates || address.length > 0 ? STREET_LEVEL_MAP_ZOOM : AREA_LEVEL_MAP_ZOOM
  return {
    embedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(place)}&z=${zoom}&hl=fr&output=embed`,
    label: firstFilled(area, city, address),
  }
}

/**
 * Liens vers les réseaux sociaux du prospect.
 * @param content - Contenu du prospect.
 * @returns Les liens dont l'adresse est renseignée.
 */
function buildSocialLinks(content: EclatSiteContentInput): EclatSocialLink[] {
  return (content.social ?? [])
    .map((link: SiteContentSocialLink): EclatSocialLink => ({
      network: firstFilled(link.network),
      url: firstFilled(link.url),
    }))
    .filter((link: EclatSocialLink): boolean => link.url.length > 0)
}

/**
 * Fusionne les données du prospect avec les textes et photos par défaut de la template.
 * @param content - Contenu du prospect, toutes clés facultatives.
 * @returns Le contenu prêt à rendre par les sections.
 */
export function buildEclatContent(content: EclatSiteContentInput): EclatPageContent {
  const businessName: string = firstFilled(content.businessName, ECLAT_DEFAULT_COPY.businessName)
  const city: string = firstFilled(content.city)
  const area: string = firstFilled(content.area)
  const phone: string = firstFilled(content.phone)
  const address: string = firstFilled(content.address)
  const googleRating: EclatGoogleRating | null = buildGoogleRating(content)
  const prospectPhotos: EclatPhoto[] = buildProspectPhotos(content, businessName)

  return {
    businessName,
    logo: firstFilled(content.logo),
    city,
    area,
    phone,
    phoneHref: phoneHref(phone),
    email: firstFilled(content.email),
    address,
    googleRating,
    hero: {
      badge: firstFilled(content.heroBadge, ECLAT_DEFAULT_COPY.heroBadge),
      title: buildHeroTitle(content, city),
      lead: firstFilled(content.subtitle, ECLAT_DEFAULT_COPY.heroLead),
      quoteLabel: firstFilled(content.ctaQuoteLabel, ECLAT_DEFAULT_COPY.quoteLabel),
      points: buildHeroPoints(content),
      image: firstFilled(content.heroImage, ECLAT_DEFAULT_IMAGES.hero),
      fallbackImage: ECLAT_DEFAULT_IMAGES.hero,
      secondaryImage: firstFilled(
        content.images?.heroSecondary,
        prospectPhotos[0]?.url,
        ECLAT_DEFAULT_IMAGES.heroSecondary,
      ),
    },
    trustItems: buildTrustItems(content),
    services: {
      heading: glueShortWords(
        firstFilled(content.servicesHeading, ECLAT_DEFAULT_COPY.servicesHeading),
      ),
      lead: firstFilled(content.servicesLead, ECLAT_DEFAULT_COPY.servicesLead),
      items: buildServices(content),
    },
    about: {
      heading: glueShortWords(firstFilled(content.aboutHeading, ECLAT_DEFAULT_COPY.aboutHeading)),
      text: firstFilled(content.about, ECLAT_DEFAULT_COPY.aboutText),
      image: firstFilled(content.aboutImage, ECLAT_DEFAULT_IMAGES.about),
      facts: buildFacts(city, area, googleRating),
    },
    method: {
      heading: glueShortWords(firstFilled(content.stepsHeading, ECLAT_DEFAULT_COPY.methodHeading)),
      steps: buildSteps(content),
    },
    gallery: {
      heading: glueShortWords(
        firstFilled(content.galleryHeading, ECLAT_DEFAULT_COPY.galleryHeading),
      ),
      photos:
        prospectPhotos.length > 0
          ? prospectPhotos
          : ECLAT_DEFAULT_IMAGES.gallery.map((url: string): EclatPhoto => ({
              url,
              alt: 'Exemple de réalisation',
            })),
    },
    reviews: {
      heading: glueShortWords(
        firstFilled(content.reviewsHeading, ECLAT_DEFAULT_COPY.reviewsHeading),
      ),
      items: buildReviews(content),
    },
    faq: {
      heading: firstFilled(content.faqHeading, ECLAT_DEFAULT_COPY.faqHeading),
      lead: ECLAT_DEFAULT_COPY.faqLead,
      questions: buildQuestions(content),
    },
    callBanner: {
      title: glueShortWords(firstFilled(content.ctaTitle, ECLAT_DEFAULT_COPY.callBannerTitle)),
      lead: firstFilled(content.ctaLead, ECLAT_DEFAULT_COPY.callBannerLead),
      image: firstFilled(content.images?.ctaBackground, ECLAT_DEFAULT_IMAGES.callBanner),
    },
    contact: {
      heading: glueShortWords(
        firstFilled(content.contactHeading, ECLAT_DEFAULT_COPY.contactHeading),
      ),
      lead: firstFilled(content.contactLead, ECLAT_DEFAULT_COPY.contactLead),
      openingHours: buildOpeningHours(content),
      map: buildMap(content, address, city, area),
    },
    footer: {
      tagline: contractCityPreposition(
        `${ECLAT_DEFAULT_COPY.footerTagline}${city ? ` à ${city}` : ''}.`,
      ),
      licenseLine: professionalLicenseLine(content),
      social: buildSocialLinks(content),
    },
    accent: eclatAccentShades(content.palette?.primary),
  }
}
