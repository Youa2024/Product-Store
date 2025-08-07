<template>
  <v-btn
    @click="downloadExcel()"
    :class="Customclass"
    :color="color"
    :block="block"
    :icon="icon"
    :tile="tile"
    :rounded="rounded"
    :small="small"
    :large="large"
    :outlined="outlined"
    :disabled="disabled"
    :text="text"
    :loading="loading"
    :label="label"
    :width="width"
    :vicon="vicon"
    :iconOnly="iconOnly"
    :size="size"
    v-bind="attrs"
    v-on="on"
    :ripple="ripple"
    
  >
    <v-icon left>mdi-download</v-icon>
    Download Excel
  </v-btn>
</template>

<script>
import * as XLSX from 'xlsx'

export default {
  name: 'DownloadTableExcel',
  props: {
    ripple: {
      // <--- New prop
      type: [Boolean, Object],
      default: true,
    },
    size: { type: [String, Number], default: '30' },
    on: Object,
    attrs: Object,
    width: String,
    disabled: Boolean,
    text: Boolean,
    label: String,
    loading: Boolean,
    iconOnly: Boolean,
    Customclass: {
      type: String,
      default: 'custom-btn',
    },
    color: {
      type: String,
      default: 'primary',
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    },
    vicon: String,
    icon: Boolean,
    tile: { type: Boolean, default: false },
    rounded: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    large: {
      type: Boolean,
      default: false,
    },
    headers: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    filename: {
      type: String,
      default: 'table_data.xlsx',
    },
    sheetName: {
      type: String,
      default: 'Sheet1',
    },
    columnsToExclude: {
      // 👈 Add this
      type: Array,
      default: () => [],
    },
  },

  methods: {
    downloadExcel() {
      const data = this.items.map((item, index) => {
        const row = {'No.': index+1}
        this.headers.forEach((header) => {
          // skip exculded columns
          if (!this.columnsToExclude.includes(header.value)) {
            row[header.text || header.value] = item[header.value]
          }
          // Use header.text as column name, item[header.value] as value
        })
        return row
      })

      const worksheet = XLSX.utils.json_to_sheet(data)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, this.sheetName)

      XLSX.writeFile(workbook, this.filename)
    },
  },
}
</script>
<style lang="scss" scoped>
.custom-btn {
  font-weight: 500;

  transition: all 0.2s ease-in-out;
  text-transform: capitalize;
}
.custom-btn:hover {
  filter: brightness(1.1);
  transform: scale(1.02);
}
</style>