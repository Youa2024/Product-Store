export default defineNitroConfig({
  devProxy: {
    "/api": {
      target: "http://localhost:8080",  // your backend
      changeOrigin: true
    }
  }
})
