import Link from 'next/link'
import { Music, Guitar, Piano, Drum, Mic2, Violin, Wind, Headphones } from 'lucide-react'
import Image from 'next/image'

const instrumentCategories = [
  {
    id: 'cordas',
    name: 'Instrumentos de Corda',
    icon: Guitar,
    description: 'Violão, guitarra, baixo, violino, viola e mais',
    color: 'from-violet-600 to-purple-600',
    instruments: ['violao', 'guitarra', 'baixo', 'violino', 'viola', 'violoncelo'],
    preview: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=300&fit=crop'
  },
  {
    id: 'teclas',
    name: 'Instrumentos de Tecla',
    icon: Piano,
    description: 'Piano, teclado, órgão e instrumentos similares',
    color: 'from-fuchsia-600 to-pink-600',
    instruments: ['piano', 'teclado', 'orgao', 'acordeon'],
    preview: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&h=300&fit=crop'
  },
  {
    id: 'percussao',
    name: 'Instrumentos de Percussão',
    icon: Drum,
    description: 'Bateria, cajón, pandeiro e instrumentos rítmicos',
    color: 'from-orange-600 to-red-600',
    instruments: ['bateria', 'cajon', 'pandeiro', 'bongo', 'djembe'],
    preview: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=400&h=300&fit=crop'
  },
  {
    id: 'sopro',
    name: 'Instrumentos de Sopro',
    icon: Wind,
    description: 'Flauta, saxofone, clarinete e instrumentos de vento',
    color: 'from-emerald-600 to-teal-600',
    instruments: ['flauta', 'saxofone', 'clarinete', 'trombone'],
    preview: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&h=300&fit=crop'
  },
  {
    id: 'vocais',
    name: 'Técnica Vocal',
    icon: Mic2,
    description: 'Canto, respiração, técnicas vocais e performance',
    color: 'from-rose-600 to-pink-600',
    instruments: ['canto-popular', 'canto-lirico', 'canto-coral'],
    preview: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=300&fit=crop'
  },
  {
    id: 'teoria',
    name: 'Teoria Musical',
    icon: Music,
    description: 'Fundamentos, harmonia, composição e análise',
    color: 'from-indigo-600 to-blue-600',
    instruments: ['fundamentos', 'harmonia', 'composicao', 'analise'],
    preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop'
  }
]

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#1A1A2E] to-[#16213E] border-b border-white/10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image 
                src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/497ab95d-f8eb-4162-8503-1e5579c478b2.png"
                alt="ElygeSong Logo"
                width={180}
                height={60}
                className="h-12 w-auto mix-blend-lighten"
              />
            </div>
            <div className="flex gap-3">
              <Link href="/login" className="px-6 py-2 text-white hover:text-violet-300 transition-colors">
                Entrar
              </Link>
              <Link href="/plans" className="px-6 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg hover:shadow-lg hover:shadow-violet-500/50 transition-all">
                Assinar
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Domine Qualquer
            <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent mt-2">
              Instrumento Musical
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
            Plataforma completa de ensino musical com conteúdo estruturado, exercícios práticos 
            e metodologia comprovada. Vídeos demonstrativos para cada aula.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <div className="bg-gradient-to-br from-[#1A1A2E] to-[#16213E] rounded-2xl p-6 shadow-xl border border-white/10 backdrop-blur-sm">
              <div className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">6</div>
              <div className="text-sm text-gray-400 mt-1">Categorias</div>
            </div>
            <div className="bg-gradient-to-br from-[#1A1A2E] to-[#16213E] rounded-2xl p-6 shadow-xl border border-white/10 backdrop-blur-sm">
              <div className="text-3xl font-bold bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text text-transparent">24+</div>
              <div className="text-sm text-gray-400 mt-1">Instrumentos</div>
            </div>
            <div className="bg-gradient-to-br from-[#1A1A2E] to-[#16213E] rounded-2xl p-6 shadow-xl border border-white/10 backdrop-blur-sm">
              <div className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">500+</div>
              <div className="text-sm text-gray-400 mt-1">Vídeos de Aula</div>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {instrumentCategories.map((category) => {
            const IconComponent = category.icon
            return (
              <Link
                key={category.id}
                href={`/categoria/${category.id}`}
                className="group block"
              >
                <div className="bg-gradient-to-br from-[#1A1A2E] to-[#16213E] rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-violet-500/20 transition-all duration-300 overflow-hidden group-hover:scale-105 border border-white/10">
                  {/* Preview Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={category.preview}
                      alt={category.name}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60`}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <IconComponent className="w-20 h-20 text-white drop-shadow-2xl" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {category.name}
                    </h3>
                    <p className="text-gray-400 mb-4 text-sm">
                      {category.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {category.instruments.slice(0, 3).map((instrument) => (
                        <span
                          key={instrument}
                          className="px-3 py-1 bg-white/5 text-gray-300 rounded-full text-xs border border-white/10"
                        >
                          {instrument.charAt(0).toUpperCase() + instrument.slice(1).replace('-', ' ')}
                        </span>
                      ))}
                      {category.instruments.length > 3 && (
                        <span className="px-3 py-1 bg-white/5 text-gray-300 rounded-full text-xs border border-white/10">
                          +{category.instruments.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Features Section */}
        <section className="mt-24 bg-gradient-to-br from-[#1A1A2E] to-[#16213E] rounded-3xl shadow-2xl p-8 md:p-12 border border-white/10">
          <h3 className="text-4xl font-bold text-center text-white mb-16">
            Por que escolher o <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">ElygeSong</span>?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-violet-500/50">
                <Music className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">Conteúdo Estruturado</h4>
              <p className="text-gray-400">
                Metodologia organizada do básico ao avançado, com progressão lógica e exercícios práticos.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-fuchsia-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-fuchsia-500/50">
                <Headphones className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">Vídeos Demonstrativos</h4>
              <p className="text-gray-400">
                Cada aula possui vídeo curto demonstrando técnicas e exercícios práticos.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-pink-500/50">
                <Guitar className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">Múltiplos Instrumentos</h4>
              <p className="text-gray-400">
                Ampla variedade de instrumentos com conteúdo especializado para cada um.
              </p>
            </div>
          </div>
        </section>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#1A1A2E] to-[#16213E] border-t border-white/10 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Image 
              src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/497ab95d-f8eb-4162-8503-1e5579c478b2.png"
              alt="ElygeSong Logo"
              width={120}
              height={40}
              className="h-8 w-auto mix-blend-lighten"
            />
          </div>
          <p className="text-gray-400">
            Transformando paixão por música em conhecimento prático
          </p>
        </div>
      </footer>
    </div>
  )
}
