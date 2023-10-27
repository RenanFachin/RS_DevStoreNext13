// Rota utilizada para deixar produtos em destaque na homepage
import data from '../data.json'

export async function GET() {
  // Buscando apenas os produtos que estão com featured=true de data.json
  const featuredProducts = data.products.filter((product) => product.featured)

  return Response.json(featuredProducts)
}
