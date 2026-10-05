<template>
  <section
    class="eclat-hero eclat-shell"
    data-section="haut-de-page">
    <div class="eclat-hero__text">
      <p class="eclat-eyebrow eclat-hero__badge">{{ badgeLine }}</p>
      <h1 class="eclat-hero__title">
        {{ page.hero.title.beforeCity
        }}<em v-if="page.hero.title.city">{{ page.hero.title.city }}</em
        >{{ page.hero.title.afterCity }}
      </h1>
      <p class="eclat-lead eclat-hero__lead">{{ page.hero.lead }}</p>
      <div class="eclat-hero__actions">
        <a
          class="eclat-btn"
          href="#contact">
          {{ page.hero.quoteLabel }}
        </a>
        <a
          v-if="page.phoneHref"
          class="eclat-btn eclat-btn--ghost"
          :href="page.phoneHref">
          <SvgIcon name="phone" />
          {{ page.phone }}
        </a>
      </div>
      <ul class="eclat-hero__points">
        <li
          v-for="point in page.hero.points"
          :key="point">
          <SvgIcon name="check" />
          {{ point }}
        </li>
      </ul>
    </div>
    <div class="eclat-hero__media">
      <div class="eclat-hero__photo">
        <img
          ref="heroImageElement"
          :src="displayedHeroImage"
          :alt="`Réalisation de ${page.businessName}`"
          fetchpriority="high"
          @load="replaceTooSmallHeroImage" />
      </div>
      <div
        v-if="page.googleRating"
        class="eclat-notch eclat-hero__rating">
        <strong>{{ page.googleRating.value }}</strong>
        <span>
          <StarRating :rating="5" />
          <span class="eclat-hero__rating-source">{{ ratingSource }}</span>
        </span>
      </div>
      <div
        v-else-if="page.city"
        class="eclat-notch eclat-hero__area">
        <span class="eclat-tile"><SvgIcon name="pin" /></span>
        <span>
          <strong>{{ page.city }}</strong>
          <span>Secteur d'intervention</span>
        </span>
      </div>
      <div class="eclat-hero__second">
        <img
          :src="page.hero.secondaryImage"
          alt="" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { ComputedRef, Ref } from 'vue'
import type { EclatPageContent } from '../../types/EclatPageContent'
import { computed, onMounted, ref } from 'vue'
import { ECLAT_MINIMUM_HERO_IMAGE_WIDTH } from '../../content/eclatDefaults'
import { useEclatPage } from '../../content/eclatPage'
import StarRating from '../parts/StarRating.vue'
import SvgIcon from '../parts/SvgIcon.vue'

const page: ComputedRef<EclatPageContent> = useEclatPage()

const heroImageElement: Ref<HTMLImageElement | null> = ref<HTMLImageElement | null>(null)
const isHeroImageTooSmall: Ref<boolean> = ref<boolean>(false)

const badgeLine: ComputedRef<string> = computed((): string =>
  page.value.city ? `${page.value.hero.badge} · ${page.value.city}` : page.value.hero.badge,
)

const ratingSource: ComputedRef<string> = computed((): string =>
  page.value.googleRating?.reviewsCount
    ? `${page.value.googleRating.reviewsCount} avis Google`
    : 'Avis Google',
)

const displayedHeroImage: ComputedRef<string> = computed((): string =>
  isHeroImageTooSmall.value ? page.value.hero.fallbackImage : page.value.hero.image,
)

/**
 * Remplace la photo d'en-tête du prospect par celle de la template quand elle est trop petite pour le cadre.
 */
function replaceTooSmallHeroImage(): void {
  const image: HTMLImageElement | null = heroImageElement.value
  if (!image || image.naturalWidth === 0) return
  if (image.naturalWidth < ECLAT_MINIMUM_HERO_IMAGE_WIDTH) {
    isHeroImageTooSmall.value = true
  }
}

onMounted((): void => {
  if (heroImageElement.value?.complete) {
    replaceTooSmallHeroImage()
  }
})
</script>

<style scoped>
.eclat-hero {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.12fr) minmax(0, 0.88fr);
  align-items: center;
  gap: 76px;
  padding-top: 68px;
}

.eclat-hero__text > *,
.eclat-hero__media {
  animation: eclat-hero-rise 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}

.eclat-hero__title {
  margin-top: 22px;
  color: var(--eclat-ink);
  font-size: 66px;
  font-weight: 650;
  line-height: 1.04;
  letter-spacing: -0.034em;
  text-wrap: balance;
  animation-delay: 0.06s;
}

.eclat-hero__title em {
  color: var(--eclat-accent-large);
  font-style: normal;
}

.eclat-hero__lead {
  display: -webkit-box;
  max-width: 47ch;
  margin-top: 26px;
  overflow: hidden;
  font-size: 19px;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  line-clamp: 5;
  animation-delay: 0.12s;
}

.eclat-hero__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px;
  margin-top: 36px;
  animation-delay: 0.18s;
}

.eclat-hero__points {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 26px;
  margin-top: 34px;
  color: var(--eclat-ink);
  font-size: 15.5px;
  font-weight: 500;
  animation-delay: 0.24s;
}

.eclat-hero__points li {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.eclat-hero__points svg {
  width: 17px;
  height: 17px;
  color: var(--eclat-accent-ink);
}

.eclat-hero__media {
  position: relative;
  animation-delay: 0.14s;
}

.eclat-hero__media::before {
  position: absolute;
  inset: -20px -20px 72px 72px;
  border-radius: 44px;
  background: var(--eclat-accent-soft);
  content: '';
}

.eclat-hero__photo {
  position: relative;
  aspect-ratio: 514 / 572;
  overflow: hidden;
  border-radius: 32px;
  background: var(--eclat-band);
}

.eclat-hero__photo img,
.eclat-hero__second img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.eclat-hero__rating strong {
  color: var(--eclat-ink);
  font-size: 46px;
  font-weight: 650;
  line-height: 1;
  letter-spacing: -0.035em;
}

.eclat-hero__rating > span,
.eclat-hero__area > span:last-child {
  display: flex;
  flex-direction: column;
  min-width: 0;
  color: var(--eclat-muted);
  font-size: 14.5px;
  line-height: 1.45;
}

.eclat-hero__rating-source {
  margin-top: 2px;
}

.eclat-hero__area strong {
  overflow: hidden;
  color: var(--eclat-ink);
  font-size: 18px;
  font-weight: 650;
  line-height: 1.25;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.eclat-hero__second {
  position: absolute;
  right: -24px;
  bottom: -40px;
  z-index: 3;
  width: 43%;
  aspect-ratio: 4 / 3.3;
  overflow: hidden;
  border: 8px solid var(--eclat-page);
  border-radius: 28px;
  background: var(--eclat-band);
}

@keyframes eclat-hero-rise {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
}

@media (max-width: 1040px) {
  .eclat-hero {
    grid-template-columns: 1fr;
    gap: 48px;
    padding-top: 40px;
  }

  .eclat-hero__title {
    font-size: 56px;
  }

  .eclat-hero__media {
    max-width: 560px;
  }
}

@media (max-width: 640px) {
  .eclat-hero {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding-top: 26px;
  }

  .eclat-hero__text {
    display: contents;
  }

  .eclat-hero__badge {
    order: 1;
    font-size: 12px;
  }

  .eclat-hero__title {
    order: 2;
    margin-top: 14px;
    font-size: 41px;
    line-height: 1.05;
  }

  .eclat-hero__media {
    order: 3;
    width: 100%;
    margin-top: 28px;
  }

  .eclat-hero__media::before {
    display: none;
  }

  .eclat-hero__lead {
    order: 4;
    margin-top: 56px;
    font-size: 17.5px;
  }

  .eclat-hero__actions {
    order: 5;
    gap: 10px;
    margin-top: 26px;
  }

  .eclat-hero__actions .eclat-btn {
    width: 100%;
    height: 54px;
  }

  .eclat-hero__points {
    order: 6;
    gap: 8px 20px;
    margin-top: 24px;
    font-size: 15px;
  }

  .eclat-hero__photo {
    aspect-ratio: 5 / 4.6;
    border-radius: 24px;
  }

  .eclat-hero__rating strong {
    font-size: 32px;
  }

  .eclat-hero__rating > span,
  .eclat-hero__area > span:last-child {
    font-size: 13px;
  }

  .eclat-hero__area {
    max-width: 58%;
  }

  .eclat-hero__area strong {
    font-size: 16px;
  }

  .eclat-hero__area .eclat-tile {
    width: 40px;
    height: 40px;
  }

  .eclat-hero__second {
    right: 12px;
    bottom: -34px;
    width: 38%;
    border-width: 5px;
    border-radius: 18px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .eclat-hero__text > *,
  .eclat-hero__media {
    animation: none;
  }
}
</style>
