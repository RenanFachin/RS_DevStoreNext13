import Link from 'next/link'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { Product } from '@/data/types/product'
import { api } from '@/data/api'

interface SearchProps {
  searchParams: {
    q: string
  }
}

async function searchProducts(query: string): Promise<Product[]> {
  const response = await api(`/products/search?q=${query}`, {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  })

  const products = await response.json()

  return products
}

// Todas as páginas do next, por padrão, recebem os parâmetros dinâmicos.
export default async function Search({ searchParams }: SearchProps) {
  // Destruturando de searchParams e atribuindo um novo nome para q
  const { q: query } = searchParams

  // Esta página para ser acessada precisa OBRIGATORIAMENTE ter um query
  if (!query) {
    redirect('/')
  }

  // Chamada para api passando o query que veio pela rota
  const products = await searchProducts(query)

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Resultados para:{' '}
        <span className="font-semibold text-violet-800">{query}</span>
      </p>

      {/* Resultados da busca */}
      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => {
          return (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="relative group rounded-lg bg-zinc-900 overflow-hidden mx-auto"
            >
              <Image
                src={product.image}
                alt=""
                width={480}
                height={480}
                quality={100}
                className="group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
                {/* truncate => caso não couber, será adicionado ... */}
                <span className="text-sm truncate">{product.title}</span>

                <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
                  {product.price.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 0,
                  })}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
