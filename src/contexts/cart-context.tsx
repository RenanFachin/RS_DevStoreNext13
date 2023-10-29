'use client'

// Este contexto obrigatoriamente necessita da instrução use client pq tem um state nele
// https://nextjs.org/docs/app/building-your-application/rendering/client-components

import { ReactNode, createContext, useState } from 'react'

// Criando uma interface para representar o conteúdo dos items
interface CartItem {
  productId: number
  quantity: number
}

interface CartContextType {
  // Dizendo que é um array de items
  items: CartItem[]
  // Função para adicionar um produto ao carrinho
  addToCart: (productId: number) => void
}

export const CartContext = createContext({} as CartContextType)

interface CartProviderProps {
  children: ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  // Criando um state para armazenar o conteúdo do carrinho e definindo a tipagem aceita
  const [cartItems, setCartItem] = useState<CartItem[]>([])

  function addToCart(productId: number) {
    setCartItem((state) => {
      // Validando as informações já contidas no state
      const productInCart = state.some((item) => item.productId === productId)

      // Caso o produto já tenha sido adicionado, vamos apenas aumentar a quantidade
      if (productInCart) {
        // Aumentnado a quantidade. Passo 1: percorrer todo o carrinho procurando o produto
        return state.map((item) => {
          // quando encontrar, adicionar +1
          if (item.productId === productId) {
            return { ...item, quantidade: item.quantity + 1 }
          } else {
            // e o restante é para retornar o valor dele mesmo
            return item
          }
        })
      } else {
        // Caso ainda não tenha sido adicionado ao carrinho o produto selecionado, vamos adicionar. Primeiro repassando tudo que já estava no carrinho e mais este novo item
        return [...state, { productId, quantity: 1 }]
      }
    })
  }

  return (
    <CartContext.Provider value={{ items: cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  )
}
