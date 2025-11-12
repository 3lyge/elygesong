'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Clock, BookOpen, Target, Users, Video } from 'lucide-react'
import { useParams } from 'next/navigation'

const categoriesData = {
  cordas: {
    name: 'Instrumentos de Corda',
    description: 'Domine a arte dos instrumentos de corda com técnicas fundamentais e avançadas',
    color: 'from-violet-600 to-purple-600',
    instruments: [
      {
        id: 'violao',
        name: 'Violão',
        description: 'O instrumento mais popular do mundo. Aprenda desde os primeiros acordes até técnicas avançadas.',
        difficulty: 'Iniciante',
        duration: '3-6 meses',
        lessons: 45,
        preview: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=300&fit=crop'
      },
      {
        id: 'guitarra',
        name: 'Guitarra Elétrica',
        description: 'Rock, blues, jazz e muito mais. Domine solos, riffs e técnicas de guitarra elétrica.',
        difficulty: 'Intermediário',
        duration: '6-12 meses',
        lessons: 52,
        preview: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=400&h=300&fit=crop'
      },
      {
        id: 'baixo',
        name: 'Contrabaixo',
        description: 'A base rítmica da música. Aprenda grooves, slap, walking bass e muito mais.',
        difficulty: 'Iniciante',
        duration: '4-8 meses',
        lessons: 38,
        preview: 'https://images.unsplash.com/photo-1556449895-a33c9dba33dd?w=400&h=300&fit=crop'
      },
      {
        id: 'violino',
        name: 'Violino',
        description: 'Instrumento clássico de grande expressividade. Técnica de arco, postura e repertório.',
        difficulty: 'Avançado',
        duration: '12+ meses',
        lessons: 65,
        preview: 'https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?w=400&h=300&fit=crop'
      },
      {
        id: 'viola',
        name: 'Viola',
        description: 'Irmã maior do violino com som mais grave e rico. Técnicas específicas e repertório.',
        difficulty: 'Avançado',
        duration: '10+ meses',
        lessons: 48,
        preview: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=400&h=300&fit=crop'
      },
      {
        id: 'violoncelo',
        name: 'Violoncelo',
        description: 'Instrumento de registro grave com sonoridade única. Postura, arco e expressividade.',
        difficulty: 'Avançado',
        duration: '12+ meses',
        lessons: 58,
        preview: 'https://images.unsplash.com/photo-1519683384663-39e9a9e6b1d4?w=400&h=300&fit=crop'
      }
    ]
  },
  teclas: {
    name: 'Instrumentos de Tecla',
    description: 'Explore o mundo dos instrumentos de tecla, da música clássica ao jazz moderno',
    color: 'from-fuchsia-600 to-pink-600',
    instruments: [
      {
        id: 'piano',
        name: 'Piano',
        description: 'O rei dos instrumentos. Técnica clássica, jazz, popular e muito mais.',
        difficulty: 'Iniciante',
        duration: '6-12 meses',
        lessons: 60,
        preview: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&h=300&fit=crop'
      },
      {
        id: 'teclado',
        name: 'Teclado Eletrônico',
        description: 'Versatilidade total. Sons, ritmos, arranjos e performance moderna.',
        difficulty: 'Iniciante',
        duration: '3-6 meses',
        lessons: 42,
        preview: 'https://images.unsplash.com/photo-1563330232-57114bb0823c?w=400&h=300&fit=crop'
      },
      {
        id: 'orgao',
        name: 'Órgão',
        description: 'Instrumento tradicional com técnicas específicas de pedal e registro.',
        difficulty: 'Intermediário',
        duration: '8-12 meses',
        lessons: 35,
        preview: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=400&h=300&fit=crop'
      },
      {
        id: 'acordeon',
        name: 'Acordeon',
        description: 'Instrumento folclórico rico em tradição. Técnica de fole e dedilhado.',
        difficulty: 'Intermediário',
        duration: '6-10 meses',
        lessons: 40,
        preview: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&h=300&fit=crop'
      }
    ]
  },
  percussao: {
    name: 'Instrumentos de Percussão',
    description: 'Ritmo e groove em suas mãos. Domine a arte da percussão',
    color: 'from-orange-600 to-red-600',
    instruments: [
      {
        id: 'bateria',
        name: 'Bateria',
        description: 'O coração da banda. Coordenação, grooves, fills e técnicas avançadas.',
        difficulty: 'Intermediário',
        duration: '6-12 meses',
        lessons: 55,
        preview: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=400&h=300&fit=crop'
      },
      {
        id: 'cajon',
        name: 'Cajón',
        description: 'Percussão versátil e portátil. Técnicas de mão e ritmos diversos.',
        difficulty: 'Iniciante',
        duration: '2-4 meses',
        lessons: 25,
        preview: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&h=300&fit=crop'
      },
      {
        id: 'pandeiro',
        name: 'Pandeiro',
        description: 'Instrumento brasileiro tradicional. Técnicas de mão e ritmos folclóricos.',
        difficulty: 'Intermediário',
        duration: '4-8 meses',
        lessons: 32,
        preview: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=400&h=300&fit=crop'
      },
      {
        id: 'bongo',
        name: 'Bongô',
        description: 'Percussão latina com técnicas específicas e ritmos tradicionais.',
        difficulty: 'Iniciante',
        duration: '3-6 meses',
        lessons: 28,
        preview: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=400&h=300&fit=crop'
      },
      {
        id: 'djembe',
        name: 'Djembê',
        description: 'Tambor africano com sonoridade única e técnicas tradicionais.',
        difficulty: 'Iniciante',
        duration: '3-5 meses',
        lessons: 30,
        preview: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=400&h=300&fit=crop'
      }
    ]
  },
  sopro: {
    name: 'Instrumentos de Sopro',
    description: 'Respiração, embocadura e expressão musical através do ar',
    color: 'from-emerald-600 to-teal-600',
    instruments: [
      {
        id: 'flauta',
        name: 'Flauta Transversal',
        description: 'Instrumento de sopro clássico. Respiração, embocadura e técnica.',
        difficulty: 'Iniciante',
        duration: '4-8 meses',
        lessons: 42,
        preview: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&h=300&fit=crop'
      },
      {
        id: 'saxofone',
        name: 'Saxofone',
        description: 'Jazz, blues e música popular. Embocadura, respiração e improvisação.',
        difficulty: 'Intermediário',
        duration: '6-10 meses',
        lessons: 48,
        preview: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&h=300&fit=crop'
      },
      {
        id: 'clarinete',
        name: 'Clarinete',
        description: 'Instrumento de palheta com grande versatilidade musical.',
        difficulty: 'Intermediário',
        duration: '6-10 meses',
        lessons: 40,
        preview: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&h=300&fit=crop'
      },
      {
        id: 'trombone',
        name: 'Trombone',
        description: 'Instrumento de vara com sonoridade única e técnicas específicas.',
        difficulty: 'Intermediário',
        duration: '8-12 meses',
        lessons: 38,
        preview: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&h=300&fit=crop'
      }
    ]
  },
  vocais: {
    name: 'Técnica Vocal',
    description: 'Desenvolva sua voz com técnicas profissionais de canto',
    color: 'from-rose-600 to-pink-600',
    instruments: [
      {
        id: 'canto-popular',
        name: 'Canto Popular',
        description: 'Técnicas modernas de canto para música popular, rock, pop e MPB.',
        difficulty: 'Iniciante',
        duration: '4-8 meses',
        lessons: 36,
        preview: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=300&fit=crop'
      },
      {
        id: 'canto-lirico',
        name: 'Canto Lírico',
        description: 'Técnica clássica de canto com respiração, impostação e repertório.',
        difficulty: 'Avançado',
        duration: '12+ meses',
        lessons: 50,
        preview: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=300&fit=crop'
      },
      {
        id: 'canto-coral',
        name: 'Canto Coral',
        description: 'Técnicas específicas para canto em grupo e harmonização vocal.',
        difficulty: 'Intermediário',
        duration: '6-10 meses',
        lessons: 32,
        preview: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=300&fit=crop'
      }
    ]
  },
  teoria: {
    name: 'Teoria Musical',
    description: 'Fundamentos essenciais para compreender a linguagem musical',
    color: 'from-indigo-600 to-blue-600',
    instruments: [
      {
        id: 'fundamentos',
        name: 'Fundamentos Musicais',
        description: 'Notas, escalas, intervalos, acordes e conceitos básicos da música.',
        difficulty: 'Iniciante',
        duration: '2-4 meses',
        lessons: 24,
        preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop'
      },
      {
        id: 'harmonia',
        name: 'Harmonia',
        description: 'Progressões harmônicas, análise de acordes e rearmonização.',
        difficulty: 'Intermediário',
        duration: '6-10 meses',
        lessons: 38,
        preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop'
      },
      {
        id: 'composicao',
        name: 'Composição',
        description: 'Técnicas de composição, estrutura musical e criatividade.',
        difficulty: 'Avançado',
        duration: '8-12 meses',
        lessons: 45,
        preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop'
      },
      {
        id: 'analise',
        name: 'Análise Musical',
        description: 'Análise de obras, formas musicais e estruturas compositivas.',
        difficulty: 'Avançado',
        duration: '10+ meses',
        lessons: 42,
        preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop'
      }
    ]
  }
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Iniciante':
      return 'bg-green-500/20 text-green-300 border-green-500/30'
    case 'Intermediário':
      return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
    case 'Avançado':
      return 'bg-red-500/20 text-red-300 border-red-500/30'
    default:
      return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
  }
}

export default function CategoryPage() {
  const params = useParams()
  const categoryId = params.categoria as string
  const category = categoriesData[categoryId as keyof typeof categoriesData]

  if (!category) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Categoria não encontrada</h1>
          <Link href="/" className="text-violet-400 hover:text-violet-300">
            Voltar ao início
          </Link>
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
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-400" />
              </Link>
              <Link href="/" className="flex items-center gap-3">
                <Image 
                  src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/497ab95d-f8eb-4162-8503-1e5579c478b2.png"
                  alt="ElygeSong Logo"
                  width={180}
                  height={60}
                  className="h-12 w-auto"
                />
              </Link>
            </div>
            <div className="flex gap-3">
              <Link href="/dashboard" className="px-6 py-2 text-white hover:text-violet-300 transition-colors">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className={`bg-gradient-to-r ${category.color} rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-8 p-8 mb-12 text-white border border-white/10`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">{category.name}</h2>
          <p className="text-xl opacity-90 mb-6">{category.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/10">
              <div className="text-2xl font-bold">{category.instruments.length}</div>
              <div className="text-sm opacity-90">Instrumentos</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/10">
              <div className="text-2xl font-bold">
                {category.instruments.reduce((acc, inst) => acc + inst.lessons, 0)}
              </div>
              <div className="text-sm opacity-90">Total de Lições</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/10">
              <div className="text-2xl font-bold">100%</div>
              <div className="text-sm opacity-90">Com Vídeos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Instruments Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {category.instruments.map((instrument) => (
            <Link
              key={instrument.id}
              href={`/instrumento/${instrument.id}`}
              className="group block"
            >
              <div className="bg-gradient-to-br from-[#1A1A2E] to-[#16213E] rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-violet-500/20 transition-all duration-300 overflow-hidden group-hover:scale-105 border border-white/10">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={instrument.preview}
                    alt={instrument.name}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60`}></div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-black/50 backdrop-blur-sm rounded-full p-2 border border-white/20">
                      <Video className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-white">{instrument.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(instrument.difficulty)}`}>
                      {instrument.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                    {instrument.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>{instrument.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <BookOpen className="w-4 h-4" />
                      <span>{instrument.lessons} lições com vídeos</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-300">Começar curso</span>
                      <div className="w-8 h-8 bg-violet-600/20 rounded-full flex items-center justify-center group-hover:bg-violet-600/30 transition-colors border border-violet-500/30">
                        <ArrowLeft className="w-4 h-4 text-violet-400 rotate-180" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Learning Path Section */}
        <section className="mt-16 bg-gradient-to-br from-[#1A1A2E] to-[#16213E] rounded-3xl shadow-xl p-8 md:p-12 border border-white/10">
          <h3 className="text-3xl font-bold text-center text-white mb-8">
            Metodologia de Ensino
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-violet-600/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-violet-500/30">
                <Target className="w-8 h-8 text-violet-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">1. Fundamentos</h4>
              <p className="text-sm text-gray-400">Conceitos básicos e postura correta</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                <BookOpen className="w-8 h-8 text-green-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">2. Prática</h4>
              <p className="text-sm text-gray-400">Exercícios progressivos e técnicas</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-fuchsia-600/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-fuchsia-500/30">
                <Users className="w-8 h-8 text-fuchsia-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">3. Repertório</h4>
              <p className="text-sm text-gray-400">Músicas e peças para aplicar conhecimento</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-orange-500/30">
                <Target className="w-8 h-8 text-orange-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">4. Domínio</h4>
              <p className="text-sm text-gray-400">Técnicas avançadas e expressividade</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
