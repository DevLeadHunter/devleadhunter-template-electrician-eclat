import type { EclatQuestion, EclatServicePhotoFallback } from '../types/EclatPageContent'

/** Origine de toutes les photos de la template : une photo servie d'ailleurs est celle du prospect. */
export const ECLAT_STOCK_PHOTO_ORIGIN: string = 'https://images.unsplash.com'

/**
 * Adresse d'une photo Unsplash recadrée à la largeur voulue.
 * @param photoId - Identifiant Unsplash de la photo (`photo-…`).
 * @param width - Largeur demandée, en pixels.
 * @returns L'adresse de l'image.
 */
function unsplashPhoto(photoId: string, width: number): string {
  return `${ECLAT_STOCK_PHOTO_ORIGIN}/${photoId}?auto=format&fit=crop&w=${width}&q=80`
}

const WALLBOX_PHOTO: string = unsplashPhoto('photo-1653665674648-7cc7fa657547', 900)
const WALLBOX_WITH_CAR_PHOTO: string = unsplashPhoto('photo-1732194044246-9c5f6bc6582c', 900)
const GARDEN_LIGHTS_PHOTO: string = unsplashPhoto('photo-1788619371179-b3031f2cbe23', 900)
const TESTER_ON_SWITCHGEAR_PHOTO: string = unsplashPhoto('photo-1758101755915-462eddc23f57', 900)
const SWITCHBOARD_PHOTO: string = unsplashPhoto('photo-1544724569-5f546fd6f2b5', 900)
const BREAKERS_PHOTO: string = unsplashPhoto('photo-1576446470246-499c738d1c8e', 900)
const WALL_SOCKET_PHOTO: string = unsplashPhoto('photo-1508920291026-c344bbfca1ab', 900)
const OPEN_SOCKET_BOX_PHOTO: string = unsplashPhoto('photo-1751486289947-4f5f5961b3aa', 900)
const LADDER_WORK_PHOTO: string = unsplashPhoto('photo-1665242043190-0ef29390d289', 900)
const LED_CORRIDOR_PHOTO: string = unsplashPhoto('photo-1782457696919-08e1aa4f7427', 900)
const OPEN_PLAN_LIVING_ROOM_PHOTO: string = unsplashPhoto('photo-1680416124510-5eae1beca412', 900)
const LIVING_ROOM_PHOTO: string = unsplashPhoto('photo-1666585607888-3f6fe0b323d8', 900)

/** Photos affichées quand le prospect n'a pas les siennes. Le module Python de l'API en garde le miroir. */
export const ECLAT_DEFAULT_IMAGES: {
  hero: string
  heroSecondary: string
  about: string
  callBanner: string
  services: string[]
  gallery: string[]
} = {
  hero: unsplashPhoto('photo-1767710924293-29fba5e3854b', 1400),
  heroSecondary: unsplashPhoto('photo-1682345262055-8f95f3c513ea', 900),
  about: unsplashPhoto('photo-1646640381839-02748ae8ddf0', 1200),
  callBanner: unsplashPhoto('photo-1547393947-a6a221f74e59', 1400),
  services: [
    TESTER_ON_SWITCHGEAR_PHOTO,
    OPEN_SOCKET_BOX_PHOTO,
    SWITCHBOARD_PHOTO,
    LADDER_WORK_PHOTO,
    LED_CORRIDOR_PHOTO,
    WALL_SOCKET_PHOTO,
  ],
  gallery: [
    WALLBOX_WITH_CAR_PHOTO,
    LIVING_ROOM_PHOTO,
    GARDEN_LIGHTS_PHOTO,
    BREAKERS_PHOTO,
    WALL_SOCKET_PHOTO,
    OPEN_PLAN_LIVING_ROOM_PHOTO,
  ],
}

/** Photos qu'une carte sans photo à elle peut recevoir, par ordre de préférence, chacune sous un titre qui nomme ce qu'elle montre. */
export const ECLAT_SERVICE_PHOTO_FALLBACKS: EclatServicePhotoFallback[] = [
  { url: WALLBOX_PHOTO, titleWordStarts: ['borne', 'recharge', 'vehicule', 'voiture'] },
  { url: WALLBOX_WITH_CAR_PHOTO, titleWordStarts: ['borne', 'recharge', 'vehicule', 'voiture'] },
  {
    url: GARDEN_LIGHTS_PHOTO,
    titleWordStarts: ['exterieur', 'jardin', 'guirlande', 'terrasse', 'piscine', 'facade', 'allee'],
  },
  {
    url: TESTER_ON_SWITCHGEAR_PHOTO,
    titleWordStarts: [
      'electricit',
      'depann',
      'panne',
      'controle',
      'mesure',
      'diagnostic',
      'securite',
      'verification',
      'conseil',
    ],
  },
  {
    url: SWITCHBOARD_PHOTO,
    titleWordStarts: [
      'tableau',
      'armoire',
      'coffret',
      'disjoncteur',
      'compteur',
      'linky',
      'automatisme',
      'depann',
      'panne',
      'controle',
    ],
  },
  {
    url: BREAKERS_PHOTO,
    titleWordStarts: [
      'tableau',
      'armoire',
      'coffret',
      'disjoncteur',
      'compteur',
      'linky',
      'automatisme',
      'depann',
      'panne',
      'controle',
      'norme',
    ],
  },
  { url: WALL_SOCKET_PHOTO, titleWordStarts: ['prise', 'circuit', 'raccord', 'branchement'] },
  {
    url: OPEN_SOCKET_BOX_PHOTO,
    titleWordStarts: [
      'prise',
      'circuit',
      'raccord',
      'norme',
      'renovation',
      'transformation',
      'controle',
    ],
  },
  {
    url: LADDER_WORK_PHOTO,
    titleWordStarts: [
      'installation',
      'renovation',
      'neuf',
      'travaux',
      'chantier',
      'cablage',
      'habitat',
      'tertiaire',
      'locaux',
      'commerce',
      'bureau',
    ],
  },
  {
    url: LED_CORRIDOR_PHOTO,
    titleWordStarts: [
      'eclairage',
      'lumiere',
      'luminaire',
      'led',
      'spot',
      'domotique',
      'applique',
      'bandeau',
    ],
  },
  {
    url: OPEN_PLAN_LIVING_ROOM_PHOTO,
    titleWordStarts: ['eclairage', 'luminaire', 'interieur', 'salon', 'maison', 'logement'],
  },
  {
    url: LIVING_ROOM_PHOTO,
    titleWordStarts: ['eclairage', 'luminaire', 'interieur', 'salon', 'maison', 'logement'],
  },
]

/** Photos qui ne montrent aucune prestation précise : elles vont sous un titre qu'aucune autre photo n'illustre. */
export const ECLAT_NEUTRAL_SERVICE_PHOTOS: string[] = [
  OPEN_PLAN_LIVING_ROOM_PHOTO,
  LIVING_ROOM_PHOTO,
  LADDER_WORK_PHOTO,
  OPEN_SOCKET_BOX_PHOTO,
]

export const ECLAT_DEFAULT_SERVICES: { title: string; description: string }[] = [
  {
    title: 'Dépannage électrique',
    description: 'Panne, court-circuit, disjoncteur qui saute : diagnostic et remise en service.',
  },
  {
    title: 'Mise aux normes',
    description: 'Remise à niveau de votre installation selon les normes en vigueur.',
  },
  {
    title: 'Tableau électrique',
    description: 'Remplacement et modernisation de votre tableau et de vos protections.',
  },
  {
    title: 'Installation et rénovation',
    description: 'Neuf ou rénovation : réseau complet, prises, points lumineux.',
  },
  {
    title: 'Éclairage',
    description: 'Éclairage intérieur et extérieur, points lumineux et interrupteurs.',
  },
  {
    title: 'Prises et circuits',
    description: 'Ajout de prises et de circuits dédiés : four, plaques de cuisson, chauffe-eau.',
  },
]

export const ECLAT_DEFAULT_STEPS: { title: string; description: string }[] = [
  {
    title: 'Premier contact',
    description: 'Vous décrivez votre besoin par téléphone ou par message.',
  },
  { title: 'Visite et devis', description: 'Passage sur place si besoin, puis devis détaillé.' },
  { title: 'Travaux', description: 'Réalisés à la date convenue ensemble.' },
  {
    title: 'Contrôle final',
    description: "L'installation est vérifiée avant le départ.",
  },
]

export const ECLAT_DEFAULT_QUESTIONS: EclatQuestion[] = [
  {
    question: 'Comment demander un devis ?',
    answer:
      "Par téléphone ou avec le formulaire de contact : décrivez les travaux et l'adresse du chantier.",
  },
  {
    question: 'Dans quel secteur intervenez-vous ?',
    answer:
      "Le secteur d'intervention est indiqué dans la partie contact. Un doute sur votre commune ? Le plus simple est d'appeler.",
  },
  {
    question: "Que préparer avant d'appeler ?",
    answer:
      "Le type de travaux, l'adresse et vos disponibilités. Une photo de l'installation aide aussi à préparer le devis.",
  },
]

/** Repères de confiance quand le contenu n'en a pas : rien qui promette un délai, une garantie ou un prix. */
export const ECLAT_DEFAULT_TRUST_ITEMS: { value: string; label: string }[] = [
  { value: 'Local', label: 'Artisan de proximité' },
  { value: 'Devis', label: 'Sur demande' },
]

export const ECLAT_DEFAULT_COPY: {
  businessName: string
  heroBadge: string
  heroTitle: string
  heroTitleWithCity: string
  heroLead: string
  quoteLabel: string
  servicesHeading: string
  servicesLead: string
  aboutHeading: string
  aboutText: string
  methodHeading: string
  galleryHeading: string
  reviewsHeading: string
  faqHeading: string
  faqLead: string
  callBannerTitle: string
  callBannerLead: string
  contactHeading: string
  contactLead: string
} = {
  businessName: 'Votre électricien',
  heroBadge: 'Artisan électricien',
  heroTitle: 'Votre électricien',
  heroTitleWithCity: 'Votre électricien à',
  heroLead: 'Dépannage, mise aux normes, tableau électrique, installation et rénovation.',
  quoteLabel: 'Demander un devis',
  servicesHeading: "Tout ce qu'il faut pour une installation sûre",
  servicesLead: 'Du simple dépannage à la rénovation complète de votre installation électrique.',
  aboutHeading: 'Qui intervient chez vous',
  aboutText: 'Électricien pour vos dépannages, vos installations et vos mises aux normes.',
  methodHeading: 'Comment se passe une intervention',
  galleryHeading: 'Quelques chantiers en photos',
  reviewsHeading: 'Ce que disent nos clients',
  faqHeading: 'Questions fréquentes',
  faqLead: 'Les réponses aux questions courantes.',
  callBannerTitle: 'Une panne ou un projet ?',
  callBannerLead: 'Décrivez votre besoin par téléphone ou avec le formulaire ci-dessous.',
  contactHeading: 'Parlons de votre projet',
  contactLead: 'Par téléphone, par e-mail ou avec le formulaire.',
}

/** Couleur d'accent quand le prospect n'a pas de couleur de marque exploitable. */
export const ECLAT_DEFAULT_ACCENT: string = '#f59e0b'

/** Sous cette note Google, la template ne l'affiche pas : même seuil que les repères de confiance de l'API. */
export const ECLAT_MINIMUM_DISPLAYED_RATING: number = 3.5

/** Largeur sous laquelle une photo d'en-tête est jugée inexploitable et remplacée par celle de la template. */
export const ECLAT_MINIMUM_HERO_IMAGE_WIDTH: number = 480
