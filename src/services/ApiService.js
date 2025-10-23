// Serviço de API para conectar ao backend com Supabase
// O Quilo é Nosso 2025

const API_BASE_URL = 'https://oquiloenosso-backend.vercel.app/api'

class ApiService {
  
  // Método auxiliar para fazer requisições
  static async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    }
    
    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status} - ${response.statusText}`)
      }
      
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Erro na requisição:', error)
      throw error
    }
  }

  // ===== PRATOS =====
  static async getPratos() {
    return this.request('/pratos')
  }

  static async createPrato(prato) {
    return this.request('/pratos', {
      method: 'POST',
      body: JSON.stringify(prato)
    })
  }

  static async updatePrato(id, prato) {
    return this.request(`/pratos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(prato)
    })
  }

  static async deletePrato(id) {
    return this.request(`/pratos/${id}`, {
      method: 'DELETE'
    })
  }

  // ===== JURADOS =====
  static async getJurados() {
    return this.request('/jurados')
  }

  static async createJurado(jurado) {
    return this.request('/jurados', {
      method: 'POST',
      body: JSON.stringify(jurado)
    })
  }

  static async updateJurado(id, jurado) {
    return this.request(`/jurados/${id}`, {
      method: 'PUT',
      body: JSON.stringify(jurado)
    })
  }

  // ===== AVALIAÇÕES =====
  static async getAvaliacoes() {
    return this.request('/avaliacoes')
  }

  static async createAvaliacao(avaliacao) {
    return this.request('/avaliacoes', {
      method: 'POST',
      body: JSON.stringify(avaliacao)
    })
  }

  static async getAvaliacoesByPrato(pratoId) {
    return this.request(`/avaliacoes/prato/${pratoId}`)
  }

  static async getAvaliacoesByJurado(juradoId) {
    return this.request(`/avaliacoes/jurado/${juradoId}`)
  }

  // ===== RECEITAS =====
  static async getReceitas() {
    return this.request('/receitas')
  }

  static async createReceita(receita) {
    return this.request('/receitas', {
      method: 'POST',
      body: JSON.stringify(receita)
    })
  }

  // ===== RANKING =====
  static async getRanking() {
    return this.request('/ranking')
  }

  // ===== ESTATÍSTICAS =====
  static async getEstatisticas() {
    return this.request('/estatisticas')
  }

  // ===== HEALTH CHECK =====
  static async healthCheck() {
    return this.request('/health')
  }
}

export default ApiService
