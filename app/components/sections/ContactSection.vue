<template>
  <section
    id="contact"
    class="eclat-section eclat-section--band eclat-contact">
    <div class="eclat-shell">
      <div
        class="eclat-contact__grid"
        :class="{ 'eclat-contact__grid--single': !page.email }">
        <div>
          <span
            v-eclat-reveal
            class="eclat-eyebrow">
            Contact
          </span>
          <h2
            v-eclat-reveal
            class="eclat-title">
            {{ page.contact.heading }}
          </h2>
          <p
            v-eclat-reveal
            class="eclat-lead eclat-contact__lead">
            {{ page.contact.lead }}
          </p>
          <ul
            v-eclat-reveal
            class="eclat-contact__details">
            <li v-if="page.phoneHref">
              <span class="eclat-tile"><SvgIcon name="phone" /></span>
              <span>
                <span class="eclat-contact__label">Téléphone</span>
                <a :href="page.phoneHref">{{ page.phone }}</a>
              </span>
            </li>
            <li v-if="page.email">
              <span class="eclat-tile"><SvgIcon name="mail" /></span>
              <span>
                <span class="eclat-contact__label">E-mail</span>
                <a :href="`mailto:${page.email}`">{{ page.email }}</a>
              </span>
            </li>
            <li v-if="page.address">
              <span class="eclat-tile"><SvgIcon name="pin" /></span>
              <span>
                <span class="eclat-contact__label">Adresse</span>
                <strong>{{ page.address }}</strong>
              </span>
            </li>
            <li v-else-if="page.area || page.city">
              <span class="eclat-tile"><SvgIcon name="area" /></span>
              <span>
                <span class="eclat-contact__label">Secteur</span>
                <strong>{{ page.area || page.city }}</strong>
              </span>
            </li>
            <li v-if="page.contact.openingHours.length > 0">
              <span class="eclat-tile"><SvgIcon name="clock" /></span>
              <span>
                <span class="eclat-contact__label">Horaires</span>
                <span class="eclat-contact__hours">
                  <template
                    v-for="slot in page.contact.openingHours"
                    :key="slot.day">
                    <span>{{ slot.day }}</span>
                    <span>{{ slot.hours }}</span>
                  </template>
                </span>
              </span>
            </li>
          </ul>
        </div>
        <form
          v-if="page.email"
          v-eclat-reveal
          class="eclat-quote-form"
          @submit.prevent="openQuoteRequestEmail">
          <h3>{{ page.hero.quoteLabel }}</h3>
          <label class="eclat-quote-form__field">
            <span>Nom</span>
            <input
              v-model="quoteRequest.name"
              type="text"
              autocomplete="name"
              required />
          </label>
          <label class="eclat-quote-form__field">
            <span>Téléphone</span>
            <input
              v-model="quoteRequest.phone"
              type="tel"
              inputmode="tel"
              autocomplete="tel" />
          </label>
          <label class="eclat-quote-form__field eclat-quote-form__field--wide">
            <span>E-mail</span>
            <input
              v-model="quoteRequest.email"
              type="email"
              autocomplete="email" />
          </label>
          <label class="eclat-quote-form__field eclat-quote-form__field--wide">
            <span>Votre besoin</span>
            <textarea
              v-model="quoteRequest.message"
              required
              placeholder="Par exemple : tableau à remplacer dans une maison de 1975."></textarea>
          </label>
          <button
            class="eclat-btn"
            type="submit">
            Envoyer ma demande
          </button>
          <p class="eclat-quote-form__note">Devis gratuit et sans engagement.</p>
        </form>
      </div>
      <div
        v-if="page.contact.map"
        v-eclat-reveal
        class="eclat-map">
        <iframe
          :src="page.contact.map.embedUrl"
          title="Carte du secteur d'intervention"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"></iframe>
        <div
          v-if="page.contact.map.label"
          class="eclat-map__card">
          <span class="eclat-tile"><SvgIcon name="pin" /></span>
          <span>
            <strong>{{ page.contact.map.label }}</strong>
            <span>Secteur d'intervention</span>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { ComputedRef } from 'vue'
import type { EclatPageContent } from '../../types/EclatPageContent'
import { reactive } from 'vue'
import { useEclatPage } from '../../content/eclatPage'
import { vEclatReveal } from '../../directives/vEclatReveal'
import SvgIcon from '../parts/SvgIcon.vue'

type QuoteRequest = {
  name: string
  phone: string
  email: string
  message: string
}

const page: ComputedRef<EclatPageContent> = useEclatPage()

const quoteRequest: QuoteRequest = reactive<QuoteRequest>({
  name: '',
  phone: '',
  email: '',
  message: '',
})

/**
 * Ouvre la messagerie du visiteur sur un e-mail prérempli, adressé à l'entreprise, avec sa demande de devis.
 */
function openQuoteRequestEmail(): void {
  const subject: string = encodeURIComponent(`Demande de devis de ${quoteRequest.name}`)
  const body: string = encodeURIComponent(
    [
      `Nom : ${quoteRequest.name}`,
      `Téléphone : ${quoteRequest.phone || 'non renseigné'}`,
      `E-mail : ${quoteRequest.email || 'non renseigné'}`,
      '',
      'Besoin :',
      quoteRequest.message,
    ].join('\n'),
  )
  window.location.href = `mailto:${page.value.email}?subject=${subject}&body=${body}`
}
</script>

<style scoped>
.eclat-contact__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
  align-items: start;
  gap: 76px;
}

.eclat-contact__grid--single {
  grid-template-columns: minmax(0, 720px);
}

.eclat-contact__lead {
  max-width: 42ch;
  margin-top: 18px;
}

.eclat-contact__details {
  margin-top: 34px;
  border-top: 1px solid var(--eclat-line-strong);
}

.eclat-contact__details li {
  display: grid;
  grid-template-columns: 46px 1fr;
  align-items: center;
  gap: 18px;
  padding: 18px 0;
  border-bottom: 1px solid var(--eclat-line-strong);
}

.eclat-contact__details .eclat-tile {
  background: var(--eclat-page);
}

.eclat-contact__details li > span:last-child {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.eclat-contact__label {
  color: var(--eclat-muted);
  font-size: 12.5px;
  font-weight: 650;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.eclat-contact__details a,
.eclat-contact__details strong {
  overflow-wrap: anywhere;
  color: var(--eclat-ink);
  font-size: 18px;
  font-weight: 650;
  line-height: 1.35;
}

.eclat-contact__hours {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 2px 18px;
  color: var(--eclat-ink);
  font-size: 16.5px;
  font-weight: 500;
}

.eclat-contact__hours span:nth-child(even) {
  color: var(--eclat-body);
  font-weight: 400;
}

.eclat-quote-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  padding: 40px;
  border-radius: 28px;
  background: var(--eclat-page);
  box-shadow: 0 30px 60px -46px rgba(11, 27, 46, 0.45);
}

.eclat-quote-form h3 {
  grid-column: 1 / -1;
  color: var(--eclat-ink);
  font-size: 24px;
  font-weight: 650;
  letter-spacing: -0.02em;
}

.eclat-quote-form__field {
  display: grid;
  gap: 8px;
}

.eclat-quote-form__field--wide {
  grid-column: 1 / -1;
}

.eclat-quote-form__field span {
  color: var(--eclat-ink);
  font-size: 14.5px;
  font-weight: 500;
}

.eclat-quote-form__field input,
.eclat-quote-form__field textarea {
  width: 100%;
  padding: 15px 16px;
  border: 1px solid var(--eclat-line-strong);
  border-radius: 12px;
  background: var(--eclat-page);
  color: var(--eclat-ink);
  font-size: 16px;
  line-height: 1.4;
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.eclat-quote-form__field textarea {
  min-height: 124px;
  resize: vertical;
}

.eclat-quote-form__field input:focus,
.eclat-quote-form__field textarea:focus {
  border-color: var(--eclat-ink);
  box-shadow: 0 0 0 4px rgba(11, 27, 46, 0.08);
}

.eclat-quote-form .eclat-btn {
  grid-column: 1 / -1;
}

.eclat-quote-form__note {
  grid-column: 1 / -1;
  color: var(--eclat-muted);
  font-size: 14px;
  text-align: center;
}

.eclat-map {
  position: relative;
  height: 400px;
  margin-top: 76px;
  overflow: hidden;
  border-radius: 32px;
  background: #dfe6e2;
}

.eclat-map iframe {
  width: 100%;
  height: 100%;
  border: 0;
  filter: saturate(0.8);
}

.eclat-map__card {
  position: absolute;
  top: 24px;
  right: 24px;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 20px 14px 14px;
  border-radius: 18px;
  background: var(--eclat-page);
  box-shadow: 0 18px 40px -22px rgba(11, 27, 46, 0.5);
}

.eclat-map__card > span:last-child {
  display: flex;
  flex-direction: column;
  color: var(--eclat-muted);
  font-size: 14.5px;
  line-height: 1.35;
}

.eclat-map__card strong {
  color: var(--eclat-ink);
  font-size: 16.5px;
  font-weight: 650;
}

@media (max-width: 1040px) {
  .eclat-contact__grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}

@media (max-width: 640px) {
  .eclat-quote-form {
    grid-template-columns: 1fr;
    padding: 24px 20px;
    border-radius: 22px;
  }

  .eclat-quote-form__field {
    grid-column: 1 / -1;
  }

  .eclat-map {
    height: 300px;
    margin-top: 44px;
    border-radius: 24px;
  }

  .eclat-map__card {
    top: 12px;
    right: 12px;
    left: 12px;
  }
}
</style>
