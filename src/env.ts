// parse/validação das variáveis de ambiente
import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.string().url(),
})

// Pegando o parâmetro(process.env) e realizando a validação com o schema
const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  // flatten deixa mais legível os errors - https://zod.dev/ERROR_HANDLING?id=flattening-errors
  console.error(
    'Invalid enviornment variables',
    parsedEnv.error.flatten().fieldErrors,
  )

  // Disparando um erro
  throw new Error('Invalid environment variables')
}

export const env = parsedEnv.data
