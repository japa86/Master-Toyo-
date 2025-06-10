'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Substitui push por replace para evitar que o usuário volte
    if (!user) {
      router.replace('/login')
    }
  }, [user, router])

  // Mostra um feedback simples enquanto verifica a autenticação
  if (user === undefined) {
    return <p>Carregando...</p>
  }

  if (!user) return null

  return <>{children}</>
}
