const backendPrefix = import.meta.env.VITE_BACKEND_URL

export const fetchCoffeesUrl = `${backendPrefix}/coffee`
export const fetchExternalCoffeesUrl = `${backendPrefix}/coffee/external`
