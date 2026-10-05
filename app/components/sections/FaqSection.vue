<template>
  <section
    id="questions"
    class="eclat-section eclat-faq">
    <div class="eclat-shell eclat-faq__grid">
      <div class="eclat-faq__intro">
        <span
          v-eclat-reveal
          class="eclat-eyebrow">
          Questions
        </span>
        <h2
          v-eclat-reveal
          class="eclat-title">
          {{ page.faq.heading }}
        </h2>
        <p
          v-eclat-reveal
          class="eclat-lead eclat-faq__lead">
          {{ page.faq.lead }}
        </p>
        <div
          v-if="page.phoneHref"
          v-eclat-reveal
          class="eclat-faq__help">
          <span class="eclat-tile"><SvgIcon name="phone" /></span>
          <span>
            <span>Une autre question ?</span>
            <a :href="page.phoneHref">{{ page.phone }}</a>
          </span>
        </div>
      </div>
      <div
        v-eclat-reveal
        class="eclat-faq__list">
        <div
          v-for="(item, index) in page.faq.questions"
          :key="item.question"
          class="eclat-faq__item"
          :class="{ 'eclat-faq__item--open': openQuestionIndex === index }">
          <h3>
            <button
              :id="`eclat-faq-question-${index}`"
              type="button"
              :aria-expanded="openQuestionIndex === index"
              :aria-controls="`eclat-faq-answer-${index}`"
              @click="toggleQuestion(index)">
              <span>{{ item.question }}</span>
              <span class="eclat-faq__chevron"><SvgIcon name="chevron-down" /></span>
            </button>
          </h3>
          <div
            :id="`eclat-faq-answer-${index}`"
            class="eclat-faq__answer"
            role="region"
            :aria-labelledby="`eclat-faq-question-${index}`">
            <div>
              <p>{{ item.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { ComputedRef, Ref } from 'vue'
import { ref } from 'vue'
import { useEclatPage } from '../../content/eclatPage'
import { vEclatReveal } from '../../directives/vEclatReveal'
import type { EclatPageContent } from '../../types/EclatPageContent'
import SvgIcon from '../parts/SvgIcon.vue'

const page: ComputedRef<EclatPageContent> = useEclatPage()

const openQuestionIndex: Ref<number | null> = ref<number | null>(0)

/**
 * Ouvre la question demandée, ou la referme si elle était déjà ouverte.
 * @param index - Position de la question dans la liste.
 */
function toggleQuestion(index: number): void {
  openQuestionIndex.value = openQuestionIndex.value === index ? null : index
}
</script>

<style scoped>
.eclat-faq__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.78fr) minmax(0, 1.22fr);
  align-items: start;
  gap: 84px;
}

.eclat-faq__intro {
  position: sticky;
  top: calc(var(--eclat-header-height) + 44px);
}

.eclat-faq__lead {
  max-width: 34ch;
  margin-top: 18px;
}

.eclat-faq__help {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 34px;
  padding: 18px 20px;
  border: 1px solid var(--eclat-line);
  border-radius: 20px;
}

.eclat-faq__help > span:last-child {
  display: flex;
  flex-direction: column;
  color: var(--eclat-muted);
  font-size: 14px;
  line-height: 1.4;
}

.eclat-faq__help a {
  color: var(--eclat-ink);
  font-size: 19px;
  font-weight: 650;
  font-variant-numeric: tabular-nums;
}

.eclat-faq__list {
  display: grid;
  gap: 12px;
}

.eclat-faq__item {
  border: 1px solid var(--eclat-line);
  border-radius: 18px;
  background: var(--eclat-page);
  transition:
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.eclat-faq__item--open {
  border-color: var(--eclat-line-strong);
  box-shadow: 0 22px 44px -34px rgba(11, 27, 46, 0.4);
}

.eclat-faq__item button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  width: 100%;
  padding: 22px 22px 22px 26px;
  color: var(--eclat-ink);
  font-size: 19px;
  font-weight: 650;
  line-height: 1.35;
  letter-spacing: -0.012em;
  text-align: left;
  cursor: pointer;
}

.eclat-faq__chevron {
  display: grid;
  flex: none;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: var(--eclat-accent-soft);
  color: var(--eclat-accent-ink);
  transition: transform 0.3s ease;
}

.eclat-faq__chevron svg {
  width: 18px;
  height: 18px;
}

.eclat-faq__item--open .eclat-faq__chevron {
  transform: rotate(180deg);
}

.eclat-faq__answer {
  display: grid;
  grid-template-rows: 0fr;
  visibility: hidden;
  transition:
    grid-template-rows 0.35s cubic-bezier(0.3, 0.7, 0.2, 1),
    visibility 0.35s;
}

.eclat-faq__item--open .eclat-faq__answer {
  grid-template-rows: 1fr;
  visibility: visible;
}

.eclat-faq__answer > div {
  overflow: hidden;
}

.eclat-faq__answer p {
  padding: 0 84px 24px 26px;
  font-size: 16.5px;
}

@media (max-width: 1040px) {
  .eclat-faq__grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .eclat-faq__intro {
    position: static;
  }
}

@media (max-width: 640px) {
  .eclat-faq__item button {
    padding: 18px 16px 18px 20px;
    font-size: 17.5px;
  }

  .eclat-faq__answer p {
    padding: 0 20px 20px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .eclat-faq__answer,
  .eclat-faq__chevron {
    transition: none;
  }
}
</style>
