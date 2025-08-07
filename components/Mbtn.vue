<script setup lang="ts">
const props = defineProps<{
  color?: string
  icon?: string
  label?: string
  flat?: boolean
  rounded?: boolean
  block?: boolean
}>()

const emit = defineEmits<{
  (event: 'click', e: MouseEvent): void
}>()
</script>

<template>
  <v-btn
    :color="color || 'primary'"
    :flat="flat"
    :rounded="rounded"
    :block="block"
    @click="emit('click', $event)"
  >
    <v-icon v-if="icon" start>{{ icon }}</v-icon>
    <span v-if="label">{{ label }}</span>
    <slot />
  </v-btn>
</template>
