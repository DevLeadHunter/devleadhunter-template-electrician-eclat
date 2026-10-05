<template>
  <section
    id="deroule"
    class="eclat-section eclat-section--night eclat-method">
    <div class="eclat-shell">
      <span
        v-eclat-reveal
        class="eclat-eyebrow">
        Déroulé
      </span>
      <h2
        v-eclat-reveal
        class="eclat-title">
        {{ page.method.heading }}
      </h2>
      <ol
        v-eclat-reveal:mark
        class="eclat-method__steps"
        :style="{ '--eclat-method-columns': page.method.steps.length }">
        <li
          v-for="(step, index) in page.method.steps"
          :key="step.title"
          v-eclat-reveal="index * 100"
          class="eclat-method__step">
          <span class="eclat-method__number">{{ step.number }}</span>
          <h3>{{ step.title }}</h3>
          <p>{{ step.description }}</p>
        </li>
      </ol>
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
.eclat-method__steps {
  position: relative;
  display: grid;
  grid-template-columns: repeat(var(--eclat-method-columns, 4), minmax(0, 1fr));
  margin-top: 60px;
  border-top: 1px solid var(--eclat-night-line);
}

.eclat-method__steps::after {
  position: absolute;
  top: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--eclat-accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 1.8s cubic-bezier(0.3, 0.7, 0.2, 1) 0.2s;
  content: '';
}

.eclat-method__steps.eclat-reveal--in::after {
  transform: scaleX(1);
}

.eclat-method__step {
  padding: 36px 32px 4px 0;
}

.eclat-method__step + .eclat-method__step {
  padding-left: 32px;
  border-left: 1px solid var(--eclat-night-line);
}

.eclat-method__number {
  display: block;
  color: var(--eclat-accent);
  font-size: 44px;
  font-weight: 650;
  line-height: 1;
  letter-spacing: -0.03em;
  font-variant-numeric: tabular-nums;
}

.eclat-method__step h3 {
  margin-top: 24px;
  color: #ffffff;
  font-size: 21px;
  font-weight: 650;
  line-height: 1.25;
  letter-spacing: -0.02em;
}

.eclat-method__step p {
  margin-top: 10px;
  font-size: 16px;
}

@media (max-width: 1040px) {
  .eclat-method__steps {
    grid-template-columns: 1fr 1fr;
  }

  .eclat-method__step:nth-child(odd) {
    padding-left: 0;
    border-left: 0;
  }

  .eclat-method__step:nth-child(n + 3) {
    margin-top: 28px;
    border-top: 1px solid var(--eclat-night-line);
  }
}

@media (max-width: 640px) {
  .eclat-method__steps {
    grid-template-columns: 1fr;
    margin-top: 40px;
  }

  .eclat-method__step,
  .eclat-method__step + .eclat-method__step,
  .eclat-method__step:nth-child(n + 3) {
    display: grid;
    grid-template-columns: 64px 1fr;
    column-gap: 8px;
    margin-top: 0;
    padding: 24px 0;
    border-top: 0;
    border-bottom: 1px solid var(--eclat-night-line);
    border-left: 0;
  }

  .eclat-method__number {
    grid-row: 1 / 3;
    font-size: 32px;
  }

  .eclat-method__step h3 {
    margin-top: 0;
    font-size: 19px;
  }

  .eclat-method__step p {
    margin-top: 6px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .eclat-method__steps::after {
    transform: scaleX(1);
    transition: none;
  }
}
</style>
