import type { ComputedRef, InjectionKey } from 'vue'
import { inject } from 'vue'
import type { EclatPageContent } from '../types/EclatPageContent'

/** Clé d'injection du contenu de la page, fourni par la racine à toutes les sections. */
export const ECLAT_PAGE_KEY: InjectionKey<ComputedRef<EclatPageContent>> = Symbol('eclat-page')

/**
 * Donne à une section le contenu de la page fourni par la racine.
 * @returns Le contenu réactif de la page.
 * @throws {Error} Quand la section est rendue hors de la racine de la template.
 */
export function useEclatPage(): ComputedRef<EclatPageContent> {
  const page: ComputedRef<EclatPageContent> | undefined = inject(ECLAT_PAGE_KEY)
  if (!page) {
    throw new Error('Les sections Éclat doivent être rendues dans ElectricianEclatRoot.')
  }
  return page
}
