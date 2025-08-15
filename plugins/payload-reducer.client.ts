// // plugins/payload-reducer.client.ts
// import { defineNuxtPlugin } from '#app'

// export default defineNuxtPlugin((nuxtApp) => {
//   nuxtApp.payloadReducer = (key, value) => {
//     // Example: handle some custom class serialization
//     if (value instanceof SomeClass) {
//       return {
//         __type: 'SomeClass',
//         data: value.someSerializableData()
//       }
//     }
//     // Default: return value as is
//     return value
//   }
// })
