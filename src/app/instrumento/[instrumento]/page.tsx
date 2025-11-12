'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Clock, BookOpen, CheckCircle, Play, FileText, Target, Award, Video } from 'lucide-react'
import { useParams } from 'next/navigation'

const instrumentsData = {
  violao: {
    name: 'Violão',
    category: 'cordas',
    categoryName: 'Instrumentos de Corda',
    description: 'O violão é um dos instrumentos mais populares e versáteis do mundo. Aprenda desde os primeiros acordes até técnicas avançadas de fingerpicking e performance.',
    difficulty: 'Iniciante',
    duration: '3-6 meses',
    totalLessons: 45,
    image: '🎸',
    color: 'from-violet-600 to-purple-600',
    videoDemo: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    modules: [
      {
        id: 1,
        title: 'Fundamentos do Violão',
        description: 'Postura, afinação, primeiros acordes e ritmos básicos',
        lessons: 12,
        duration: '2-3 semanas',
        topics: [
          { title: 'Anatomia do violão e cuidados básicos', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Postura correta para tocar sentado e em pé', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Como segurar a palheta e posição das mãos', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Afinação do violão (métodos e afinador)', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Primeiros acordes: Em, Am, C, G, D', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Exercícios de mudança de acordes', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Ritmo básico com palheta', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Primeira música: "Asa Branca"', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Acordes com pestana: F e Bm', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Ritmos de balada e rock', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Exercícios de coordenação mão direita/esquerda', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Prática com metrônomo', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
        ]
      },
      {
        id: 2,
        title: 'Acordes e Progressões',
        description: 'Expandindo o vocabulário de acordes e criando progressões musicais',
        lessons: 10,
        duration: '2-3 semanas',
        topics: [
          { title: 'Acordes maiores e menores completos', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Acordes com sétima (C7, G7, D7)', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Progressões harmônicas básicas (I-V-vi-IV)', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Campo harmônico maior', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Inversões de acordes', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Acordes suspensos (sus2, sus4)', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Progressões do blues', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Análise de músicas populares', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Criando suas próprias progressões', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { title: 'Prática com backing tracks', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
        ]
      }
    ],
    prerequisites: [
      'Nenhum conhecimento musical prévio necessário',
      'Violão em boas condições (acústico ou clássico)',
      'Palhetas de diferentes espessuras',
      'Afinador (app no celular serve)',
      'Dedicação de 30-45 minutos diários'
    ],
    skills: [
      'Tocar acordes básicos e avançados',
      'Executar ritmos variados',
      'Técnicas de fingerpicking',
      'Improvisação básica',
      'Repertório de 20+ músicas',
      'Acompanhar cantores',
      'Tocar em grupo'
    ]
  }
}

export default function InstrumentPage() {
  const params = useParams()
  const instrumentId = params.instrumento as string
  const instrument = instrumentsData[instrumentId as keyof typeof instrumentsData]

  if (!instrument) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Instrumento não encontrado</h1>
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
                href={`/categoria/${instrument.category}`}
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
      <section className={`bg-gradient-to-r ${instrument.color} text-white py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-4 py-1 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm">
                  {instrument.difficulty}
                </span>
                <span className="text-white/80">•</span>
                <span className="text-white/80">{instrument.duration}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Curso Completo de {instrument.name}
              </h2>
              <p className="text-xl opacity-90 mb-8">
                {instrument.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all hover:shadow-lg">
                  Começar Agora
                </button>
                <button className="border border-white/30 px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors backdrop-blur-sm">
                  Ver Prévia
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="text-3xl font-bold">{instrument.totalLessons}</div>
                <div className="text-sm opacity-90">Lições</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="text-3xl font-bold">{instrument.modules.length}</div>
                <div className="text-sm opacity-90">Módulos</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="text-3xl font-bold">100%</div>
                <div className="text-sm opacity-90">Com Vídeos</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="text-3xl font-bold">∞</div>
                <div className="text-sm opacity-90">Acesso</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-bold text-white mb-8">Conteúdo do Curso</h3>
            <div className="space-y-6">
              {instrument.modules.map((module) => (
                <div key={module.id} className="bg-gradient-to-br from-[#1A1A2E] to-[#16213E] rounded-2xl shadow-xl overflow-hidden border border-white/10">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-violet-600/20 rounded-full flex items-center justify-center border border-violet-500/30">
                          <span className="text-violet-400 font-bold">{module.id}</span>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-white">{module.title}</h4>
                          <p className="text-gray-400">{module.description}</p>
                        </div>
                      </div>
                      <div className="text-right text-sm text-gray-400">
                        <div className="flex items-center gap-1 mb-1">
                          <BookOpen className="w-4 h-4" />
                          <span>{module.lessons} lições</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{module.duration}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {module.topics.map((topic, topicIndex) => (
                        <div key={topicIndex} className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/5">
                          <div className="flex items-start gap-3 flex-1">
                            <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-300">{topic.title}</span>
                          </div>
                          <button className="flex items-center gap-2 px-4 py-2 bg-violet-600/20 hover:bg-violet-600/30 rounded-lg transition-colors border border-violet-500/30 ml-4">
                            <Video className="w-4 h-4 text-violet-400" />
                            <span className="text-xs text-violet-300 font-medium">Vídeo</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Prerequisites */}
            <div className="bg-gradient-to-br from-[#1A1A2E] to-[#16213E] rounded-2xl shadow-xl p-6 border border-white/10">
              <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-violet-400" />
                Pré-requisitos
              </h4>
              <ul className="space-y-3">
                {instrument.prerequisites.map((prereq, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-300">{prereq}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills */}
            <div className="bg-gradient-to-br from-[#1A1A2E] to-[#16213E] rounded-2xl shadow-xl p-6 border border-white/10">
              <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-fuchsia-400" />
                O que você vai aprender
              </h4>
              <ul className="space-y-3">
                {instrument.skills.map((skill, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-300">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className={`bg-gradient-to-r ${instrument.color} rounded-2xl p-6 text-white border border-white/10`}>
              <h4 className="text-xl font-bold mb-4">Pronto para começar?</h4>
              <p className="text-white/90 mb-6 text-sm">
                Inicie sua jornada musical hoje mesmo com nosso método comprovado.
              </p>
              <button className="w-full bg-white text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all hover:shadow-lg">
                Começar Curso
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
