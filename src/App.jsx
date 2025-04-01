import { useState } from 'react'
import { supabase } from './config/supabase'
import { CheckoutButton } from './components/CheckoutButton'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

function App() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    mensagem: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const { error } = await supabase
        .from('contatos')
        .insert([formData])

      if (error) throw error

      setMessage('Mensagem enviada com sucesso!')
      setFormData({ nome: '', email: '', mensagem: '' })
    } catch (error) {
      setMessage('Erro ao enviar mensagem. Tente novamente.')
      console.error('Erro:', error)
    } finally {
      setLoading(false)
    }
  }

  const todosServicos = [
    {
      titulo: "1 Área",
      descricao: "Leitura de 1 área da vida, mais duas perguntas",
      preco: "15€"
    },
    {
      titulo: "3 Áreas",
      descricao: "Leitura de 3 áreas da vida, mais 5 perguntas",
      preco: "25€"
    },
    {
      titulo: "5 Áreas",
      descricao: "Leitura de 5 áreas da vida, mais 7 perguntas",
      preco: "40€"
    },
    {
      titulo: "Leitura Completa",
      descricao: "Leitura de 12 áreas da vida, mais perguntas ilimitadas (duração máxima de 60 minutos)",
      preco: "50€"
    },
    {
      titulo: "Leitura Completa + Mesa Radiónica",
      descricao: "Leitura de 12 áreas da vida mais perguntas ilimitadas, e 1 mesa radiónica",
      preco: "80€"
    },
    {
      titulo: "Mesa Diagnóstico Simples",
      preco: "10€"
    },
    {
      titulo: "Mesa Diagnóstico Simples + Alinhamento dos Chakras",
      preco: "15€"
    },
    {
      titulo: "Mesa Diagnóstico Completa",
      preco: "20€"
    },
    {
      titulo: "Mesa Diagnóstico Completa + Perguntas de Medição + Alinhamento dos Chakras",
      descricao: "Máximo 5 perguntas de medição, máximo de 45 minutos de consulta",
      preco: "30€"
    },
    {
      titulo: "Mesa Radiónica",
      preco: "45€"
    },
    {
      titulo: "Constelação",
      preco: "100€"
    }
  ];

  const servicosGrupo1 = todosServicos.slice(0, Math.ceil(todosServicos.length / 2));
  const servicosGrupo2 = todosServicos.slice(Math.ceil(todosServicos.length / 2));

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-sm">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">Portal Terapêutico</div>
            <div className="hidden md:flex space-x-8">
              <a href="#servicos" className="hover:text-purple-300">Serviços</a>
              <a href="#sobre" className="hover:text-purple-300">Sobre</a>
              <a href="#contato" className="hover:text-purple-300">Contato</a>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Descubra Seu Caminho com Consultas Online
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-purple-200">
          Tarot, Baralho Cigano, Mesa Radiônica e Constelação Familiar
        </p>
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
          Agende Sua Consulta
        </button>
      </section>

      {/* Serviços */}
      <section id="servicos" className="py-20 bg-black/20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Nossos Serviços</h2>
          
          {/* Primeiro Carrossel */}
          <div className="mb-8">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
                reverseDirection: false,
              }}
              loop={true}
              speed={1000}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="mySwiper"
            >
              {servicosGrupo1.map((servico, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm h-full transform transition-transform duration-300 hover:scale-105">
                    <h3 className="text-xl font-bold mb-2">{servico.titulo}</h3>
                    <p className="text-2xl font-bold text-purple-300 mb-4">{servico.preco}</p>
                    {servico.descricao && (
                      <p className="text-purple-200 mb-4">{servico.descricao}</p>
                    )}
                    <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
                      Agendar {servico.titulo}
                    </button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Segundo Carrossel */}
          <div>
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
                reverseDirection: false,
              }}
              loop={true}
              speed={1000}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="mySwiper"
            >
              {servicosGrupo2.map((servico, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm h-full transform transition-transform duration-300 hover:scale-105">
                    <h3 className="text-xl font-bold mb-2">{servico.titulo}</h3>
                    <p className="text-2xl font-bold text-purple-300 mb-4">{servico.preco}</p>
                    {servico.descricao && (
                      <p className="text-purple-200 mb-4">{servico.descricao}</p>
                    )}
                    <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
                      Agendar {servico.titulo}
                    </button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Sobre Nós</h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-purple-200 mb-6">
              Com anos de experiência em consultas espirituais, nossa equipe de especialistas
              está pronta para guiar você em sua jornada de autoconhecimento e transformação.
            </p>
            <p className="text-lg text-purple-200">
              Utilizamos técnicas milenares combinadas com tecnologia moderna para
              oferecer consultas online de alta qualidade, sempre respeitando sua
              individualidade e necessidades específicas.
            </p>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="py-20 bg-black/20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Entre em Contato</h2>
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Seu nome"
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-purple-500 focus:outline-none focus:border-purple-300"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Seu email"
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-purple-500 focus:outline-none focus:border-purple-300"
                required
              />
              <textarea
                name="mensagem"
                value={formData.mensagem}
                onChange={handleChange}
                placeholder="Sua mensagem"
                rows="4"
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-purple-500 focus:outline-none focus:border-purple-300"
                required
              ></textarea>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 disabled:opacity-50"
              >
                {loading ? 'Enviando...' : 'Enviar Mensagem'}
              </button>
              {message && (
                <p className={`text-center ${message.includes('sucesso') ? 'text-green-400' : 'text-red-400'}`}>
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/30 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-purple-200">© 2024 Portal Terapêutico. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

export default App 