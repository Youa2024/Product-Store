export const useAuth = () => {
  const user = useState<string | null>("auth_user", () => null); // global reactive user
  const token = useState("auth_token", () => null); // global reactive token
  const userData = useState<string | null>("userData", () => null);
  const tokenCookie = useCookie<string | null>("auth_user");

  // function==============

  const login = async (username: string, password: string, header: string) => {
    const { $axios } = useNuxtApp();
    const headers = {
      lng: header,
    };
    const body = {
      username: username,
      password: password,
    };
    // Call your backend API here
    const res = await $axios.post("custom/authenticate/login", body, {
      headers,
    });
    console.log(
      "============================login data============:",
      res.data.status
    );
    if (res.data.status != "00") {
    } else {
      user.value = username;
      // tokenCookie.value = username;
      //  dataCoookie.vaue=res.data.dataResponse;

      token.value = res.data.status;
      userData.value = res.data.dataResponse;

      if (process.client) {
        localStorage.setItem("userData", JSON.stringify(res.data.dataResponse));
        localStorage.setItem("user", user.value);
      }
    }
  };

  const logout = () => {
    user.value = null;
    token.value = null;
    userData.value = null;
    localStorage.removeItem("userData");
    localStorage.removeItem("lang");
    localStorage.removeItem("user");
  };
  // Restore session from cookie
  const restoreSession = async () => {
    if (!token.value) {
      try {
        if (process.client) {
          const stored = localStorage.getItem("userData");
          userData.value = stored ? JSON.parse(stored) : null;
          user.value = stored ? localStorage.getItem("user") : null;
        }
      } catch (e) {
        logout();
      }
    }
  };
  return { user, token, login, logout, userData, restoreSession };
};
