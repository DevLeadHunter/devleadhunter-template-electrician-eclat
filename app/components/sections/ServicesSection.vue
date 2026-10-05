<template>
  <section
    id="prestations"
    class="eclat-section eclat-services">
    <div class="eclat-shell">
      <div class="eclat-services__head">
        <div>
          <span
            v-eclat-reveal
            class="eclat-eyebrow">
            Prestations
          </span>
          <h2
            v-eclat-reveal
            class="eclat-title">
            {{ page.services.heading }}
          </h2>
        </div>
        <p
          v-eclat-reveal
          class="eclat-lead">
          {{ page.services.lead }}
        </p>
      </div>
      <div class="eclat-services__grid">
        <article
          v-for="(service, index) in page.services.items"
          :key="service.title"
          v-eclat-reveal="(index % 3) * 70"
          class="eclat-service">
          <figure class="eclat-service__photo">
            <img
              :src="service.image"
              alt=""
              loading="lazy" />
          </figure>
          <div class="eclat-service__label">
            <span>{{ service.number }}</span>
            <h3>{{ service.title }}</h3>
          </div>
          <p class="eclat-service__description">{{ service.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { ComputedRef } from 'vue'
import { useEclatPage } from '../../content/eclatPage'
import { vEclatReveal } from '../../directives/vEclatReveal'
import type { EclatPageContent } from '../../types/EclatPageContent'

const page: ComputedRef<EclatPageContent> = useEclatPage()
</script>

<style scoped>
.eclat-services__head {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
  align-items: end;
  gap: 64px;
}

.eclat-services__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 48px 26px;
  margin-top: 60px;
}

.eclat-service {
  display: grid;
}

.eclat-service__photo {
  grid-area: 1 / 1;
  aspect-ratio: 4 / 3.1;
  overflow: hidden;
  border-radius: 24px;
  background: var(--eclat-band);
}

.eclat-service__photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.eclat-service:hover .eclat-service__photo img {
  transform: scale(1.05);
}

.eclat-service__label {
  position: relative;
  display: flex;
  grid-area: 1 / 1;
  align-items: baseline;
  align-self: end;
  justify-self: start;
  gap: 12px;
  max-width: 90%;
  padding: 16px 24px 0 0;
  border-top-right-radius: var(--eclat-notch);
  background: var(--eclat-notch-bg);
}

.eclat-service__label::before,
.eclat-service__label::after {
  position: absolute;
  width: var(--eclat-notch);
  height: var(--eclat-notch);
  background: radial-gradient(
    circle at 100% 0,
    transparent calc(var(--eclat-notch) - 0.6px),
    var(--eclat-notch-bg) var(--eclat-notch)
  );
  content: '';
}

.eclat-service__label::before {
  top: calc(var(--eclat-notch) * -1);
  left: 0;
}

.eclat-service__label::after {
  bottom: 0;
  left: 100%;
}

.eclat-service__label span {
  color: var(--eclat-accent-ink);
  font-size: 14px;
  font-weight: 650;
  font-variant-numeric: tabular-nums;
}

.eclat-service__label h3 {
  color: var(--eclat-ink);
  font-size: 22px;
  font-weight: 650;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.eclat-service__description {
  max-width: 38ch;
  margin-top: 10px;
  font-size: 16.5px;
}

@media (max-width: 1040px) {
  .eclat-services__head {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .eclat-services__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .eclat-services__grid {
    grid-template-columns: 1fr;
    gap: 0;
    margin-top: 34px;
    border-top: 1px solid var(--eclat-line);
  }

  .eclat-service {
    grid-template-columns: 104px 1fr;
    column-gap: 18px;
    padding: 18px 0;
    border-bottom: 1px solid var(--eclat-line);
  }

  .eclat-service__photo {
    grid-area: 1 / 1 / 3 / 2;
    aspect-ratio: 1;
    border-radius: 18px;
  }

  .eclat-service__label {
    grid-area: 1 / 2;
    gap: 10px;
    max-width: none;
    padding: 0;
    background: none;
  }

  .eclat-service__label::before,
  .eclat-service__label::after {
    display: none;
  }

  .eclat-service__label h3 {
    font-size: 19px;
  }

  .eclat-service__description {
    grid-area: 2 / 2;
    margin-top: 4px;
    font-size: 15.5px;
    line-height: 1.5;
  }
}
</style>
