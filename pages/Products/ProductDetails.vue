<template>
  <v-container grid-list-xs>
    <v-card color="primary" class="pa-1">
      <v-card rounded="xl"><v-card-text>
          <v-row><v-col cols="12" md="6" sm="6">
              <v-text-field rounded="xl" :label="$t('search')" clearable prepend-inner-icon="mdi-magnify"
                v-model="search"></v-text-field></v-col></v-row>
          <v-row><v-col cols="3" v-for="(i, index) in pDetails"><v-card width="280px" height="300px" :style="{
            backgroundImage: `url(${i.packageUrl})`,
            backgroundSize: 'cover'
          }" class=" custom-radius" @click="viewDetailsForOrder(i)">
                <v-card style="margin-top: 150px" width="280px" height="150px" class="my-card text-white custom-radius">
                  <v-card-title primary-title class=""> {{ i.productName }} </v-card-title>
                  <v-card-text>
                    <h5>{{ i.companyName }}({{ i.branchName }})</h5>
                    <p>{{ $t('price_unit') }}: <b>{{ formatCurrency(i.lakUnit) }}/kip</b></p>
                    <p>{{ $t('price_package') }}: <b>{{ formatCurrency(i.lakPackage) }}/kip</b></p>
                  </v-card-text>
                </v-card>
              </v-card></v-col></v-row>
        </v-card-text>
      </v-card>
    </v-card>
    <v-dialog v-model="viewDetails" scrollable persistent :overlay="false" fullscreen transition="dialog-transition">
      <v-card>
        <v-card-title primary-title class="d-flex justify-startspace-between "
          style="background-color: #1976D2; color: white;">
          <h4>{{ $t('product_details') }}</h4><v-spacer></v-spacer>
          <v-btn color="red" @click="cancel()">X</v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-row><v-col cols="12" md="6">
              <v-card class="pl-1 pr-1 pt-3 pb-3" outlined>
                <v-carousel height="800" transition-duration="600">
                  <v-carousel-item v-for="(img, i) in imageDetails" :key="i" :src="img" cover />
                </v-carousel>
              </v-card>
            </v-col><v-col cols="12" md="6">
              <h3>{{ itemDetails.companyName }}({{ itemDetails.branchName }})</h3>
              <v-divider></v-divider>
              <h2>{{ itemDetails.productName }}</h2>
              <v-row><v-col cols="6"> <v-card variant="outlined" class="pa-2">
                    <v-card-title primary-title>

                      {{ $t('price') }} <b class="text-red">(KIP)</b>
                    </v-card-title>
                    <v-divider></v-divider>
                    <h4 :class="package_size == true ? 'text-green' : ''">{{ $t('price_package') }}: {{
                      formatCurrency(itemDetails.lakPackage) }}/kip</h4>
                    <h4 :class="unit_size == true ? 'text-green' : ''"> {{ $t('price_unit') }}: {{
                      formatCurrency(itemDetails.lakUnit) }}/kip</h4>

                  </v-card></v-col><v-col cols="6"> <v-card variant="outlined" class="pa-2">
                    <v-card-title primary-title>
                      {{ $t('price') }} <b class="text-red">(THB)</b>
                    </v-card-title>
                    <v-divider></v-divider>
                    <h4 :class="package_size == true ? 'text-green' : ''">{{ $t('price_package') }}: {{
                      formatCurrency(itemDetails.thbPackage) }}/kip</h4>
                    <h4 :class="unit_size == true ? 'text-green' : ''">{{ $t('price_unit') }}: {{
                      formatCurrency(itemDetails.thbUnit) }}/kip</h4>

                  </v-card></v-col></v-row>

              <br>
              <v-btn color="primary" variant="outlined">{{ $t('select_size') }}</v-btn>:
              <v-btn :color="unit_size == true ? 'primary' : 'grey'" @click="selectedItem('unit')" class="mr-4">{{
                $t('unit') }}</v-btn>
              <v-btn :color="package_size == true ? 'primary' : 'grey'" @click="selectedItem('package')">{{
                $t('package') }}</v-btn>

              <br />
              <br>

              <v-row><v-col cols="12">
                  <div class="d-flex align-center">
                    <v-btn color="primary">{{ $t('add_qty') }} </v-btn>:
                    <v-icon @click="decrease()">mdi-minus</v-icon>
                    <v-btn color="primary">{{ counter }}</v-btn>
                    <v-icon @click="count()" class="mr-5">mdi-plus</v-icon>

                  </div>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <br>
              <div class="d-flex justify-end"><v-card variant="outlined">
                  <v-card-title primary-title>
                    {{ $t('exchange_branch_date') }}: <p class="text-blue">{{
                      branchExchange.length > 0 ? branchExchange[0].createDate : '' }}</p>
                  </v-card-title>
                  <v-card-text>
                    <p>THB:{{ formatCurrency(branchExchange[0].thb) }}</p>
                    <p>USD: {{ formatCurrency(branchExchange[0].usd) }}</p>
                  </v-card-text>
                </v-card></div>
              <br><br>
              <h3>{{ $t('total') }}: <v-btn color="green" variant="outlined">{{ formatCurrency(amount) }}</v-btn> <b
                  class="text-blue">KIP</b></h3>
              <h3 class="pt-2">{{ $t('total') }}: <v-btn color="red" variant="outlined">{{ formatCurrency(amountTHB)
              }}</v-btn> <b class="text-red">THB</b></h3>
            </v-col></v-row>

        </v-card-text>
        <v-card-actions>
          <v-btn color="secondary" variant="outlined" @click="cancel()"><v-icon>mdi-cancel</v-icon>{{ $t('btn_cancel')
          }}</v-btn>
          <v-btn color="primary" variant="outlined"><v-icon>mdi-checkbox-marked</v-icon> {{ $t('add_to_card') }}</v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const viewDetails = ref(false)
const search = ref("")
const select = ref(false)
const itemDetails = ref([])
const counter = ref(0)
const { formatCurrency } = useInputFormatNumber()
const { showWarning } = useAlert()
const exChangeRate = useExchangeStore()
const imageDetails = ref([])
const product = useProductStore()
const pDetails = computed(() => product.products)
const unit_size = ref(false)
const package_size = ref(false)
const amount = ref(0)
const amountTHB = ref(0)

const branchExchange = computed(() => exChangeRate.exchanges)

const selectedItem = (size) => {
  if (size === 'unit') {
    counter.value = 0
    unit_size.value = true

    package_size.value = false
  } else if (size === 'package') {

    counter.value = 0
    package_size.value = true
    unit_size.value = false
  }
  select.value = !select.value
}

const cancel = () => {
  viewDetails.value = false
  counter.value = 0
  amount.value = 0
  amountTHB.value = 0
  unit_size.value = false
  package_size.value = false
}
const count = () => {
  if (unit_size.value == false && package_size.value == false) {
    showWarning($t('desc_select_size'))
    console.log("=================please select size");

    return
  }
  counter.value++
  const qty = counter.value
  if (unit_size.value == true) {
    if (itemDetails.value.thbUnit != null || itemDetails.value.thbUnit != '') {
      amount.value = (parseFloat(itemDetails.value.lakUnit.replace(/,/g, ''))) * qty * parseFloat(branchExchange.value[0].thb.replace(/,/g, ''))

    } else {
      amount.value = (parseFloat(itemDetails.value.lakUnit.replace(/,/g, ''))) * qty
    }
    amountTHB.value = (parseFloat(itemDetails.value.thbUnit.replace(/,/g, ''))) * qty
  } else if (package_size.value == true) {
    if (itemDetails.value.thbUnit != null || itemDetails.value.thbUnit != '') {
      amount.value = (parseFloat(itemDetails.value.lakUnit.replace(/,/g, ''))) * qty * parseFloat(branchExchange.value[0].thb.replace(/,/g, ''))
    } else {
      amount.value = (parseFloat(itemDetails.value.lakUnit.replace(/,/g, ''))) * qty
    }
    // amount.value = (parseFloat(itemDetails.value.lakUnit.replace(/,/g, ''))) * qty
    amountTHB.value = (parseFloat(itemDetails.value.thbUnit.replace(/,/g, ''))) * qty

  }
  console.log("==========3333333======:", amount.value);
}

const decrease = () => {
  if (counter.value > 0) {
    counter.value--
    const qty = counter.value
    if (unit_size.value == true) {
      if (itemDetails.value.thbUnit != null || itemDetails.value.thbUnit != '') {
        amount.value = (parseFloat(itemDetails.value.lakUnit.replace(/,/g, ''))) * qty * parseFloat(branchExchange.value[0].thb.replace(/,/g, ''))

      } else {
        amount.value = (parseFloat(itemDetails.value.lakUnit.replace(/,/g, ''))) * qty
      }
      // amount.value = (parseFloat(itemDetails.value.lakUnit.replace(/,/g, ''))) * qty
      amountTHB.value = (parseFloat(itemDetails.value.thbUnit.replace(/,/g, ''))) * qty
    } else if (package_size.value == true) {
      if (itemDetails.value.thbUnit != null || itemDetails.value.thbUnit != '') {
        amount.value = (parseFloat(itemDetails.value.lakUnit.replace(/,/g, ''))) * qty * parseFloat(branchExchange.value[0].thb.replace(/,/g, ''))

      } else {
        amount.value = (parseFloat(itemDetails.value.lakUnit.replace(/,/g, ''))) * qty
      }
      // amount.value = (parseFloat(itemDetails.value.lakUnit.replace(/,/g, ''))) * qty
      amountTHB.value = (parseFloat(itemDetails.value.thbUnit.replace(/,/g, ''))) * qty

    }
    console.log("==========3333333======:", amount.value);
  }
}

const viewDetailsForOrder = (item) => {
  imageDetails.value = []
  viewDetails.value = true
  itemDetails.value = item
  imageDetails.value.push(item.packageUrl)
  imageDetails.value.push(item.unitUrl)
}

onMounted(async () => {
  console.log("Before fetch:", pDetails.value)
  await product.fetchProducts()
  console.log("After fetch:", pDetails.value)
  counter.value = 0
  exChangeRate.getExchangeByBranch(1)
})

</script>

<style lang="scss" scoped>
.my-card {
  background-color: rgba(49, 133, 81, 0.521) !important;
  /* black tint */
  color: #070707;
  /* make text readable */
}

.custom-radius {
  border-top-left-radius: 20px;
  /* round top-left */
  border-top-right-radius: 0;
  /* square top-right */
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 0;
}

.centered-input input {
  text-align: center;
}
</style>