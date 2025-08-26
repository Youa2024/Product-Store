export default defineNuxtRouteMiddleware(async (to) => {
  const { user, userData, restoreSession } = useAuth();
  //  const { restoreSession } = uselang()
  console.log("user value ===============:", user.value);
  console.log("user value ===============:", to.path);
  await restoreSession();
  // await restoreSession()
  console.log("user value2 ===============:", user.value);
  console.log("user value2 ===============:", to.path);
  // Redirect to login if not authenticated
  if (user.value==null&&to.path !=='/login') {
    return navigateTo("/login");
  }

  // Optional: redirect logged-in users from login page to home
  if (user.value && to.path === "/login") {
    return navigateTo("/home");
  }
});
