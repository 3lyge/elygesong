import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabase } from '@/lib/supabase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutCompleted(session)
        break

      case 'customer.subscription.updated':
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionUpdated(subscription)
        break

      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object as Stripe.Subscription
        await handleSubscriptionDeleted(deletedSubscription)
        break

      case 'invoice.payment_succeeded':
        const invoice = event.data.object as Stripe.Invoice
        await handlePaymentSucceeded(invoice)
        break

      case 'invoice.payment_failed':
        const failedInvoice = event.data.object as Stripe.Invoice
        await handlePaymentFailed(failedInvoice)
        break

      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler failed:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId
  const planType = session.metadata?.planType

  if (!userId || !planType) {
    console.error('Missing metadata in checkout session')
    return
  }

  let subscriptionEndDate = null
  
  if (planType === 'monthly') {
    subscriptionEndDate = new Date()
    subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1)
  } else if (planType === 'annual') {
    subscriptionEndDate = new Date()
    subscriptionEndDate.setFullYear(subscriptionEndDate.getFullYear() + 1)
  }
  // Para lifetime, subscriptionEndDate permanece null (sem expiração)

  // Atualizar perfil do usuário
  const { error } = await supabase
    .from('profiles')
    .update({
      subscription_plan: planType,
      subscription_status: 'active',
      subscription_end_date: subscriptionEndDate?.toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId)

  if (error) {
    console.error('Error updating user profile:', error)
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string
  
  // Buscar usuário pelo customer ID
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single()

  if (error || !profile) {
    console.error('User not found for customer:', customerId)
    return
  }

  let subscriptionEndDate = null
  if (subscription.current_period_end) {
    subscriptionEndDate = new Date(subscription.current_period_end * 1000)
  }

  // Atualizar status da assinatura
  await supabase
    .from('profiles')
    .update({
      subscription_status: subscription.status === 'active' ? 'active' : 'inactive',
      subscription_end_date: subscriptionEndDate?.toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', profile.id)
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string
  
  // Buscar usuário pelo customer ID
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single()

  if (error || !profile) {
    console.error('User not found for customer:', customerId)
    return
  }

  // Cancelar assinatura
  await supabase
    .from('profiles')
    .update({
      subscription_status: 'cancelled',
      updated_at: new Date().toISOString(),
    })
    .eq('id', profile.id)
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  // Lógica para pagamento bem-sucedido (renovação, etc.)
  console.log('Payment succeeded for invoice:', invoice.id)
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string
  
  // Buscar usuário pelo customer ID
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('id, email, first_name')
    .eq('stripe_customer_id', customerId)
    .single()

  if (error || !profile) {
    console.error('User not found for customer:', customerId)
    return
  }

  // Marcar como inativo temporariamente
  await supabase
    .from('profiles')
    .update({
      subscription_status: 'inactive',
      updated_at: new Date().toISOString(),
    })
    .eq('id', profile.id)

  // Aqui você poderia enviar um email notificando sobre a falha no pagamento
  console.log('Payment failed for user:', profile.email)
}