<template>
  <div
    id="top"
    class="eclat"
    :style="accentStyle">
    <SiteHeader />
    <main>
      <HeroSection v-bind="editableAttrs(props.content._editable?.hero)" />
      <TrustStripSection v-bind="editableAttrs(props.content._editable?.trust)" />
      <ServicesSection v-bind="editableAttrs(props.content._editable?.services)" />
      <AboutSection v-bind="editableAttrs(props.content._editable?.about)" />
      <MethodSection v-bind="editableAttrs(props.content._editable?.method)" />
      <GallerySection v-bind="editableAttrs(props.content._editable?.gallery)" />
      <ReviewsSection
        v-if="page.reviews.items.length > 0"
        v-bind="editableAttrs(props.content._editable?.reviews)" />
      <FaqSection v-bind="editableAttrs(props.content._editable?.faq)" />
      <CallBannerSection v-bind="editableAttrs(props.content._editable?.contact)" />
      <ContactSection v-bind="editableAttrs(props.content._editable?.contact)" />
    </main>
    <SiteFooter />
  </div>
</template>

<script lang="ts" setup>
import type { ComputedRef, PropType } from 'vue'
import type { ElectricianEclatRootProps } from '../types/ElectricianEclatRoot'
import type { EclatPageContent, EclatSiteContentInput } from '../types/EclatPageContent'
import { editableAttrs } from '@devleadhunter/website-content'
import { computed, provide } from 'vue'
import { buildEclatContent } from '../content/buildEclatContent'
import { ECLAT_PAGE_KEY } from '../content/eclatPage'
import AboutSection from './sections/AboutSection.vue'
import CallBannerSection from './sections/CallBannerSection.vue'
import ContactSection from './sections/ContactSection.vue'
import FaqSection from './sections/FaqSection.vue'
import GallerySection from './sections/GallerySection.vue'
import HeroSection from './sections/HeroSection.vue'
import MethodSection from './sections/MethodSection.vue'
import ReviewsSection from './sections/ReviewsSection.vue'
import ServicesSection from './sections/ServicesSection.vue'
import SiteFooter from './sections/SiteFooter.vue'
import SiteHeader from './sections/SiteHeader.vue'
import TrustStripSection from './sections/TrustStripSection.vue'

type HeadMeta = { name?: string; property?: string; content: string }
type PageHead = {
  title: string
  htmlAttrs: { lang: string }
  meta: HeadMeta[]
  link: Record<string, string>[]
}

/**
 * Racine de la template « Électricien Éclat », seul point d'entrée rendu par demo-host.
 * `content` porte les données du prospect, toutes facultatives : chaque section retombe sur ses textes et photos par défaut.
 */
const props: ElectricianEclatRootProps = defineProps({
  content: {
    type: Object as PropType<EclatSiteContentInput>,
    required: true,
  },
})

const page: ComputedRef<EclatPageContent> = computed((): EclatPageContent =>
  buildEclatContent(props.content),
)

provide(ECLAT_PAGE_KEY, page)

const accentStyle: ComputedRef<Record<string, string>> = computed((): Record<string, string> => ({
  '--eclat-accent': page.value.accent.onNight,
  '--eclat-accent-large': page.value.accent.largeText,
  '--eclat-accent-ink': page.value.accent.smallText,
  '--eclat-accent-soft': page.value.accent.soft,
}))

useHead((): PageHead => {
  const title: string = page.value.city
    ? `${page.value.businessName}, électricien à ${page.value.city}`
    : page.value.businessName
  const description: string = page.value.hero.lead
  const meta: HeadMeta[] = [
    { name: 'description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: title },
    { property: 'og:site_name', content: page.value.businessName },
    { property: 'og:description', content: description },
  ]
  if (page.value.hero.image.startsWith('http')) {
    meta.push({ property: 'og:image', content: page.value.hero.image })
  }
  return {
    title,
    htmlAttrs: { lang: 'fr' },
    meta,
    link: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400..800&display=swap',
      },
    ],
  }
})
</script>
