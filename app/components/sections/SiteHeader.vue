<template>
  <header class="eclat-header">
    <div class="eclat-shell eclat-header__row">
      <a
        class="eclat-header__brand"
        href="#top"
        :aria-label="`${page.businessName}, haut de page`">
        <BrandMark />
      </a>
      <nav
        class="eclat-header__nav"
        aria-label="Navigation principale">
        <a
          v-for="link in navigationLinks"
          :key="link.href"
          :href="link.href">
          {{ link.label }}
        </a>
      </nav>
      <div class="eclat-header__actions">
        <a
          v-if="page.phoneHref"
          class="eclat-header__phone"
          :href="page.phoneHref"
          :aria-label="`Appeler le ${page.phone}`">
          <SvgIcon name="phone" />
          <span>{{ page.phone }}</span>
        </a>
        <a
          class="eclat-btn eclat-header__quote"
          href="#contact">
          {{ page.hero.quoteLabel }}
        </a>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import { useEclatPage } from '../../content/eclatPage'
import type { EclatPageContent } from '../../types/EclatPageContent'
import BrandMark from '../parts/BrandMark.vue'
import SvgIcon from '../parts/SvgIcon.vue'

type NavigationLink = {
  label: string
  href: string
}

const page: ComputedRef<EclatPageContent> = useEclatPage()

const navigationLinks: ComputedRef<NavigationLink[]> = computed((): NavigationLink[] => {
  const links: NavigationLink[] = [
    { label: 'Prestations', href: '#prestations' },
    { label: 'À propos', href: '#a-propos' },
    { label: 'Réalisations', href: '#realisations' },
  ]
  if (page.value.reviews.items.length > 0) {
    links.push({ label: 'Avis', href: '#avis' })
  }
  links.push({ label: 'Questions', href: '#questions' }, { label: 'Contact', href: '#contact' })
  return links
})
</script>

<style scoped>
.eclat-header {
  position: sticky;
  top: 0;
  z-index: 30;
  border-bottom: 1px solid var(--eclat-line);
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(14px);
}

.eclat-header__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  height: var(--eclat-header-height);
}

.eclat-header__brand {
  min-width: 0;
}

.eclat-header__nav {
  display: flex;
  gap: 34px;
  color: var(--eclat-body);
  font-size: 16px;
  font-weight: 500;
}

.eclat-header__nav a {
  transition: color 0.2s ease;
}

.eclat-header__nav a:hover {
  color: var(--eclat-ink);
}

.eclat-header__actions {
  display: flex;
  flex: none;
  align-items: center;
  gap: 26px;
}

.eclat-header__phone {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--eclat-ink);
  font-weight: 650;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.eclat-header__phone svg {
  width: 18px;
  height: 18px;
  color: var(--eclat-accent-ink);
}

.eclat-header__quote {
  height: 46px;
  padding: 0 20px;
  font-size: 15px;
}

@media (max-width: 1120px) {
  .eclat-header__nav {
    display: none;
  }
}

@media (max-width: 640px) {
  .eclat-header__quote,
  .eclat-header__phone span {
    display: none;
  }

  .eclat-header__phone {
    justify-content: center;
    width: 44px;
    height: 44px;
    border: 1.5px solid var(--eclat-line-strong);
    border-radius: 12px;
  }
}
</style>
