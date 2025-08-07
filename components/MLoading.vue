<template>
  <div>
    <v-dialog
      v-model="internalValue" 
      scrollable
      :persistent="persistent"
      :overlay="false"
      :max-width="maxWidth"
      transition="dialog-transition"
      
    >
      <v-card width="200" height="100">
        <v-card-text class="d-flex justify-center pt-4"
          > <v-row justify="start" align="center"
              ><v-col cols="3"  align="center"
                ><v-progress-circular
                  indeterminate
                  color="primary"
                ></v-progress-circular
              ></v-col>
              <v-col cols="6"
                ><h3 class="lao-font pt-2">Loading...</h3></v-col
              ></v-row
            >
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    maxWidth: {
      type: [String, Number],
      default: 300,
    },
    persistent: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    internalValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
  },
  methods: {
    close() {},
  },
}
</script>

<style lang="scss" scoped>
.parent {
 
  justify-content: center; /* center horizontally */
  align-items: center;    /* center vertically */
  
}
</style>
