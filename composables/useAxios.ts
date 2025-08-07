import axios from 'axios'

export const useAxios = () => {
  const config = useRuntimeConfig()

  const instance = axios.create({
    baseURL: config.public.apiBase, // defined in .env
    // headers: { Authorization: `Bearer ${token}` } // optional
  })

  return instance
}
