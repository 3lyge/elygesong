'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import { 
  User, 
  Settings, 
  LogOut, 
  Crown, 
  Calendar,
  Music,
  Guitar,
  Piano,
  Drum,
  Mic2,
  Wind,
  Headphones,
  BookOpen,
  Trophy,
  Clock
} from 'lucide-react'

interface UserProfile {
  first_name: string
  last_name: string
  email: string
  subscription_plan: string
  subscription_status: string
  subscription_end_date: string | null
}

const instrumentCategories = [
  {
    id: 'cordas',
    name: 'Instrumentos de Corda',
    icon: Guitar,
    color: 'from-violet-600 to-purple-600',
    count: 6
  },
  {
    id: 'teclas',
    name: 'Instrumentos de Tecla',
    icon: Piano,
    color: 'from-fuchsia-600 to-pink-600',
    count: 4
  },
  {
    id: 'percussao',
    name: 'Instrumentos de Percussão',
    icon: Drum,
    color: 'from-orange-600 to-red-600',
    count: 5
  },
  {
    id: 'sopro',
    name: 'Instrumentos de Sopro',
    icon: Wind,
    color: 'from-emerald-600 to-teal-600',
    count: 4
  },
  {
    id: 'vocais',
    name: 'Técnica Vocal',
    icon: Mic2,
    color: 'from-rose-600 to-pink-600',
    count: 3
  },
  {
    id: 'teoria',
    name: 'Teoria Musical',
    icon: Music,
    color: 'from-indigo-600 to-purple-600',
    count: 4
  }
]

export default function DashboardPage() {
  const { user, signOut } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (user) {
      fetchProfile()
    }
  }, [user])

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('first_name, last_name, email, subscription_plan, subscription_status, subscription_end_date')
        .eq('id', user?.id)
        .single()

      if (error) {
        console.error('Error fetching profile:', error)
      } else {
        setProfile(data)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  const getPlanName = (plan: string) => {
    switch (plan) {
      case 'monthly':
        return 'Mensal'
      case 'annual':
        return 'Anual'
      case 'lifetime':
        return 'Vitalício'
      default:
        return 'Nenhum'
    }
  }

  const getPlanIcon = (plan: string) => {
    switch (plan) {
      case 'lifetime':
        return <Crown className="w-5 h-5 text-yellow-500" />
      default:
        return <Calendar className="w-5 h-5 text-violet-500" />
    }
  }

  const getSubscriptionEndDate = (endDate: string | null) => {
    if (!endDate) return 'Vitalício'
    return new Date(endDate).toLocaleDateString('pt-BR')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#1A1A2E] to-[#16213E] border-b border-white/10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image 
                src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/497ab95d-f8eb-4162-8503-1e5579c478b2.png"
                alt="ElygeSong Logo"
                width={180}
                height={60}
                className="h-12 w-auto mix-blend-lighten"
              />
            </Link>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2 border border-white/10">
                {profile && getPlanIcon(profile.subscription_plan)}
                <span className="text-sm font-medium text-gray-300">
                  {profile && getPlanName(profile.subscription_plan)}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-300">
                  {profile?.first_name}
                </span>
              </div>
              
              <button
                onClick={handleSignOut}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                title="Sair"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Olá, {profile?.first_name}! 👋
          </h2>
          <p className="text-xl text-gray-400 mb-6">
            Pronto para continuar sua jornada musical?
          </p>
          
          {/* Subscription Info */}
          <div className="bg-gradient-to-br from-[#1A1A2E] to-[#16213E] rounded-2xl shadow-xl p-6 mb-8 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Status da Assinatura
                </h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      profile?.subscription_status === 'active' ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                    <span className="text-sm text-gray-400">
                      {profile?.subscription_status === 'active' ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-400">
                      Válido até: {profile && getSubscriptionEndDate(profile.subscription_end_date)}
                    </span>
                  </div>
                </div>
              </div>
              <Link
                href="/plans"
                className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-violet-500/50 transition-all"
              >
                Gerenciar Plano
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-[#1A1A2E] to-[#16213E] rounded-xl shadow-xl p-6 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-violet-600/20 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-violet-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">26</div>
                <div className="text-sm text-gray-400">Instrumentos</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-[#1A1A2E] to-[#16213E] rounded-xl shadow-xl p-6 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">0</div>
                <div className="text-sm text-gray-400">Concluídos</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-[#1A1A2E] to-[#16213E] rounded-xl shadow-xl p-6 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-fuchsia-600/20 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-fuchsia-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">0h</div>
                <div className="text-sm text-gray-400">Tempo de Estudo</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-[#1A1A2E] to-[#16213E] rounded-xl shadow-xl p-6 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-600/20 rounded-lg flex items-center justify-center">
                <Music className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">6</div>
                <div className="text-sm text-gray-400">Categorias</div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-8">Escolha uma Categoria</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {instrumentCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <Link
                  key={category.id}
                  href={`/categoria/${category.id}`}
                  className="group block"
                >
                  <div className="bg-gradient-to-br from-[#1A1A2E] to-[#16213E] rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-violet-500/20 transition-all duration-300 overflow-hidden group-hover:scale-105 border border-white/10">
                    <div className={`h-32 bg-gradient-to-r ${category.color} p-6 flex items-center justify-center relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/20"></div>
                      <IconComponent className="w-16 h-16 text-white relative z-10 drop-shadow-2xl" />
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-bold text-white mb-2">
                        {category.name}
                      </h4>
                      <p className="text-gray-400 mb-4">
                        {category.count} instrumentos disponíveis
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-300">Explorar</span>
                        <div className="w-8 h-8 bg-violet-600/20 rounded-full flex items-center justify-center group-hover:bg-violet-600/30 transition-colors">
                          <BookOpen className="w-4 h-4 text-violet-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gradient-to-br from-[#1A1A2E] to-[#16213E] rounded-2xl shadow-xl p-8 border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-6">Atividade Recente</h3>
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-gray-400" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">
              Comece sua jornada musical!
            </h4>
            <p className="text-gray-400 mb-6">
              Escolha uma categoria acima para começar a aprender
            </p>
            <Link
              href="/categoria/cordas"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-violet-500/50 transition-all"
            >
              <Guitar className="w-5 h-5" />
              Começar com Violão
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
