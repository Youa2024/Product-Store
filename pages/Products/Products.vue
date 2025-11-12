<template>
  <v-container>
    <v-card color="primary" class="pa-1">
      <v-card rounded="xl">
        <v-card-title primary-title class="d-flex justify-center">
          {{ $t("product_info") }}
        </v-card-title>
        <v-divider></v-divider>
        <v-form @submit.prevent ref="form" v-model="isValid">
          <v-card-text>
            <v-row justify="center" align="start"
              ><v-col cols="12" md="6" sm="6">
                <v-btn
                  color="primary"
                  rounded="xl"
                  @click="dialogAddType = true"
                  ><v-icon>mdi-plus</v-icon>{{ $t("add")
                  }}{{ $t("product_type") }}</v-btn
                >
                <br />
                <br />
                <v-text-field
                  rounded="xl"
                  :label="$t('product_name')"
                  clearable
                  v-model="product_name"
                  :rules="rules"
                ></v-text-field>
                <v-select
                  rounded
                  :items="filteredItems"
                  variant="outlined"
                  :label="$t('select') + $t('product_type')"
                  v-model="productTypes"
                  :rules="rules"
                  :item-title="itemTitle"
                  @update:search="onSearch"
                  clearable
                  return-object
                ></v-select>

                <div class="d-flex" v-if="unitUrl != ''">
                  <v-card
                    class="ma-3"
                    width="150px"
                    height="150px"
                    elevation="1"
                    variant="outlined"
                    :style="{
                      backgroundImage: `url(${unitUrl})`,
                      backgroundSize: 'cover',
                    }"
                  >
                  </v-card
                  ><v-btn
                    variant="outlined"
                    color="primary"
                    rounded="xl"
                    @click="changeImage('unitUrl')"
                    >{{ $t("change_image") }}</v-btn
                  >
                </div>

                <v-file-input
                  v-else
                  :label="$t('product_image_unit')"
                  prepend-icon="mdi-camera"
                  variant="outlined"
                  rounded="xl"
                  v-model="unitFile"
                  :rules="rules"
                ></v-file-input>
                <div class="d-flex" v-if="packgeUrl != ''">
                  <v-card
                    class="ma-3"
                    width="150px"
                    height="150px"
                    elevation="1"
                    variant="outlined"
                    :style="{
                      backgroundImage: `url(${packgeUrl}) `,
                      backgroundSize: 'cover',
                    }"
                  >
                  </v-card>
                  <v-btn
                    color="primary"
                    variant="outlined"
                    rounded="xl"
                    @click="changeImage('packgeUrl')"
                    >{{ $t("change_image") }}</v-btn
                  >
                </div>

                <v-file-input
                  v-else
                  :label="$t('product_image_package')"
                  prepend-icon="mdi-camera"
                  variant="outlined"
                  rounded="xl"
                  v-model="packageFile"
                  :rules="rules"
                ></v-file-input> </v-col
            ></v-row>
          </v-card-text>
          <v-card-actions>
            <v-row justify="center" align="center"
              ><v-col cols="12" md="6" sm="6">
                <v-btn
                  v-if="productId == ''"
                  color="primary"
                  rounded="xl"
                  variant="outlined"
                  type="submit"
                  block
                  @click="insertProduct()"
                  ><v-icon class="mr-4">mdi-content-save-all</v-icon
                  >{{ $t("save") }}</v-btn
                >
                <v-btn
                  v-else
                  color="amber"
                  rounded="xl"
                  variant="outlined"
                  type="submit"
                  block
                  @click="updateProduct()"
                  ><v-icon class="mr-4">mdi-content-save-all</v-icon
                  >{{ $t("btn_edit") }}</v-btn
                ></v-col
              ></v-row
            >
            <br /><br /> </v-card-actions
        ></v-form>
      </v-card>

      <v-card rounded="xl" style="margin-top: 5px">
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="allProduct"
            hide-actions
            class="elevation-1"
            pagination.sync="pagination"
            item-key="id"
            :search="search"
          >
            <template #item.id="{ index, item }">
              {{ index + 1 }}
            </template>
            <template #item.fileUnitUrl="{ index, item }">
              <v-avatar>
                <v-img :src="item.fileUnitUrl"></v-img>
              </v-avatar>
            </template>
            <template #item.filePackageUrl="{ index, item }">
              <v-avatar>
                <v-img :src="item.filePackageUrl"></v-img>
              </v-avatar>
            </template>

            <template #item.actions="{ item }">
              <div class="d-flex">
                <v-btn color="grey" rounded="xl" @click="SelectItem(item)"
                  ><v-icon>mdi-pen</v-icon>{{ $t("btn_edit") }}</v-btn
                >
                <v-btn
                  color="red"
                  class="ml-3"
                  rounded="xl"
                  @click="confirmDelete(item)"
                  ><v-icon>mdi-delete-circle</v-icon
                  >{{ $t("btn_delete") }}</v-btn
                >
              </div>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-card>
    <MLoading v-model="loading"></MLoading>
    <v-dialog
      v-model="dialogAddType"
      scrollable
      persistent
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card rounded="xl">
        <v-card-title primary-title class="d-flex justify-center">
          {{ $t("product_type") }}
        </v-card-title>
        <v-divider></v-divider>
        <v-form @submit.prevent v-model="isValid" ref="form">
          <v-card-text>
            <v-row justify="center" align="center"
              ><v-col cols="12" md="6" sm="6">
                <v-text-field
                  rounded="xl"
                  :label="$t('product_type')"
                  prepend-inner-icon="mdi-format-list-bulleted-type"
                  clearable
                  @click:clear="onClear"
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
                  @click="insertProductType()"
                  ><v-icon class="mr-4">mdi-content-save-all</v-icon
                  >{{ id != null ? $t("btn_edit") : $t("save") }}</v-btn
                ></v-col
              ></v-row
            >
            <br /><br /> </v-card-actions
        ></v-form>
        <v-card-actions>
          <v-btn
            color="grey"
            @click="dialogAddType = false"
            variant="outlined"
            >{{ $t("btn_close") }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed } from "vue";
const { t } = useI18n();
const product_name = ref("");
const productItems = ref([]);
const productTypes = ref("");
const loading = ref(false);
const unitFile = ref(null);
const packageFile = ref(null);
const { showConfirm, showError, showSuccess } = useAlert();
const { mainApi } = useApi();
const isValid = ref(false);
const form = ref(null);
const allProduct = ref([]);
const unitUrl = ref("");
const packgeUrl = ref("");
const productId = ref("");
const itemTitle = ref("productType");
const filePackageName = ref("");
const fileUnitName = ref("");
const dialogAddType = ref(false);
const product_type = ref("");
const search = ref("");
const headers = ref([
  { title: "#", key: "id", align: "start" },
  { title: t("product_name"), key: "productName", align: "start" },
  { title: t("product_type"), key: "productType", align: "center" },
  { title: t("product_image_unit"), key: "fileUnitUrl", align: "center" },
  { title: t("product_image_package"), key: "filePackageUrl", align: "center" },
  { title: t("actions"), key: "actions", align: "end" },
]);
// role for feild
const rules = [
  (value) => {
    if (value) return true;
    return t("rule");
  },
];
onMounted(() => {
  getAllProductType();
  getAllProduct();
});

// When user types
const onSearch = (val) => {
  search.value = val;
};
// Filter items dynamically
const filteredItems = computed(() => {
  if (!search.value) return productItems.value;
  return productItems.value.filter((item) => {
    console.log("item", item.productType);
    console.log("item", search.value);
    item.productType.toLowerCase().includes(search.value.toLowerCase());
  });
});
// add product type
const insertProductType = async () => {
  if (product_type != "") {
    loading.value = true;
    const body = {
      productType: product_type.value,
    };
    const res = await mainApi.post("insertProductType", body);
    if (res.data.status == "00") {
      showSuccess(res.data.message);
      product_type.value = "";
      dialogAddType.value = false;
      loading.value = false;
      getAllProductType();
    }
  } else {
    showWarning("Please insert require feild");
  }
};
//delete product
const confirmDelete = (item) => {
  showConfirm("Do you want to delete this item!", () => {
    DeleteProduct(item);
  });
};
const DeleteProduct = async (item) => {
  console.log("item=============", item);

  // loading.value = true;
  var body = { id: item.id };
  const res = await mainApi.post("/deleteProduct", body);
  if (res.data.status == "00") {
    loading.value = false;
    showSuccess(res.data.message);
    getAllProduct();
    clearData();
    // allProduct.value = res.data.dataRes;
  } else {
    loading.value = false;
    showError(res.data.message);
  }
};
// update product
const updateProduct = async () => {
  console.log("============product id ===============:", productTypes.value.id);

  const formData = new FormData();
  formData.append("ProductTypeId", productTypes.value.id);
  formData.append("ProName", product_name.value);
  formData.append("unitFile", unitFile.value);
  formData.append("packageFile", packageFile.value);
  formData.append("id", productId.value);
  formData.append("filePackageName", filePackageName.value);
  formData.append("fileUnitName", fileUnitName.value);
  formData.append("filePackageUrl", packgeUrl.value);
  formData.append("fileUnitUrl", unitUrl.value);

  try {
    const res = await mainApi.post("/updateProduct", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.status == "00") {
      showSuccess(res.data.message);
      clearData();
      getAllProduct();
    }
    console.log("res==================", res);
  } catch (err) {
    console.log("err==================", err);
  }
};

const changeImage = (value) => {
  if (value == "unitUrl") {
    unitUrl.value = "";
  } else {
    packgeUrl.value = "";
  }
};
const SelectItem = (item) => {
  console.log("err==================", item);
  productId.value = item.id;
  // productTypes.value = item.productTypeId;
  product_name.value = item.productName;

  productTypes.value = {
    productType: item.productType,
    id: item.productTypeId,
  };

  unitUrl.value = item.fileUnitUrl == null ? "" : item.fileUnitUrl;
  packgeUrl.value = item.filePackageUrl == null ? "" : item.filePackageUrl;
  filePackageName.value = item.filePackageName;
  fileUnitName.value = item.fileUnitName;
};
const clearData = () => {
  productTypes.value = "";
  product_name.value = "";
  unitFile.value = null;
  packageFile.value = null;
};
const getAllProduct = async () => {
  loading.value = true;
  const res = await mainApi.get("/getProducts");
  if (res.data.status == "00") {
    loading.value = false;
    allProduct.value = res.data.dataRes;
  } else {
    loading.value = false;
    showError(res.data.message);
  }
};
const insertProduct = async () => {
  const { valid } = await form.value.validate();
  if (valid) {
    console.log("form is valid");
    const formData = new FormData();
    formData.append("ProductTypeId", productTypes.value.id);
    formData.append("ProName", product_name.value);
    formData.append("unitFile", unitFile.value);
    formData.append("packageFile", packageFile.value);
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    console.log("formData=============", formData.value);
    try {
      const res = await mainApi.post("/insertProduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.status == "00") {
        showSuccess(res.data.message);
        clearData();
        getAllProduct();
      }
      console.log("res==================", res);
    } catch (err) {
      console.log("err==================", err);
    }
  } else {
    console.log("fomr is invalid", productTypes.value);
  }
};
const getAllProductType = async () => {
  loading.value = true;
  const res = await mainApi.get("getAllProductType");
  if (res.data.status == "00") {
    loading.value = false;
    productItems.value = res.data.dataRes;
  } else {
    loading.value = false;
    showError(res.data.message);
  }
};
// table header
</script>

<style lang="scss" scoped></style>
