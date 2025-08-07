// // composables/useAuth.ts
// export const useAuth = () => {
//   const token = useCookie<string | null>('token')

//   const login = async (email: string, password: string) => {
//     try {
//       const res = await $fetch<{ token: string }>('/api/login', {
//         method: 'POST',
//         body: { email, password },
//       })
//       token.value = res.token
//       return true
//     } catch (e) {
//       return false
//     }
//   }

//   const logout = () => {
//     token.value = null
//     navigateTo('/login')
//   }

//   const isLoggedIn = computed(() => !!token.value)

//   return { token, login, logout, isLoggedIn }
// }
