<template>
  <v-container>
    <v-card color="primary" class="pa-1">
      <v-card rounded="xl">
        <v-card-title primary-title class="d-flex justify-center">
          {{ $t("product_type") }}
        </v-card-title>
        <v-divider></v-divider>
        <v-form @submit.prevent>
          <v-card-text>
            <v-row justify="center" align="center"
              ><v-col cols="12" md="6" sm="6">
                <v-text-field
                  rounded="xl"
                  :label="$t('product_type')"
                  prepend-inner-icon="mdi-format-list-bulleted-type"
                  clearable
                  v-model="product_type"
                  :rules="rules"
                ></v-text-field> </v-col
            ></v-row>
          </v-card-text>
          <v-card-actions>
            <v-row justify="center" align="center"
              ><v-col cols="12" md="6" sm="6">
                <v-btn
                  color="primary"
                  rounded="xl"
                  variant="outlined"
                  type="submit"
                  block
                  ><v-icon class="mr-4">mdi-content-save-all</v-icon
                  >{{ $t("save") }}</v-btn
                ></v-col
              ></v-row
            >
            <br /><br /> </v-card-actions
        ></v-form>
      </v-card>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
const { t } = useI18n();
const product_type = ref("");
// role for feild
const rules = [
  (value) => {
    if (value) return true;
    return t("rule");
  },
];
</script>

<style lang="scss" scoped></style>
