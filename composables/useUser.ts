import { useState, useCookie, computed } from "#imports";

interface User {
  username: string;
}

export const useUserSession = () => {
  const cookie = useCookie<User | null>("user", { default: () => null });

  const user = useState<User | null>("user", () => cookie.value);
  const loggedIn = computed(() => !!user.value);

  const setUser = (u: User) => {
    user.value = u;
    cookie.value = u; // ✅ persist to cookie
  };

  const clearUser = () => {
    user.value = null;
    cookie.value = null; // ✅ clear cookie
  };

  return {
    user,
    loggedIn,
    setUser,
    clearUser,
  };
};
