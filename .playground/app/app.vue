<template>
  <ElectricianEclatRoot :content="displayedContent" />
</template>

<script lang="ts" setup>
import type { ComputedRef, Ref } from 'vue'
import { computed, onMounted, ref } from 'vue'
import type { EclatSiteContentInput } from '../../app/types/EclatPageContent'
import { leanMockSiteContent, richMockSiteContent } from '../../content'

const route: ReturnType<typeof useRoute> = useRoute()

const localFixtureContent: Ref<EclatSiteContentInput | null> = ref<EclatSiteContentInput | null>(
  null,
)

const displayedContent: ComputedRef<EclatSiteContentInput> = computed((): EclatSiteContentInput => {
  if (localFixtureContent.value) return localFixtureContent.value
  return route.query.mock === 'rich' ? richMockSiteContent : leanMockSiteContent
})

/**
 * Charge un contenu local non versionné (`.playground/public/fixtures/<nom>.json`) quand l'adresse porte `?fixture=<nom>`.
 */
async function loadLocalFixture(): Promise<void> {
  const fixtureName: string = typeof route.query.fixture === 'string' ? route.query.fixture : ''
  if (!/^[\w-]+$/.test(fixtureName)) return
  const response: Response = await fetch(`/fixtures/${fixtureName}.json`)
  if (response.ok) {
    localFixtureContent.value = (await response.json()) as EclatSiteContentInput
  }
}

onMounted((): void => {
  void loadLocalFixture()
})
</script>
