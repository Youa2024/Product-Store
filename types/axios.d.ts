import type { NuxtAxiosInstance } from '@nuxtjs/axios'

declare module '#app' {
  interface NuxtApp {
    $axios: NuxtAxiosInstance
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: NuxtAxiosInstance
  }
}
