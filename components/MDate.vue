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
      <template v-slot:activator="{ props }">
        <v-text-field
          v-model="formattedDate"
          :label="label"
          outlined
          readonly
          :rounded="rounded"
          v-bind="props"
          class="primary"
        >
          <template v-slot:prepend-inner>
            <v-icon color="primary">mdi-calendar</v-icon>
            <!-- 🎨 only icon is red -->
          </template>
        </v-text-field>
      </template>

      <v-date-picker
        v-model="internalValue"
        type="date"
        color="primary"
        @update:model-value="updateDate"
        hide-actions
      />
    </v-menu>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    label: String,
    rounded: Boolean,
  },
  data() {
    return {
      menu: false,
      internalValue: this.modelValue, // raw ISO date (YYYY-MM-DD)
    };
  },
  watch: {
    modelValue(val) {
      this.internalValue = val;
    },
  },
  computed: {
    formattedDate() {
      if (!this.internalValue) return "";
      const [year, month, day] = this.internalValue.split("-");
      return `${year}-${month}-${day}`; // ✅ dd-mm-yyyy
    },
  },
  methods: {
    updateDate(date) {
      // if it's a Date object, format manually
      let onlyDate = "";

      if (date instanceof Date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        onlyDate = `${year}-${month}-${day}`; // keep ISO internally
      } else {
      }

      this.internalValue = onlyDate;
      this.$emit("update:modelValue", onlyDate); // parent always gets yyyy-mm-dd
      this.menu = false;
    },
  },
};
</script>
