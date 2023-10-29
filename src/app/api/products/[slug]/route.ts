// Rota utilizada para deixar produtos em destaque na homepage
import { z } from 'zod'
import data from '../data.json'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  console.log(params.slug)

  await new Promise((resolve) => setTimeout(resolve, 2000))

  const slug = z.string().parse(params.slug)

  const product = data.products.find((product) => product.slug === slug)

  if (!product) {
    return Response.json({ message: 'Product not found.' }, { status: 400 })
  }

  return Response.json(product)
}