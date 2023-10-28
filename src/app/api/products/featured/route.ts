// Rota utilizada para deixar produtos em destaque na homepage
import data from '../data.json'

export async function GET() {
  // criando um delay na resposta para simular uma api real
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Buscando apenas os produtos que estão com featured=true de data.json
  const featuredProducts = data.products.filter((product) => product.featured)

  return Response.json(featuredProducts)
}
