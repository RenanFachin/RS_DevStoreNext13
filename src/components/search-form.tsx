'use client'

// https://nextjs.org/docs/app/api-reference/functions/use-router
import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent } from 'react'

export function SearchForm() {
  const router = useRouter()

  // https://nextjs.org/docs/app/api-reference/functions/use-search-params
  const searchParams = useSearchParams()
  const query = searchParams.get('q')

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    // Transformando em objeto
    const data = Object.fromEntries(formData)

    // Pegando o que está no input com nome 'q'
    const query = data.q

    if (!query) {
      return null
    }

    // enviando o usuário para a página de search passando a busca junto
    router.push(`/search?q=${query}`)
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex w-[320px] items-center gap-3 rounded-full bg-zinc-900 px-5 py-3 ring-zinc-700"
    >
      <Search className="w-5 h-5 text-zinc-500" />

      <input
        name="q"
        defaultValue={query ?? ''}
        placeholder="Buscar produtos..."
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
      />
    </form>
  )
}
