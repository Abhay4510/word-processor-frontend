const API_BASE_URL = "https://word-processor-backend.vercel.app"

export const api = {
  get: async (endpoint: string, token?: string) => {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    }
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers,
    })
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }
    return response.json()
  },

  post: async (endpoint: string, token: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }
    return response.json()
  },

  put: async (endpoint: string, token: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }
    return response.json()
  },

  delete: async (endpoint: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }
    return response.json()
  },
}