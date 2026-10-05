<template>
  <span
    class="eclat-stars"
    role="img"
    :aria-label="`Note : ${props.rating} sur 5`">
    <SvgIcon
      v-for="position in 5"
      :key="position"
      name="star"
      class="eclat-stars__star"
      :class="{ 'eclat-stars__star--empty': position > filledStarsCount }" />
  </span>
</template>

<script lang="ts" setup>
import type { ComputedRef } from 'vue'
import type { StarRatingProps } from '../../types/StarRating'
import { computed } from 'vue'
import SvgIcon from './SvgIcon.vue'

/**
 * Cinq étoiles, remplies jusqu'à la note donnée.
 */
const props: StarRatingProps = defineProps({
  rating: {
    type: Number,
    default: 5,
  },
})

const filledStarsCount: ComputedRef<number> = computed((): number => Math.round(props.rating))
</script>

<style scoped>
.eclat-stars {
  display: inline-flex;
  gap: 2px;
  color: var(--eclat-star);
}

.eclat-stars__star {
  width: 17px;
  height: 17px;
}

.eclat-stars__star--empty {
  color: var(--eclat-line-strong);
}
</style>
