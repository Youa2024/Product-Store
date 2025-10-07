import axios from "axios";
export const useApi = () => {
  const config = useRuntimeConfig();

  const mainApi = axios.create({
    baseURL: config.public.apiBaseMain,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return { mainApi };
};
