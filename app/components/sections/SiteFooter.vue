<template>
  <footer class="eclat-footer">
    <div class="eclat-shell eclat-footer__grid">
      <div>
        <BrandMark />
        <p class="eclat-footer__tagline">{{ page.footer.tagline }}</p>
        <ul
          v-if="page.footer.social.length > 0"
          class="eclat-footer__social">
          <li
            v-for="link in page.footer.social"
            :key="link.url">
            <a
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer">
              <SvgIcon :name="socialIcon(link.network)" />
              {{ socialLabel(link.network) }}
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h3>Contact</h3>
        <ul>
          <li v-if="page.phoneHref">
            <a :href="page.phoneHref">{{ page.phone }}</a>
          </li>
          <li v-if="page.email">
            <a :href="`mailto:${page.email}`">{{ page.email }}</a>
          </li>
          <li v-if="page.address || page.area || page.city">
            {{ page.address || page.area || page.city }}
          </li>
        </ul>
      </div>
      <div>
        <h3>Navigation</h3>
        <ul>
          <li><a href="#prestations">Prestations</a></li>
          <li><a href="#a-propos">À propos</a></li>
          <li><a href="#realisations">Réalisations</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
      <div>
        <h3>Prestations</h3>
        <ul>
          <li
            v-for="service in page.services.items"
            :key="service.title">
            {{ service.title }}
          </li>
        </ul>
      </div>
    </div>
    <div class="eclat-shell eclat-footer__bottom">
      <p>© {{ currentYear }} {{ page.businessName }}</p>
      <p v-if="page.footer.licenseLine">{{ page.footer.licenseLine }}</p>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import type { ComputedRef } from 'vue'
import type { EclatPageContent } from '../../types/EclatPageContent'
import type { SvgIconName } from '../../types/SvgIcon'
import { useEclatPage } from '../../content/eclatPage'
import BrandMark from '../parts/BrandMark.vue'
import SvgIcon from '../parts/SvgIcon.vue'

const page: ComputedRef<EclatPageContent> = useEclatPage()

const currentYear: number = new Date().getFullYear()

/**
 * Icône d'un réseau social.
 * @param network - Nom du réseau tel que stocké dans le contenu (« facebook », « instagram »…).
 * @returns L'icône du réseau, ou un maillon pour un réseau inconnu.
 */
function socialIcon(network: string): SvgIconName {
  const normalizedNetwork: string = network.toLowerCase()
  if (normalizedNetwork.includes('facebook')) return 'facebook'
  if (normalizedNetwork.includes('instagram')) return 'instagram'
  return 'link'
}

/**
 * Nom d'un réseau social à afficher.
 * @param network - Nom du réseau tel que stocké dans le contenu.
 * @returns Le nom avec une majuscule, ou « Site » quand il est vide.
 */
function socialLabel(network: string): string {
  return network ? network.charAt(0).toUpperCase() + network.slice(1) : 'Site'
}
</script>

<style scoped>
.eclat-footer {
  background: var(--eclat-night);
  color: var(--eclat-night-muted);
  font-size: 15.5px;
}

.eclat-footer__grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 0.8fr 1fr;
  gap: 56px;
  padding: 84px 0 56px;
}

.eclat-footer :deep(.eclat-brand) {
  color: #ffffff;
}

.eclat-footer :deep(.eclat-brand__logo) {
  border-color: transparent;
}

.eclat-footer__tagline {
  max-width: 34ch;
  margin-top: 18px;
}

.eclat-footer h3 {
  color: #ffffff;
  font-size: 13px;
  font-weight: 650;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.eclat-footer ul {
  display: grid;
  gap: 12px;
  margin-top: 20px;
}

.eclat-footer li {
  overflow-wrap: anywhere;
}

.eclat-footer a {
  transition: color 0.2s ease;
}

.eclat-footer a:hover {
  color: #ffffff;
}

.eclat-footer__social a {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #ffffff;
}

.eclat-footer__social svg {
  width: 20px;
  height: 20px;
}

.eclat-footer__bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 12px 24px;
  padding: 24px 0 32px;
  border-top: 1px solid var(--eclat-night-line);
  font-size: 14.5px;
}

@media (max-width: 1040px) {
  .eclat-footer__grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 640px) {
  .eclat-footer__grid {
    grid-template-columns: 1fr;
    gap: 36px;
    padding: 56px 0 40px;
  }
}
</style>
