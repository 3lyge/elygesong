'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Check, Crown, Zap, Infinity, ArrowLeft, Headphones, Shield, CreditCard } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function PlansPage() {
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState('')
  const router = useRouter()
  const { user } = useAuth()

  const handleSubscribe = async (planType: 'monthly' | 'annual' | 'lifetime') => {
    if (!user) {
      router.push('/login')
      return
    }

    setLoading(planType)
    setError('')

    try {
      // Redirecionar diretamente para o link do Stripe fornecido
      if (planType === 'monthly') {
        window.location.href = 'https://buy.stripe.com/test_cNi6oJ0GefLe1tw0MK6c000'
      } else {
        // Para outros planos, você precisará fornecer os links correspondentes
        setError('Link de pagamento não configurado para este plano ainda.')
      }
    } catch (err) {
      setError('Erro interno. Tente novamente.')
    } finally {
      setLoading(null)
    }
  }

  const plans = [
    {
      id: 'monthly' as const,
      name: 'Mensal',
      price: 'R$ 50',
      period: '/mês',
      description: 'Perfeito para começar',
      icon: Zap,
      color: 'from-violet-500 to-fuchsia-500',
      features: [
        'Acesso completo a todos os instrumentos',
        'Conteúdo estruturado e progressivo',
        'Exercícios práticos',
        'Suporte por email',
        'Acesso mobile e desktop'
      ],
      popular: false
    },
    {
      id: 'annual' as const,
      name: 'Anual',
      price: 'R$ 530',
      period: '/ano',
      description: 'Melhor custo-benefício',
      icon: Crown,
      color: 'from-fuchsia-500 to-pink-500',
      features: [
        'Tudo do plano mensal',
        'Economia de R$ 70 por ano',
        'Conteúdo exclusivo avançado',
        'Suporte prioritário',
        'Certificados de conclusão',
        'Acesso a workshops online'
      ],
      popular: true,
      savings: 'Economize R$ 70'
    },
    {
      id: 'lifetime' as const,
      name: 'Vitalício',
      price: 'R$ 1.000',
      period: 'único',
      description: 'Acesso para sempre',
      icon: Infinity,
      color: 'from-emerald-500 to-teal-500',
      features: [
        'Tudo dos planos anteriores',
        'Acesso vitalício garantido',
        'Todos os futuros conteúdos inclusos',
        'Suporte premium vitalício',
        'Mentoria musical personalizada',
        'Acesso a comunidade exclusiva',
        'Masterclasses com profissionais'
      ],
      popular: false,
      savings: 'Melhor investimento'
    }
  ]

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#1A1A2E] to-[#16213E] border-b border-white/10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-400 hover:text-white" />
            </Link>
            <div className="flex items-center gap-3">
              <Image 
                src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/38430202-a330-4175-b85a-18881820a934.png"
                alt="ElygeSong Logo"
                width={40}
                height={40}
                className="rounded-xl"
              />
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                  ElygeSong
                </h1>
                <p className="text-gray-400 text-sm">Escolha seu plano</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Escolha o Plano
            <span className="block bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent mt-2">
              Perfeito para Você
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Acesso completo a todos os instrumentos e conteúdos. 
            Cancele quando quiser. Garantia de 30 dias.
          </p>
          
          {error && (
            <div className="max-w-md mx-auto bg-red-500/10 border border-red-500/50 rounded-lg p-4 mb-8">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => {
            const IconComponent = plan.icon
            return (
              <div
                key={plan.id}
                className={`relative bg-gradient-to-br from-[#1A1A2E] to-[#16213E] rounded-3xl shadow-xl overflow-hidden border border-white/10 ${
                  plan.popular ? 'ring-4 ring-fuchsia-500/50 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white text-center py-2 text-sm font-medium">
                    ⭐ Mais Popular
                  </div>
                )}
                
                <div className={`bg-gradient-to-r ${plan.color} p-8 text-white ${plan.popular ? 'pt-12' : ''}`}>
                  <div className="flex items-center justify-between mb-4">
                    <IconComponent className="w-8 h-8" />
                    {plan.savings && (
                      <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                        {plan.savings}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="opacity-90 mb-4">{plan.description}</p>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-lg opacity-75 ml-1">{plan.period}</span>
                  </div>
                </div>

                <div className="p-8">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={loading === plan.id}
                    className={`w-full py-4 px-6 rounded-xl font-semibold transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white hover:from-fuchsia-600 hover:to-pink-600 shadow-lg shadow-fuchsia-500/50'
                        : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {loading === plan.id ? 'Processando...' : 'Assinar Agora'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Security & Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/20">
              <Shield className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Pagamento Seguro</h3>
            <p className="text-gray-400">
              Processamento seguro via Stripe com criptografia SSL de ponta a ponta
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
              <CreditCard className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Cancele Quando Quiser</h3>
            <p className="text-gray-400">
              Sem compromisso. Cancele sua assinatura a qualquer momento
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-500/20">
              <Headphones className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Suporte Dedicado</h3>
            <p className="text-gray-400">
              Equipe especializada para ajudar em sua jornada musical
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-gradient-to-br from-[#1A1A2E] to-[#16213E] rounded-3xl shadow-xl p-8 md:p-12 border border-white/10">
          <h3 className="text-3xl font-bold text-center text-white mb-8">
            Perguntas Frequentes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-white mb-2">Posso cancelar a qualquer momento?</h4>
              <p className="text-gray-400 text-sm">
                Sim! Você pode cancelar sua assinatura a qualquer momento sem taxas adicionais.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Há garantia de reembolso?</h4>
              <p className="text-gray-400 text-sm">
                Oferecemos garantia de 30 dias. Se não ficar satisfeito, devolvemos seu dinheiro.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Posso mudar de plano depois?</h4>
              <p className="text-gray-400 text-sm">
                Claro! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Os pagamentos são seguros?</h4>
              <p className="text-gray-400 text-sm">
                Sim! Usamos o Stripe, uma das plataformas de pagamento mais seguras do mundo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
