import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import Image from 'next/image'
import Link from 'next/link'

async function getFeaturedProducts(): Promise<Product[]> {
  const response = await api('/products/featured', {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  })

  const products = await response.json()

  return products
}

export default async function Home() {
  // Desestruturando os dados vindos da api e separando em dois grupos
  const [highlightedProduct, ...otherProducts] = await getFeaturedProducts()

  return (
    <div className="grid max-h-[860px] grid-cols-9 grid-rows-6 gap-6">
      {/* col-span-6 => faz ocupar 6 colunas */}
      <Link
        href={`/product/${highlightedProduct.slug}`}
        className="relative group col-span-6 row-span-6 rounded-lg bg-zinc-900 overflow-hidden flex justify-center"
      >
        <Image
          src={highlightedProduct.image}
          alt=""
          width={860}
          height={860}
          quality={100}
          className="group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute bottom-28 right-28 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
          {/* truncate => caso não couber, será adicionado ... */}
          <span className="text-sm truncate">{highlightedProduct.title}</span>

          <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
            {highlightedProduct.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 0,
            })}
          </span>
        </div>
      </Link>

      {otherProducts.map((product) => {
        return (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="relative group col-span-3 row-span-3 rounded-lg bg-zinc-900 overflow-hidden mx-auto"
          >
            <Image
              src={product.image}
              alt=""
              width={920}
              height={920}
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
  )
}
