const NON_BREAKING_SPACE: string = String.fromCharCode(160)
const SHORT_WORD_BEFORE_SPACE: RegExp =
  /(^|\s)(à|au|aux|de|du|des|en|et|ou|un|une|le|la|les)\s(?=\S)/gi
const LEADING_ARTICLE: RegExp = /^(le|la|les|l['’])\s*/i
const TRAILING_SPACES: RegExp = /\s+$/

/**
 * Retourne la première valeur renseignée.
 * @param values - Candidats, par ordre de priorité.
 * @returns La première chaîne non vide, sans espaces autour, ou une chaîne vide.
 */
export function firstFilled(...values: (string | null | undefined)[]): string {
  for (const value of values) {
    if (typeof value === 'string' && value.trim().length > 0) return value.trim()
  }
  return ''
}

/**
 * Colle les petits mots au mot suivant pour qu'ils ne restent jamais seuls en fin de ligne.
 * @param text - Titre ou phrase courte.
 * @returns Le texte avec des espaces insécables après les petits mots.
 */
export function glueShortWords(text: string): string {
  return text.replace(
    SHORT_WORD_BEFORE_SPACE,
    (_match: string, before: string, word: string): string =>
      `${before}${word}${NON_BREAKING_SPACE}`,
  )
}

/**
 * Remplace l'espace final d'un début de phrase par une espace insécable, pour y accrocher le mot suivant.
 * @param text - Début de phrase.
 * @returns Le texte, terminé par une espace insécable s'il finissait par une espace.
 */
export function glueTrailingSpace(text: string): string {
  return text.replace(TRAILING_SPACES, NON_BREAKING_SPACE)
}

/**
 * Contracte « à Le » en « au » et « à Les » en « aux » devant un nom de ville.
 * @param phrase - Phrase contenant « à » suivi d'une ville.
 * @returns La phrase avec la contraction française.
 */
export function contractCityPreposition(phrase: string): string {
  return phrase
    .replace(/(^|\s)à Le (?=\p{Lu})/u, '$1au ')
    .replace(/(^|\s)à Les (?=\p{Lu})/u, '$1aux ')
}

/**
 * Retire l'article en tête d'un nom de ville (« Le Mont-sur-Lausanne » donne « Mont-sur-Lausanne »).
 * @param city - Nom de la ville.
 * @returns Le nom sans son article.
 */
export function withoutLeadingArticle(city: string): string {
  return city.replace(LEADING_ARTICLE, '')
}

/**
 * Initiales d'un auteur d'avis (deux lettres au plus).
 * @param author - Nom affiché de l'auteur.
 * @returns Les initiales en majuscules.
 */
export function authorInitials(author: string): string {
  return author
    .split(/\s+/)
    .filter((part: string): boolean => part.length > 0)
    .slice(0, 2)
    .map((part: string): string => part.charAt(0).toUpperCase())
    .join('')
}

/**
 * Lien d'appel à partir d'un numéro tel qu'il est affiché.
 * @param phone - Numéro affiché (espaces, points ou tirets admis).
 * @returns Le lien `tel:`, ou une chaîne vide sans numéro.
 */
export function phoneHref(phone: string): string {
  const digits: string = phone.replace(/[^\d+]/g, '')
  return digits ? `tel:${digits}` : ''
}

/**
 * Note à la française (« 4,8 »).
 * @param rating - Note sur 5.
 * @returns La note avec une virgule et une décimale.
 */
export function formatRating(rating: number): string {
  return rating.toFixed(1).replace('.', ',')
}
