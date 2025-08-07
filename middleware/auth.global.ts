import { useUserSession } from "../composables/useUser";

export default defineNuxtRouteMiddleware((to, from) => {
  const { loggedIn } = useUserSession();
  // Prevent redirect loop
  if (!loggedIn.value && to.path !== "/login") {
    return navigateTo("/login");
  }

  // Optional: redirect logged-in users away from login
  if (loggedIn.value && to.path === "/login") {
    return navigateTo("/home");
  }
});
