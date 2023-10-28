import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

// utilizar o tailwind-merge para unir estilizações

// Dizendo ao componente que ele pode receber qualquer prop que uma div receberia
export function Skeleton({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={twMerge('bg-zinc-50/10 animate-pulse rounded-md', className)}
      {...props}
    />
  )
}
