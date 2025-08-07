<template>
  <div>
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="formatterDate"
          :label="label"
          prepend-inner-icon="mdi-calendar"
          readonly
          outlined
          :rounded="rounded"
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="internalValue"
        @input="updateDate"
        hide-actions
      ></v-date-picker>
    </v-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: false,
      internalValue: this.value,
    }
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    label: String,
    rounded: Boolean,
    closeOnContentClick: {
      type: Boolean,
      default: false,
    },
    // min: {
    //   type: Boolean,
    //   default: false,
    // },
    // max: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  watch: {
    value(val) {
      this.internalValue = val
    },
  },
  computed: {
    formatterDate() {
      return this.internalValue ? this.internalValue : ''
    },
  },
  methods: {
    updateDate(date) {
      this.internalValue = date
      this.$emit('input', date)
      this.menu = false
    },
  },
}
</script>

<style lang="scss" scoped></style>
