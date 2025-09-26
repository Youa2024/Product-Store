<template>
  <v-container>
    <v-card color="primary" class="pa-1">
      <v-card rounded="xl">
        <v-card-title primary-title class="d-flex justify-center">
          {{ $t("exchange_rate") }}
        </v-card-title>
        <v-divider></v-divider>
        <v-form @submit.prevent>
          <v-card-text>
            <v-row justify="center" align="center"
              ><v-col cols="12" md="6" sm="6">
                <v-select
                  rounded
                  variant="outlined"
                  :label="$t('select') + $t('conpany_name')"
                  v-model="groupId"
                  :rules="rules"
                ></v-select>
                <v-text-field
                  rounded="xl"
                  label="KIP"
                  prepend-inner-icon="mdi-numeric-1-box"
                  clearable
                  v-model="lak_rate"
                  :rules="rules"
                ></v-text-field>
                <v-text-field
                  rounded="xl"
                  label="THB"
                  prepend-inner-icon="mdi-currency-thb"
                  clearable
                  v-model="thb_rate"
                  :rules="rules"
                ></v-text-field>
                <v-text-field
                  rounded="xl"
                  label="USD"
                  prepend-inner-icon="mdi-currency-usd"
                  clearable
                  v-model="usd_rate"
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
const groupId = ref("");
const lak_rate = ref(null);
const thb_rate = ref(null);
const usd_rate = ref(null);
// role for feild
const rules = [
  (value) => {
    if (value) return true;
    return t("rule");
  },
];
</script>

<style lang="scss" scoped></style>
