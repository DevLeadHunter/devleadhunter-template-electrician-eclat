<template>
  <div
    class="eclat-trust eclat-shell"
    data-section="reperes">
    <ul
      v-eclat-reveal
      class="eclat-trust__list"
      :style="{ '--eclat-trust-columns': page.trustItems.length }">
      <li
        v-for="item in page.trustItems"
        :key="`${item.value}-${item.label}`"
        class="eclat-trust__item">
        <span class="eclat-tile"><SvgIcon :name="item.icon" /></span>
        <span class="eclat-trust__text">
          <strong>{{ item.value }}</strong>
          <span>{{ item.label }}</span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import type { ComputedRef } from 'vue'
import type { EclatPageContent } from '../../types/EclatPageContent'
import { useEclatPage } from '../../content/eclatPage'
import { vEclatReveal } from '../../directives/vEclatReveal'
import SvgIcon from '../parts/SvgIcon.vue'

const page: ComputedRef<EclatPageContent> = useEclatPage()
</script>

<style scoped>
.eclat-trust__list {
  display: grid;
  grid-template-columns: repeat(var(--eclat-trust-columns, 4), minmax(0, 1fr));
  margin-top: 104px;
  border: 1px solid var(--eclat-line);
  border-radius: 22px;
  background: var(--eclat-page);
}

.eclat-trust__item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 26px 28px;
}

.eclat-trust__item + .eclat-trust__item {
  border-left: 1px solid var(--eclat-line);
}

.eclat-trust__text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.eclat-trust__text strong {
  color: var(--eclat-ink);
  font-size: 19px;
  font-weight: 650;
  line-height: 1.25;
  letter-spacing: -0.015em;
}

.eclat-trust__text span {
  margin-top: 2px;
  color: var(--eclat-muted);
  font-size: 14.5px;
  line-height: 1.4;
}

@media (max-width: 1040px) {
  .eclat-trust__list {
    grid-template-columns: 1fr 1fr;
  }

  .eclat-trust__item:nth-child(odd) {
    border-left: 0;
  }

  .eclat-trust__item:nth-child(n + 3) {
    border-top: 1px solid var(--eclat-line);
  }
}

@media (max-width: 640px) {
  .eclat-trust__list {
    margin-top: 44px;
    border-radius: 20px;
  }

  .eclat-trust__item {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 18px;
  }

  .eclat-trust__item .eclat-tile {
    width: 40px;
    height: 40px;
  }

  .eclat-trust__text strong {
    font-size: 17px;
  }

  .eclat-trust__text span {
    font-size: 13.5px;
  }
}
</style>
