<template>
  <svg
    viewBox="0 0 24 24"
    :fill="shape.isFilled ? 'currentColor' : 'none'"
    :stroke="shape.isFilled ? 'none' : 'currentColor'"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false">
    <path
      v-for="path in shape.paths"
      :key="path"
      :d="path" />
  </svg>
</template>

<script lang="ts" setup>
import type { ComputedRef, PropType } from 'vue'
import type { SvgIconName, SvgIconProps, SvgIconShape } from '../../types/SvgIcon'
import { computed } from 'vue'
import { ECLAT_ICON_SHAPES } from '../../content/eclatIcons'

/**
 * Icône décorative de la template, dessinée au trait dans la couleur du texte.
 */
const props: SvgIconProps = defineProps({
  name: {
    type: String as PropType<SvgIconName>,
    required: true,
  },
})

const shape: ComputedRef<SvgIconShape> = computed((): SvgIconShape => ECLAT_ICON_SHAPES[props.name])
</script>
