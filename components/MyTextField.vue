<template>
  <v-text-field
    v-model="model"
    :label="label"
    :placeholder="placeholder"
    :type="type"
    :rules="rules"
    :clearable="clearable"
    v-bind="$attrs"
    :variant="variant"
    :rounded="rounded"
    :prepend-icon="prependIcon"
    :append-icon="appendIcon"
  />
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  prependIcon: String,
  appendIcon: String,
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: "outlined",
  },
  dense: {
    type: Boolean,
    default: false,
  },
  rounded: {
    type: Boolean,
    default: false,
  },
  rules: {
    type: Array,
    default: () => [],
  },
});


const emit = defineEmits(["update:modelValue"]);

const model = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>
