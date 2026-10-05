<template>
  <section
    id="a-propos"
    class="eclat-section eclat-section--band eclat-about">
    <div class="eclat-shell eclat-about__grid">
      <div
        v-eclat-reveal
        class="eclat-about__media">
        <div class="eclat-about__photo">
          <img
            :src="page.about.image"
            :alt="`${page.businessName} au travail`"
            loading="lazy" />
        </div>
        <div class="eclat-notch eclat-notch--right">
          <BrandMark :caption="brandCaption" />
        </div>
      </div>
      <div>
        <span
          v-eclat-reveal
          class="eclat-eyebrow">
          À propos
        </span>
        <h2
          v-eclat-reveal
          class="eclat-title">
          {{ page.about.heading }}
        </h2>
        <p
          v-eclat-reveal
          class="eclat-lead eclat-about__text">
          {{ page.about.text }}
        </p>
        <dl
          v-if="page.about.facts.length > 0"
          v-eclat-reveal
          class="eclat-about__facts">
          <div
            v-for="fact in page.about.facts"
            :key="fact.label">
            <dt>{{ fact.label }}</dt>
            <dd>{{ fact.value }}</dd>
          </div>
        </dl>
        <a
          v-eclat-reveal
          class="eclat-btn eclat-btn--ghost eclat-about__quote"
          href="#contact">
          {{ page.hero.quoteLabel }}
        </a>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import { useEclatPage } from '../../content/eclatPage'
import { vEclatReveal } from '../../directives/vEclatReveal'
import type { EclatPageContent } from '../../types/EclatPageContent'
import BrandMark from '../parts/BrandMark.vue'

const page: ComputedRef<EclatPageContent> = useEclatPage()

const brandCaption: ComputedRef<string> = computed((): string =>
  page.value.city ? `${page.value.hero.badge} · ${page.value.city}` : page.value.hero.badge,
)
</script>

<style scoped>
.eclat-about__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.88fr) minmax(0, 1.12fr);
  align-items: center;
  gap: 92px;
}

.eclat-about__media {
  position: relative;
}

.eclat-about__photo {
  aspect-ratio: 4 / 4.5;
  overflow: hidden;
  border-radius: 32px;
  background: var(--eclat-line);
}

.eclat-about__photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.eclat-about__media :deep(.eclat-brand__name) {
  font-size: 17px;
}

.eclat-about__text {
  max-width: 58ch;
  margin-top: 22px;
  white-space: pre-line;
}

.eclat-about__facts {
  margin-top: 34px;
  border-top: 1px solid var(--eclat-line-strong);
}

.eclat-about__facts div {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 24px;
  padding: 17px 0;
  border-bottom: 1px solid var(--eclat-line-strong);
}

.eclat-about__facts dt {
  color: var(--eclat-muted);
  font-size: 15.5px;
}

.eclat-about__facts dd {
  color: var(--eclat-ink);
  font-size: 17px;
  font-weight: 650;
  text-align: right;
}

.eclat-about__quote {
  margin-top: 36px;
}

@media (max-width: 1040px) {
  .eclat-about__grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .eclat-about__media {
    max-width: 520px;
  }
}

@media (max-width: 640px) {
  .eclat-about__photo {
    border-radius: 24px;
  }

  .eclat-about__facts dd {
    font-size: 16px;
  }

  .eclat-about__quote {
    width: 100%;
  }
}
</style>
