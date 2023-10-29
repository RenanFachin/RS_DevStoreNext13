'use client'

import { useCart } from '@/hooks/use-cart'
import { ShoppingBag } from 'lucide-react'

// Este componente está sendo separado do restante do header em virtude de somente ele ser um client component. O restante todo do header é estático

export function CartWidget() {
  const { items } = useCart()

  return (
    <div className="flex items-center gap-2">
      <ShoppingBag className="w-4 h-4" />

      <span className="text-sm">Cart({items.length})</span>
    </div>
  )
}
