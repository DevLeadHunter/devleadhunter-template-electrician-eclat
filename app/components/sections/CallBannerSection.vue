<template>
  <section
    id="devis"
    class="eclat-section eclat-banner">
    <div class="eclat-shell">
      <div
        v-eclat-reveal
        class="eclat-banner__card">
        <div class="eclat-banner__text">
          <span class="eclat-eyebrow">{{ regionalLabel(page, 'Devis gratuit') }}</span>
          <h2>{{ page.callBanner.title }}</h2>
          <p>{{ page.callBanner.lead }}</p>
          <a
            class="eclat-btn eclat-btn--light"
            href="#contact">
            {{ page.hero.quoteLabel }}
          </a>
        </div>
        <div class="eclat-banner__photo">
          <img
            :src="page.callBanner.image"
            alt=""
            loading="lazy" />
        </div>
        <div
          v-if="page.phoneHref"
          class="eclat-notch eclat-notch--right eclat-banner__phone">
          <span>Par téléphone</span>
          <a :href="page.phoneHref">{{ page.phone }}</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { ComputedRef } from 'vue'
import type { EclatPageContent } from '../../types/EclatPageContent'
import { regionalLabel } from '@devleadhunter/website-content'
import { useEclatPage } from '../../content/eclatPage'
import { vEclatReveal } from '../../directives/vEclatReveal'

const page: ComputedRef<EclatPageContent> = useEclatPage()
</script>

<style scoped>
.eclat-banner {
  padding-top: 0;
}

.eclat-banner__card {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
  min-height: 440px;
  border-radius: 32px;
  background: var(--eclat-night);
  color: var(--eclat-night-muted);
}

.eclat-banner__text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 72px 64px;
}

.eclat-banner__text .eclat-eyebrow {
  color: var(--eclat-accent);
}

.eclat-banner__text h2 {
  margin-top: 16px;
  color: #ffffff;
  font-size: 54px;
  font-weight: 650;
  line-height: 1.04;
  letter-spacing: -0.03em;
  text-wrap: balance;
}

.eclat-banner__text p {
  max-width: 40ch;
  margin-top: 18px;
  font-size: 19px;
}

.eclat-banner__text .eclat-btn {
  margin-top: 34px;
}

.eclat-banner__photo {
  position: relative;
  overflow: hidden;
  border-radius: 0 32px 32px 0;
}

.eclat-banner__photo img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.eclat-banner__photo::after {
  position: absolute;
  inset: 0 auto 0 0;
  width: 34%;
  background: linear-gradient(90deg, var(--eclat-night), transparent);
  content: '';
}

.eclat-banner__phone {
  display: block;
  padding-top: 18px;
}

.eclat-banner__phone span {
  display: block;
  color: var(--eclat-muted);
  font-size: 13px;
  font-weight: 650;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.eclat-banner__phone a {
  display: block;
  margin-top: 2px;
  color: var(--eclat-ink);
  font-size: 30px;
  font-weight: 650;
  line-height: 1.2;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

@media (max-width: 1040px) {
  .eclat-banner__card {
    grid-template-columns: 1fr;
  }

  .eclat-banner__text {
    padding: 56px 40px;
  }

  .eclat-banner__text h2 {
    font-size: 44px;
  }

  .eclat-banner__photo {
    aspect-ratio: 16 / 9;
    border-radius: 0 0 32px 32px;
  }

  .eclat-banner__photo::after {
    inset: 0 0 auto;
    width: auto;
    height: 30%;
    background: linear-gradient(180deg, var(--eclat-night), transparent);
  }
}

@media (max-width: 640px) {
  .eclat-banner__card {
    border-radius: 24px;
  }

  .eclat-banner__text {
    padding: 44px 26px 40px;
  }

  .eclat-banner__text h2 {
    font-size: 36px;
  }

  .eclat-banner__text p {
    font-size: 17.5px;
  }

  .eclat-banner__text .eclat-btn {
    width: 100%;
  }

  .eclat-banner__photo {
    aspect-ratio: 5 / 4;
    border-radius: 0 0 24px 24px;
  }

  .eclat-banner__phone a {
    font-size: 23px;
  }
}
</style>
