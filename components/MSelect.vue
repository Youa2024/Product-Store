<template>
  <div>
    <v-select
      :items="items"
      v-model="internalValue"
      :item-text="itemText"
      :item-value="itemValue"
      :label="label"
      :outlined="outlined"
      :multiple="multiple"
      :disabled="disabled"
    ></v-select>
  </div>
</template>

<script>
export default {
  props: {
    value: [String, Number, Object, Array],

    items: { type: Array, required: true },
    outlined:{type:Boolean, default:true},
    multiple: { type: Boolean, default: false },
    clearable: { type: Boolean, default: true },
    label: String,
    itemText: String,
    itemValue: String,
    disabled: { type: Boolean, default: false },
  },
  computed: {
    internalValue: {
      get() {
        return this.value;
      },
       set(value) {
      this.$emit("input", value);
    },
    },
   
  },
};
</script>

<style lang="scss" scoped></style>
