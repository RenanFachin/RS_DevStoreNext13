import { env } from '@/env'

export function api(path: string, init?: RequestInit) {
  // const baseUrl = env.NEXT_PUBLIC_API_BASE_URL
  const baseUrl = 'http://localhost:3000'

  const apiPrefix = '/api'

  // O construtor URL() concatena uma baseURL com uma url
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/URL
  const url = new URL(apiPrefix.concat(path), baseUrl)

  return fetch(url, init)
}
