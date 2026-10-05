import type { EclatSiteContentInput } from './app/types/EclatPageContent'

/**
 * Fiche pauvre : ni photo, ni note, ni avis. La template doit rester complète avec ses seuls défauts.
 * Entreprise fictive, pour le `.playground` uniquement.
 */
export const leanMockSiteContent: EclatSiteContentInput = {
  businessName: 'Martin Électricité',
  phone: '02 99 00 12 34',
  email: 'contact@martin-electricite.example',
  city: 'Rennes',
  area: 'Rennes et ses alentours',
  subtitle:
    'Dépannage, mise aux normes, rénovation et borne de recharge. Un travail propre, sécurisé et garanti à Rennes.',
}

/**
 * Fiche bien remplie : note Google, avis, horaires, adresse, réseaux et couleur de marque.
 * Entreprise fictive, pour le `.playground` uniquement.
 */
export const richMockSiteContent: EclatSiteContentInput = {
  ...leanMockSiteContent,
  about:
    "Électricien à Rennes depuis 2012, j'interviens chez les particuliers et les commerces : dépannage, rénovation, mise aux normes et installations neuves.",
  address: '12 rue des Forges, 35000 Rennes',
  rating: 4.9,
  reviewsCount: 48,
  palette: { primary: '#2f7de1', secondary: '#0b1b2e', accent: '#f59e0b' },
  trustItems: [
    { value: '7j/7', label: 'Dépannage et urgences' },
    { value: '4,9/5', label: '48 avis' },
    { value: 'Travail garanti', label: 'Interventions assurées' },
    { value: '100% conforme', label: 'Installations aux normes' },
  ],
  reviews: [
    {
      author: 'Sophie M.',
      rating: 5,
      text: "Panne un dimanche soir, il a rappelé dans le quart d'heure et tout remis en route le lundi matin. Sérieux et très clair dans ses explications.",
    },
    {
      author: 'Julien D.',
      rating: 5,
      text: 'Tableau entièrement refait dans une maison ancienne. Devis respecté et chantier laissé propre. Je recommande.',
    },
    {
      author: 'Nathalie B.',
      rating: 4,
      text: "Borne de recharge posée en une matinée. Il a pris le temps d'expliquer le fonctionnement et les réglages.",
    },
  ],
  openingHours: [
    { day: 'Lundi au vendredi', hours: '8 h à 18 h' },
    { day: 'Samedi', hours: '9 h à 12 h' },
  ],
  social: [{ network: 'facebook', url: 'https://www.facebook.com/' }],
  professionalLicenseLabel: 'SIRET',
  professionalLicenseNumber: '000 000 000 00000',
}
