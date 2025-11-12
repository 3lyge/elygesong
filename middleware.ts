import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  // Verificar se as variáveis de ambiente do Supabase estão configuradas
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.warn('Supabase environment variables not configured')
    // Permitir acesso apenas a rotas públicas
    const publicRoutes = ['/login', '/register', '/plans', '/']
    const isPublicRoute = publicRoutes.some(route => 
      req.nextUrl.pathname === route || req.nextUrl.pathname.startsWith('/api/')
    )
    
    if (!isPublicRoute) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
    return res
  }

  try {
    const supabase = createMiddlewareClient({ req, res })

    const {
      data: { session },
    } = await supabase.auth.getSession()

    // Rotas protegidas que requerem autenticação
    const protectedRoutes = ['/categoria', '/instrumento', '/dashboard', '/profile']
    const isProtectedRoute = protectedRoutes.some(route => 
      req.nextUrl.pathname.startsWith(route)
    )

    // Rotas públicas (login, cadastro, home, planos)
    const publicRoutes = ['/login', '/register', '/plans', '/', '/api/webhooks']
    const isPublicRoute = publicRoutes.some(route => 
      req.nextUrl.pathname === route || req.nextUrl.pathname.startsWith(route)
    )

    // Se não está logado e tenta acessar rota protegida
    if (!session && isProtectedRoute) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    // Se está logado, verificar assinatura ativa para conteúdo premium
    if (session && isProtectedRoute) {
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('subscription_status, subscription_end_date')
          .eq('id', session.user.id)
          .single()

        // Verificar se a assinatura está ativa
        const hasActiveSubscription = profile && 
          profile.subscription_status === 'active' && 
          (profile.subscription_end_date === null || new Date(profile.subscription_end_date) > new Date())

        if (!hasActiveSubscription) {
          return NextResponse.redirect(new URL('/plans', req.url))
        }
      } catch (error) {
        console.error('Error checking subscription:', error)
        // Em caso de erro, permitir acesso (fail-open) para não bloquear usuários
      }
    }

    // Se está logado e tenta acessar login/register, redirecionar para dashboard
    if (session && (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register')) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    return res
  } catch (error) {
    console.error('Middleware error:', error)
    // Em caso de erro, permitir a requisição continuar
    return res
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|lasy-bridge.js|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
