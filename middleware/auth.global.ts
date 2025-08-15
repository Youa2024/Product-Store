export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === "/login") return;

  const { user, restoreSession } = useAuth();
  //  const { restoreSession } = uselang()
  await restoreSession();
  // await restoreSession()

  if (!user.value) {
    return navigateTo("/login");
  }
});
