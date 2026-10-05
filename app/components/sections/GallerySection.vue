<template>
  <section
    id="realisations"
    class="eclat-section eclat-gallery">
    <div class="eclat-shell eclat-gallery__head">
      <div>
        <span
          v-eclat-reveal
          class="eclat-eyebrow">
          Réalisations
        </span>
        <h2
          v-eclat-reveal
          class="eclat-title">
          {{ page.gallery.heading }}
        </h2>
      </div>
      <div
        v-eclat-reveal
        class="eclat-gallery__controls">
        <button
          type="button"
          aria-label="Photos précédentes"
          :disabled="!canScrollBackward"
          @click="scrollPhotos(-1)">
          <SvgIcon name="chevron-left" />
        </button>
        <button
          type="button"
          aria-label="Photos suivantes"
          :disabled="!canScrollForward"
          @click="scrollPhotos(1)">
          <SvgIcon name="chevron-right" />
        </button>
      </div>
    </div>
    <div
      ref="photoTrackElement"
      v-eclat-reveal
      class="eclat-gallery__track"
      tabindex="0"
      role="group"
      aria-label="Photos des réalisations"
      @scroll.passive="updateScrollControls">
      <figure
        v-for="photo in page.gallery.photos"
        :key="photo.url"
        class="eclat-gallery__photo">
        <img
          :src="photo.url"
          :alt="photo.alt"
          loading="lazy" />
      </figure>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { ComputedRef, Ref } from 'vue'
import type { EclatPageContent, EclatPhoto } from '../../types/EclatPageContent'
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useEclatPage } from '../../content/eclatPage'
import { vEclatReveal } from '../../directives/vEclatReveal'
import SvgIcon from '../parts/SvgIcon.vue'

const SCROLL_EDGE_TOLERANCE: number = 4
const SCROLLED_SHARE_OF_TRACK: number = 0.8

const page: ComputedRef<EclatPageContent> = useEclatPage()

const photoTrackElement: Ref<HTMLElement | null> = ref<HTMLElement | null>(null)
const canScrollBackward: Ref<boolean> = ref<boolean>(false)
const canScrollForward: Ref<boolean> = ref<boolean>(false)

/**
 * Active ou désactive les flèches selon la position de défilement de la bande de photos.
 */
function updateScrollControls(): void {
  const track: HTMLElement | null = photoTrackElement.value
  if (!track) return
  const furthestScroll: number = track.scrollWidth - track.clientWidth
  canScrollBackward.value = track.scrollLeft > SCROLL_EDGE_TOLERANCE
  canScrollForward.value = track.scrollLeft < furthestScroll - SCROLL_EDGE_TOLERANCE
}

/**
 * Fait défiler la bande de photos d'un écran environ.
 * @param direction - `1` vers les photos suivantes, `-1` vers les précédentes.
 */
function scrollPhotos(direction: 1 | -1): void {
  const track: HTMLElement | null = photoTrackElement.value
  if (!track) return
  track.scrollBy({
    left: direction * track.clientWidth * SCROLLED_SHARE_OF_TRACK,
    behavior: 'smooth',
  })
}

watch(
  (): EclatPhoto[] => page.value.gallery.photos,
  async (): Promise<void> => {
    await nextTick()
    updateScrollControls()
  },
)

onMounted((): void => {
  updateScrollControls()
  window.addEventListener('resize', updateScrollControls, { passive: true })
})

onBeforeUnmount((): void => {
  window.removeEventListener('resize', updateScrollControls)
})
</script>

<style scoped>
.eclat-gallery__head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 32px;
}

.eclat-gallery__controls {
  display: flex;
  gap: 10px;
}

.eclat-gallery__controls button {
  display: grid;
  place-items: center;
  width: 50px;
  height: 50px;
  border: 1.5px solid var(--eclat-line-strong);
  border-radius: 12px;
  background: transparent;
  color: var(--eclat-ink);
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    opacity 0.2s ease;
}

.eclat-gallery__controls button:hover {
  border-color: var(--eclat-ink);
}

.eclat-gallery__controls button:disabled {
  border-color: var(--eclat-line-strong);
  opacity: 0.35;
  cursor: default;
}

.eclat-gallery__controls svg {
  width: 20px;
  height: 20px;
}

.eclat-gallery__track {
  display: flex;
  gap: 20px;
  margin-top: 48px;
  padding-inline: var(--eclat-gutter);
  overflow-x: auto;
  scroll-padding-inline: var(--eclat-gutter);
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}

.eclat-gallery__track::-webkit-scrollbar {
  display: none;
}

.eclat-gallery__photo {
  flex: none;
  width: 295px;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  border-radius: 24px;
  background: var(--eclat-band);
  scroll-snap-align: start;
}

.eclat-gallery__photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 640px) {
  .eclat-gallery__controls {
    display: none;
  }

  .eclat-gallery__track {
    gap: 12px;
    margin-top: 32px;
  }

  .eclat-gallery__photo {
    width: 68%;
    border-radius: 20px;
  }
}
</style>
