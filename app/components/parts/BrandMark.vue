<template>
  <span class="eclat-brand">
    <span
      class="eclat-brand__logo"
      :class="{ 'eclat-brand__logo--placeholder': !page.logo }">
      <img
        v-if="page.logo"
        :src="page.logo"
        alt="" />
      <SvgIcon
        v-else
        name="zap" />
    </span>
    <span class="eclat-brand__text">
      <span class="eclat-brand__name">{{ page.businessName }}</span>
      <span
        v-if="props.caption"
        class="eclat-brand__caption">
        {{ props.caption }}
      </span>
    </span>
  </span>
</template>

<script lang="ts" setup>
import type { ComputedRef } from 'vue'
import type { BrandMarkProps } from '../../types/BrandMark'
import type { EclatPageContent } from '../../types/EclatPageContent'
import { useEclatPage } from '../../content/eclatPage'
import SvgIcon from './SvgIcon.vue'

/**
 * Logo et nom de l'entreprise ; sans logo, une pastille à l'éclair le remplace.
 */
const props: BrandMarkProps = defineProps({
  caption: {
    type: String,
    default: '',
  },
})

const page: ComputedRef<EclatPageContent> = useEclatPage()
</script>

<style scoped>
.eclat-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--eclat-ink);
}

.eclat-brand__logo {
  flex: none;
  width: 44px;
  height: 44px;
  overflow: hidden;
  border: 1px solid var(--eclat-line);
  border-radius: 12px;
  background: #ffffff;
}

.eclat-brand__logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.eclat-brand__logo--placeholder {
  display: grid;
  place-items: center;
  border-color: transparent;
  background: var(--eclat-accent-soft);
  color: var(--eclat-accent-ink);
}

.eclat-brand__logo--placeholder svg {
  width: 22px;
  height: 22px;
}

.eclat-brand__text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.eclat-brand__name {
  font-size: 19px;
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.015em;
}

.eclat-brand__caption {
  margin-top: 3px;
  color: var(--eclat-muted);
  font-size: 14px;
  line-height: 1.3;
}

@media (max-width: 640px) {
  .eclat-brand__logo {
    width: 40px;
    height: 40px;
  }

  .eclat-brand__name {
    font-size: 17px;
  }
}
</style>
