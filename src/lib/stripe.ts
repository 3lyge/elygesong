import { loadStripe, Stripe } from '@stripe/stripe-js'

// Validação segura da chave do Stripe
const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

let stripePromise: Promise<Stripe | null> | null = null

if (stripePublishableKey && stripePublishableKey.trim() !== '') {
  stripePromise = loadStripe(stripePublishableKey)
} else {
  // Retorna promise que resolve para null se não houver chave configurada
  stripePromise = Promise.resolve(null)
  console.warn('⚠️ NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY não configurada. Configure suas variáveis de ambiente do Stripe.')
}

export const stripe = stripePromise

export const SUBSCRIPTION_PLANS = {
  monthly: {
    name: 'Plano Mensal',
    price: 50,
    priceId: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID || '',
    interval: 'month',
    description: 'Acesso completo por 1 mês'
  },
  annual: {
    name: 'Plano Anual',
    price: 530,
    priceId: process.env.NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID || '',
    interval: 'year',
    description: 'Acesso completo por 1 ano (economia de R$ 70)'
  },
  lifetime: {
    name: 'Plano Vitalício',
    price: 1000,
    priceId: process.env.NEXT_PUBLIC_STRIPE_LIFETIME_PRICE_ID || '',
    interval: 'one-time',
    description: 'Acesso completo para sempre'
  }
} as const

export type SubscriptionPlan = keyof typeof SUBSCRIPTION_PLANS

// Helper para verificar se o Stripe está configurado
export const isStripeConfigured = (): boolean => {
  return !!(
    stripePublishableKey && 
    stripePublishableKey.trim() !== '' &&
    (process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID ||
     process.env.NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID ||
     process.env.NEXT_PUBLIC_STRIPE_LIFETIME_PRICE_ID)
  )
}
