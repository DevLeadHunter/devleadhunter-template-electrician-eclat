import type { Directive, DirectiveBinding } from 'vue'

type RevealElement = HTMLElement & { eclatRevealObserver?: IntersectionObserver }

const HIDDEN_CLASS: string = 'eclat-reveal'
const VISIBLE_CLASS: string = 'eclat-reveal--in'

/**
 * Fait apparaître un élément quand il entre à l'écran.
 * La valeur est un délai en millisecondes. L'argument `mark` pose seulement la classe d'arrivée,
 * sans masquer l'élément, pour piloter une animation propre à la section.
 * Rien n'est masqué côté serveur ni quand le visiteur a demandé moins d'animations.
 */
export const vEclatReveal: Directive<RevealElement, number | undefined> = {
  getSSRProps(): Record<string, never> {
    return {}
  },

  mounted(element: RevealElement, binding: DirectiveBinding<number | undefined>): void {
    const prefersReducedMotion: boolean = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const isAlreadyVisible: boolean =
      element.getBoundingClientRect().top < window.innerHeight * 0.92
    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      element.classList.add(VISIBLE_CLASS)
      return
    }
    if (binding.arg !== 'mark' && !isAlreadyVisible) {
      element.style.setProperty('--eclat-reveal-delay', `${binding.value ?? 0}ms`)
      element.classList.add(HIDDEN_CLASS)
    }
    const observer: IntersectionObserver = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]): void => {
        if (entries.some((entry: IntersectionObserverEntry): boolean => entry.isIntersecting)) {
          element.classList.add(VISIBLE_CLASS)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -6% 0px' },
    )
    element.eclatRevealObserver = observer
    observer.observe(element)
  },

  unmounted(element: RevealElement): void {
    element.eclatRevealObserver?.disconnect()
  },
}
