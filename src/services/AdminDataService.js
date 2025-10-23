// Serviço de dados administrativos conectado ao Supabase
// O Quilo é Nosso 2025

import ApiService from './ApiService.js'

class AdminDataService {
  
  // ===== PRATOS =====
  static async getPratos() {
    try {
      const response = await ApiService.getPratos()
      return response.success ? response.data : []
    } catch (error) {
      console.error('Erro ao buscar pratos:', error)
      return this.getFallbackPratos()
    }
  }

  static async createPrato(prato) {
    try {
      const response = await ApiService.createPrato(prato)
      return response.success ? response.data : null
    } catch (error) {
      console.error('Erro ao criar prato:', error)
      throw error
    }
  }

  static async updatePrato(id, prato) {
    try {
      const response = await ApiService.updatePrato(id, prato)
      return response.success ? response.data : null
    } catch (error) {
      console.error('Erro ao atualizar prato:', error)
      throw error
    }
  }

  static async deletePrato(id) {
    try {
      const response = await ApiService.deletePrato(id)
      return response.success
    } catch (error) {
      console.error('Erro ao excluir prato:', error)
      throw error
    }
  }

  // Método para compatibilidade com código existente
  static async addPrato(pratoData) {
    return this.createPrato(pratoData)
  }

  // Método para compatibilidade com código existente
  static async getPrato(id) {
    const pratos = await this.getPratos()
    return pratos.find(prato => prato.id === parseInt(id))
  }

  // ===== JURADOS =====
  static async getJurados() {
    try {
      const response = await ApiService.getJurados()
      return response.success ? response.data : []
    } catch (error) {
      console.error('Erro ao buscar jurados:', error)
      return this.getFallbackJurados()
    }
  }

  static async createJurado(jurado) {
    try {
      const response = await ApiService.createJurado(jurado)
      return response.success ? response.data : null
    } catch (error) {
      console.error('Erro ao criar jurado:', error)
      throw error
    }
  }

  static async updateJurado(id, jurado) {
    try {
      const response = await ApiService.updateJurado(id, jurado)
      return response.success ? response.data : null
    } catch (error) {
      console.error('Erro ao atualizar jurado:', error)
      throw error
    }
  }

  // Método para compatibilidade com código existente
  static async addJurado(juradoData) {
    return this.createJurado(juradoData)
  }

  // Método para compatibilidade com código existente
  static async getJurado(id) {
    const jurados = await this.getJurados()
    return jurados.find(jurado => jurado.id === parseInt(id))
  }

  // ===== AVALIAÇÕES =====
  static async getAvaliacoes() {
    try {
      const response = await ApiService.getAvaliacoes()
      return response.success ? response.data : []
    } catch (error) {
      console.error('Erro ao buscar avaliações:', error)
      return []
    }
  }

  static async createAvaliacao(avaliacao) {
    try {
      const response = await ApiService.createAvaliacao(avaliacao)
      return response.success ? response.data : null
    } catch (error) {
      console.error('Erro ao criar avaliação:', error)
      throw error
    }
  }

  // Método para compatibilidade com código existente
  static async addAvaliacao(avaliacaoData) {
    return this.createAvaliacao(avaliacaoData)
  }

  // ===== RECEITAS =====
  static async getReceitas() {
    try {
      const response = await ApiService.getReceitas()
      return response.success ? response.data : []
    } catch (error) {
      console.error('Erro ao buscar receitas:', error)
      return {}
    }
  }

  static async createReceita(receita) {
    try {
      const response = await ApiService.createReceita(receita)
      return response.success ? response.data : null
    } catch (error) {
      console.error('Erro ao criar receita:', error)
      throw error
    }
  }

  // Método para compatibilidade com código existente
  static async addReceita(pratoId, receitaData) {
    const receita = {
      prato_id: pratoId,
      titulo: receitaData.titulo || 'Receita',
      ingredientes: JSON.stringify(receitaData.ingredientes || []),
      modo_preparo: JSON.stringify(receitaData.modoPreparo || []),
      tempo_preparo: receitaData.tempoPreparo || '',
      rendimento: receitaData.rendimento || '',
      dificuldade: receitaData.dificuldade || 'Médio'
    }
    return this.createReceita(receita)
  }

  // Método para compatibilidade com código existente
  static async getReceita(pratoId) {
    const receitas = await this.getReceitas()
    const receita = receitas.find(r => r.prato_id === parseInt(pratoId))
    
    if (receita) {
      // Converter formato para compatibilidade
      return {
        ingredientes: JSON.parse(receita.ingredientes || '[]'),
        modoPreparo: JSON.parse(receita.modo_preparo || '[]'),
        tempoPreparo: receita.tempo_preparo,
        rendimento: receita.rendimento,
        dificuldade: receita.dificuldade
      }
    }
    return null
  }

  // ===== RANKING =====
  static async getRanking() {
    try {
      const response = await ApiService.getRanking()
      return response.success ? response.data : []
    } catch (error) {
      console.error('Erro ao buscar ranking:', error)
      return []
    }
  }

  // ===== ESTATÍSTICAS =====
  static async getEstatisticas() {
    try {
      const response = await ApiService.getEstatisticas()
      if (response.success) {
        return response.data
      }
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error)
    }
    
    // Fallback para estatísticas
    return {
      total_pratos: 6,
      jurados_ativos: 5,
      total_avaliacoes: 0,
      total_receitas: 0,
      ultima_atualizacao: new Date().toISOString()
    }
  }

  // ===== CONFIGURAÇÕES =====
  static getConfig() {
    // Manter configurações locais por enquanto
    const config = localStorage.getItem('admin_config')
    if (config) {
      return JSON.parse(config)
    }
    
    // Configuração padrão
    return {
      competicao: {
        nome: 'O Quilo é Nosso 2025',
        ano: 2025,
        status: 'ativo'
      },
      criterios: [
        { id: 'originalidade', nome: 'Originalidade', peso: 2, descricao: 'Criatividade e inovação na preparação do prato' },
        { id: 'receita', nome: 'Receita (execução e produtos)', peso: 2, descricao: 'Qualidade da execução e dos ingredientes utilizados' },
        { id: 'apresentacao', nome: 'Apresentação', peso: 1, descricao: 'Visual, organização e disposição do prato' },
        { id: 'harmonia', nome: 'Harmonia do prato', peso: 2, descricao: 'Equilíbrio entre sabores, texturas e elementos' },
        { id: 'sabor', nome: 'Sabor', peso: 3, descricao: 'Qualidade gustativa e palatabilidade do prato' },
        { id: 'adequacao', nome: 'Adequação do prato ao serviço a quilo', peso: 3, descricao: 'Praticidade e adequação ao formato de self-service' }
      ],
      lastUpdate: new Date().toISOString()
    }
  }

  static updateConfig(config) {
    localStorage.setItem('admin_config', JSON.stringify(config))
    return config
  }

  // ===== DADOS FALLBACK (caso a API falhe) =====
  static getFallbackPratos() {
    return [
      {
        id: 1,
        nome: "Presunto Artesanal de Frango com Pequi",
        restaurante: "Junior Cozinha Brasileira",
        descricao: "Presunto artesanal de frango com pequi recheado, empanado em semente de abóbora, acompanhado de musseline de agrião e crispy de casca de maçã",
        chef: "Alex Ricardo dos Reis Martins",
        estado: "GO",
        categoria: "Prato Principal",
        tempo: "90 min",
        porcoes: "4-6 pessoas",
        imagem: "/images/pratos/junior_cozinha_brasileira.png",
        ativo: true
      },
      {
        id: 2,
        nome: "Café da Manhã Inglês Completo",
        restaurante: "Sabores Internacionais",
        descricao: "Café da manhã tradicional inglês com ovos, bacon, linguiça, feijão e cogumelos",
        chef: "Chef Internacional",
        estado: "SP",
        categoria: "Café da Manhã",
        tempo: "45 min",
        porcoes: "2 pessoas",
        imagem: "/images/pratos/cafe_manha_ingles.jpg",
        ativo: true
      },
      {
        id: 3,
        nome: "Salada Caesar com Camarão",
        restaurante: "Tempero da Bahia",
        descricao: "Salada caesar clássica com camarões grelhados, croutons artesanais e molho especial",
        chef: "Chef Baiano",
        estado: "BA",
        categoria: "Entrada",
        tempo: "30 min",
        porcoes: "3-4 pessoas",
        imagem: "/images/pratos/salada_caesar_camarao.jpg",
        ativo: true
      }
    ]
  }

  static getFallbackJurados() {
    return [
      {
        id: 1,
        nome: "Ana Paula",
        email: "ana.paula@email.com",
        especialidade: "Culinária Regional",
        ativo: true
      },
      {
        id: 2,
        nome: "Bruno Silva",
        email: "bruno.silva@email.com",
        especialidade: "Gastronomia Internacional",
        ativo: true
      },
      {
        id: 3,
        nome: "Carla Mendes",
        email: "carla.mendes@email.com",
        especialidade: "Confeitaria e Doces",
        ativo: true
      }
    ]
  }

  // ===== UTILITÁRIOS =====
  static async testConnection() {
    try {
      const response = await ApiService.healthCheck()
      return response.status === 'OK'
    } catch (error) {
      console.error('Erro ao testar conexão:', error)
      return false
    }
  }

  // Método para sincronização (compatibilidade)
  static syncWithVotingSystem() {
    // Este método agora é desnecessário pois o Supabase já sincroniza automaticamente
    console.log('Sincronização automática via Supabase')
  }
}

export default AdminDataService
