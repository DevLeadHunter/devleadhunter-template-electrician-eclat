<template>
  <section
    id="avis"
    class="eclat-section eclat-section--band eclat-reviews">
    <div class="eclat-shell">
      <div class="eclat-reviews__head">
        <div>
          <span
            v-eclat-reveal
            class="eclat-eyebrow">
            Avis clients
          </span>
          <h2
            v-eclat-reveal
            class="eclat-title">
            {{ page.reviews.heading }}
          </h2>
        </div>
        <div
          v-if="page.googleRating"
          v-eclat-reveal
          class="eclat-reviews__score">
          <strong>{{ page.googleRating.value }}</strong>
          <span>
            <StarRating :rating="5" />
            <span>{{ ratingSource }}</span>
          </span>
        </div>
      </div>
      <div class="eclat-reviews__grid">
        <blockquote
          v-for="(review, index) in page.reviews.items"
          :key="`${review.author}-${index}`"
          v-eclat-reveal="(index % 3) * 70"
          class="eclat-review">
          <StarRating :rating="review.rating" />
          <p>{{ review.text }}</p>
          <footer>
            <span class="eclat-review__initials">{{ review.initials }}</span>
            <span class="eclat-review__author">
              <strong>{{ review.author }}</strong>
              <span>Avis Google</span>
            </span>
          </footer>
        </blockquote>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import { useEclatPage } from '../../content/eclatPage'
import { vEclatReveal } from '../../directives/vEclatReveal'
import type { EclatPageContent } from '../../types/EclatPageContent'
import StarRating from '../parts/StarRating.vue'

const page: ComputedRef<EclatPageContent> = useEclatPage()

const ratingSource: ComputedRef<string> = computed((): string =>
  page.value.googleRating?.reviewsCount
    ? `${page.value.googleRating.reviewsCount} avis Google`
    : 'Avis Google',
)
</script>

<style scoped>
.eclat-reviews__head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 32px;
}

.eclat-reviews__score {
  display: inline-flex;
  align-items: center;
  gap: 18px;
}

.eclat-reviews__score strong {
  color: var(--eclat-ink);
  font-size: 58px;
  font-weight: 650;
  line-height: 1;
  letter-spacing: -0.04em;
}

.eclat-reviews__score > span {
  display: flex;
  flex-direction: column;
  gap: 3px;
  color: var(--eclat-muted);
  font-size: 15px;
  line-height: 1.4;
}

.eclat-reviews__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
  margin-top: 52px;
}

.eclat-review {
  display: flex;
  flex-direction: column;
  padding: 30px;
  border-radius: 24px;
  background: var(--eclat-page);
}

.eclat-review p {
  margin-top: 18px;
  color: var(--eclat-ink);
  font-size: 17px;
}

.eclat-review footer {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: auto;
  padding-top: 26px;
}

.eclat-review__initials {
  display: grid;
  flex: none;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: var(--eclat-accent-soft);
  color: var(--eclat-accent-ink);
  font-size: 15px;
  font-weight: 650;
}

.eclat-review__author {
  display: flex;
  flex-direction: column;
  color: var(--eclat-muted);
  font-size: 14px;
  line-height: 1.35;
}

.eclat-review__author strong {
  color: var(--eclat-ink);
  font-size: 16px;
  font-weight: 650;
}

@media (max-width: 1040px) {
  .eclat-reviews__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .eclat-reviews__head {
    flex-direction: column;
    align-items: flex-start;
    gap: 22px;
  }

  .eclat-reviews__score strong {
    font-size: 48px;
  }

  .eclat-reviews__grid {
    gap: 14px;
    margin-top: 34px;
  }

  .eclat-review {
    padding: 24px;
  }
}
</style>
