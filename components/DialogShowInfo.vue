<!-- components/MyDialog.vue -->
<template>
  <v-dialog v-model="internalValue" :width="width">
    <v-card rounded="md">
      <v-card-title class="text-h5 d-flex justify-center"
        ><v-icon :color="iconColor == '' ? 'primary' : iconColor" size="70">{{
          icon
        }}</v-icon></v-card-title
      >
      <v-divider color="primary"></v-divider>
      <v-card-text>
        <slot />
        <br />
        <h3 class="text-center">{{ message }}</h3>
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <Mbtn @click="internalValue = false" label="Close"></Mbtn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
const props = defineProps({
  modelValue: Boolean,
  title: String,
  icon: String,
  message: String,
  iconColor: String,
  width: {
    type: [String, Number],
    default: 500,
  },
});

const emit = defineEmits(["update:modelValue"]);

const internalValue = ref(props.modelValue);

// Watch for external changes
watch(
  () => props.modelValue,
  (val) => {
    internalValue.value = val;
  }
);

// Emit changes back to parent
watch(internalValue, (val) => {
  emit("update:modelValue", val);
});
</script>
