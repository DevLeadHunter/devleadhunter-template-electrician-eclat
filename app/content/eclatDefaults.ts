import type { EclatQuestion } from '../types/EclatPageContent'

/**
 * Adresse d'une photo Unsplash recadrée à la largeur voulue.
 * @param photoId - Identifiant Unsplash de la photo (`photo-…`).
 * @param width - Largeur demandée, en pixels.
 * @returns L'adresse de l'image.
 */
function unsplashPhoto(photoId: string, width: number): string {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&q=80`
}

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
    unsplashPhoto('photo-1758101755915-462eddc23f57', 900),
    unsplashPhoto('photo-1751486289947-4f5f5961b3aa', 900),
    unsplashPhoto('photo-1544724569-5f546fd6f2b5', 900),
    unsplashPhoto('photo-1665242043190-0ef29390d289', 900),
    unsplashPhoto('photo-1782457696919-08e1aa4f7427', 900),
    unsplashPhoto('photo-1653665674648-7cc7fa657547', 900),
  ],
  gallery: [
    unsplashPhoto('photo-1732194044246-9c5f6bc6582c', 900),
    unsplashPhoto('photo-1666585607888-3f6fe0b323d8', 900),
    unsplashPhoto('photo-1788619371179-b3031f2cbe23', 900),
    unsplashPhoto('photo-1576446470246-499c738d1c8e', 900),
    unsplashPhoto('photo-1508920291026-c344bbfca1ab', 900),
    unsplashPhoto('photo-1680416124510-5eae1beca412', 900),
  ],
}

export const ECLAT_DEFAULT_SERVICES: { title: string; description: string }[] = [
  {
    title: 'Dépannage électrique',
    description:
      'Panne, court-circuit, disjoncteur qui saute : diagnostic et remise en service rapides.',
  },
  {
    title: 'Mise aux normes',
    description:
      "Remise à niveau complète de votre installation, aux normes en vigueur, attestation à l'appui.",
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
    title: 'Éclairage et domotique',
    description: 'Éclairage intérieur et extérieur, interrupteurs connectés, domotique.',
  },
  {
    title: 'Borne de recharge',
    description: 'Installation de bornes de recharge pour véhicule électrique.',
  },
]

export const ECLAT_DEFAULT_STEPS: { title: string; description: string }[] = [
  {
    title: 'Premier contact',
    description: 'Vous décrivez votre besoin par téléphone ou par message.',
  },
  { title: 'Visite et devis', description: 'Passage sur place, puis devis gratuit et détaillé.' },
  { title: 'Travaux', description: 'Réalisés à la date convenue, chantier laissé propre.' },
  {
    title: 'Contrôle final',
    description: 'Chaque circuit est testé et expliqué avant le départ.',
  },
]

export const ECLAT_DEFAULT_QUESTIONS: EclatQuestion[] = [
  {
    question: 'Intervenez-vous en urgence ?',
    answer: 'Oui, pour toute panne électrique nous intervenons au plus vite, 7j/7.',
  },
  {
    question: 'Le devis est-il gratuit ?',
    answer: 'Le devis est gratuit et sans engagement, remis avant les travaux.',
  },
  {
    question: 'Délivrez-vous une attestation de conformité ?',
    answer: 'Oui, chaque installation neuve ou mise aux normes est livrée avec son attestation.',
  },
  {
    question: 'Quelles zones couvrez-vous ?',
    answer:
      'Nous intervenons dans notre commune et celles des alentours. Un doute sur la vôtre ? Appelez-nous.',
  },
  {
    question: 'Vos travaux sont-ils garantis ?',
    answer:
      'Oui, nos installations sont conformes et couvertes par notre assurance professionnelle.',
  },
]

export const ECLAT_DEFAULT_TRUST_ITEMS: { value: string; label: string }[] = [
  { value: '7j/7', label: 'Dépannage et urgences' },
  { value: 'Devis gratuit', label: 'Sans engagement' },
  { value: 'Travail garanti', label: 'Interventions assurées' },
  { value: '100% conforme', label: 'Installations aux normes' },
]

export const ECLAT_DEFAULT_COPY: {
  businessName: string
  heroBadge: string
  heroTitle: string
  heroTitleWithCity: string
  heroLead: string
  heroPoints: string[]
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
  footerTagline: string
} = {
  businessName: 'Votre électricien',
  heroBadge: 'Artisan électricien',
  heroTitle: 'Votre électricien de confiance',
  heroTitleWithCity: 'Votre électricien de confiance à',
  heroLead:
    'Dépannage, mise aux normes, rénovation et borne de recharge. Un travail propre, sécurisé et garanti.',
  heroPoints: ['Devis gratuit', 'Intervention rapide', 'Travail garanti'],
  quoteLabel: 'Demander un devis',
  servicesHeading: "Tout ce qu'il faut pour une installation sûre",
  servicesLead: 'Du simple dépannage à la rénovation complète de votre installation électrique.',
  aboutHeading: 'Un travail soigné, du devis au dernier test',
  aboutText:
    'Électricien qualifié à votre service pour vos dépannages, installations et mises aux normes. Travail conforme, soigné et sécurisé, avec un diagnostic clair et un prix juste.',
  methodHeading: 'Comment se passe une intervention',
  galleryHeading: 'Nos chantiers récents',
  reviewsHeading: 'Ce que disent nos clients',
  faqHeading: 'Questions fréquentes',
  faqLead: "Les réponses aux questions qu'on nous pose le plus souvent.",
  callBannerTitle: 'Une panne ou un projet ?',
  callBannerLead: 'Décrivez votre besoin, vous recevez une réponse rapide et un devis gratuit.',
  contactHeading: 'Parlons de votre projet',
  contactLead: 'Par téléphone, par e-mail ou avec le formulaire : réponse rapide et devis gratuit.',
  footerTagline: 'Dépannage, mise aux normes, rénovation et borne de recharge',
}

/** Couleur d'accent quand le prospect n'a pas de couleur de marque exploitable. */
export const ECLAT_DEFAULT_ACCENT: string = '#f59e0b'

/** Sous cette note Google, la template ne l'affiche pas : même seuil que les repères de confiance de l'API. */
export const ECLAT_MINIMUM_DISPLAYED_RATING: number = 3.5

/** Largeur sous laquelle une photo d'en-tête est jugée inexploitable et remplacée par celle de la template. */
export const ECLAT_MINIMUM_HERO_IMAGE_WIDTH: number = 480
