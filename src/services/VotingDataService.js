// Serviço de Dados para Votação - O Quilo é Nosso 2025
// Conectado ao Supabase com fallback para localStorage
// Sincronização em tempo real com painel administrativo

import ApiService from './ApiService.js'

class VotingDataService {
  
  // ===== CONFIGURAÇÃO =====
  static useSupabase = true
  static fallbackToLocalStorage = true
  
  // ===== PRATOS =====
  static async getPratos() {
    if (this.useSupabase) {
      try {
        const response = await ApiService.getPratos()
        console.log('✅ Pratos do Supabase (Votação):', response)
        if (response && response.success && Array.isArray(response.data)) {
          // Salvar no localStorage como backup
          localStorage.setItem('voting_pratos_backup', JSON.stringify(response.data))
          return response.data
        }
      } catch (error) {
        console.log('⚠️ Supabase indisponível para votação, usando localStorage:', error.message)
      }
    }
    
    // Fallback para localStorage
    return this.getPratosFromLocalStorage()
  }

  static getPratosFromLocalStorage() {
    // Tentar backup primeiro
    let pratos = localStorage.getItem('voting_pratos_backup')
    if (pratos) {
      console.log('✅ Pratos do backup localStorage')
      return JSON.parse(pratos)
    }
    
    // Dados padrão se não existir backup
    pratos = localStorage.getItem('admin_pratos')
    if (pratos) {
      console.log('✅ Pratos do localStorage admin')
      return JSON.parse(pratos)
    }
    
    // Dados iniciais mínimos
    const pratosIniciais = [
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
        tempo: "30 min",
        porcoes: "1-2 pessoas",
        imagem: "/images/pratos/prato-de-pequeno-almoco-ingles.jpg",
        ativo: true
      },
      {
        id: 3,
        nome: "Salada Caesar com Camarão",
        restaurante: "Tempero da Bahia",
        descricao: "Salada caesar clássica com camarões grelhados, parmesão e croutons artesanais",
        chef: "Chef Baiano",
        estado: "BA",
        categoria: "Salada",
        tempo: "20 min",
        porcoes: "2-3 pessoas",
        imagem: "/images/pratos/camarao-caesar-salada-vista-superior.jpg",
        ativo: true
      },
      {
        id: 4,
        nome: "Sopa Oriental de Ervilha",
        restaurante: "Pantanal Gourmet",
        descricao: "Sopa cremosa de ervilha com temperos orientais e carne desfiada",
        chef: "Chef Oriental",
        estado: "MS",
        categoria: "Sopa",
        tempo: "35 min",
        porcoes: "3-4 pessoas",
        imagem: "/images/pratos/sopa-de-ervilha-oriental-deliciosa-antropofaga-com-carne-em-uma-tabela-de-madeira-vista-de-alto-angulo.jpg",
        ativo: true
      },
      {
        id: 5,
        nome: "Penne com Molho de Tomate",
        restaurante: "Massa & Arte",
        descricao: "Macarrão penne al dente com molho de tomate artesanal, carne e queijo parmesão",
        chef: "Chef Italiano",
        estado: "RJ",
        categoria: "Massa",
        tempo: "25 min",
        porcoes: "2-3 pessoas",
        imagem: "/images/pratos/macarrao-penne-com-molho-de-tomate-carne-e-queijo-ralado.jpg",
        ativo: true
      },
      {
        id: 6,
        nome: "Salada Caesar Gourmet",
        restaurante: "Verde & Sabor",
        descricao: "Salada caesar premium com molho especial da casa e parmesão envelhecido",
        chef: "Chef Gourmet",
        estado: "MG",
        categoria: "Salada",
        tempo: "15 min",
        porcoes: "1-2 pessoas",
        imagem: "/images/pratos/salada-caesar-com-tomate-e-pano-em-prato-triangular.jpg",
        ativo: true
      }
    ]
    
    localStorage.setItem('voting_pratos_backup', JSON.stringify(pratosIniciais))
    console.log('✅ Pratos iniciais criados para votação')
    return pratosIniciais
  }

  // ===== JURADOS =====
  static async getJurados() {
    if (this.useSupabase) {
      try {
        const response = await ApiService.getJurados()
        console.log('✅ Jurados do Supabase (Votação):', response)
        if (response && response.success && Array.isArray(response.data)) {
          // Salvar no localStorage como backup
          localStorage.setItem('voting_jurados_backup', JSON.stringify(response.data))
          return response.data
        }
      } catch (error) {
        console.log('⚠️ Supabase indisponível para jurados, usando localStorage:', error.message)
      }
    }
    
    // Fallback para localStorage
    return this.getJuradosFromLocalStorage()
  }

  static getJuradosFromLocalStorage() {
    // Tentar backup primeiro
    let jurados = localStorage.getItem('voting_jurados_backup')
    if (jurados) {
      console.log('✅ Jurados do backup localStorage')
      return JSON.parse(jurados)
    }
    
    // Dados padrão se não existir backup
    jurados = localStorage.getItem('admin_jurados')
    if (jurados) {
      console.log('✅ Jurados do localStorage admin')
      return JSON.parse(jurados)
    }
    
    // Dados iniciais mínimos
    const juradosIniciais = [
      {
        id: 1,
        nome: 'Ana Paula',
        email: 'ana.paula@oquiloenosso.com',
        especialidade: 'Culinária Regional',
        ativo: true
      },
      {
        id: 2,
        nome: 'Bruno Silva',
        email: 'bruno.silva@oquiloenosso.com',
        especialidade: 'Gastronomia Internacional',
        ativo: true
      },
      {
        id: 3,
        nome: 'Carla Mendes',
        email: 'carla.mendes@oquiloenosso.com',
        especialidade: 'Confeitaria e Sobremesas',
        ativo: true
      },
      {
        id: 4,
        nome: 'Diego Rocha',
        email: 'diego.rocha@oquiloenosso.com',
        especialidade: 'Churrasco e Carnes',
        ativo: true
      },
      {
        id: 5,
        nome: 'Fernanda Alves',
        email: 'fernanda.alves@oquiloenosso.com',
        especialidade: 'Culinária Saudável',
        ativo: true
      }
    ]
    
    localStorage.setItem('voting_jurados_backup', JSON.stringify(juradosIniciais))
    console.log('✅ Jurados iniciais criados para votação')
    return juradosIniciais
  }

  // ===== AVALIAÇÕES =====
  static async getAvaliacoes() {
    if (this.useSupabase) {
      try {
        const response = await ApiService.getAvaliacoes()
        console.log('✅ Avaliações do Supabase (Votação):', response)
        if (response && response.success && Array.isArray(response.data)) {
          // Salvar no localStorage como backup
          localStorage.setItem('voting_avaliacoes_backup', JSON.stringify(response.data))
          return response.data
        }
      } catch (error) {
        console.log('⚠️ Supabase indisponível para avaliações, usando localStorage:', error.message)
      }
    }
    
    // Fallback para localStorage
    const avaliacoes = localStorage.getItem('avaliacoes') || localStorage.getItem('voting_avaliacoes_backup')
    return avaliacoes ? JSON.parse(avaliacoes) : []
  }

  static async addAvaliacao(avaliacaoData) {
    console.log('🗳️ Salvando avaliação:', avaliacaoData)
    
    const novaAvaliacao = {
      ...avaliacaoData,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      fonte: 'painel_votacao'
    }
    
    let salvouSupabase = false
    
    // Tentar salvar no Supabase primeiro (PRIORIDADE)
    if (this.useSupabase) {
      try {
        const response = await ApiService.createAvaliacao(novaAvaliacao)
        console.log('✅ Avaliação salva no Supabase:', response)
        salvouSupabase = true
        
        // Atualizar backup local também
        const avaliacoes = await this.getAvaliacoes()
        avaliacoes.push(novaAvaliacao)
        localStorage.setItem('avaliacoes', JSON.stringify(avaliacoes))
        localStorage.setItem('voting_avaliacoes_backup', JSON.stringify(avaliacoes))
        
      } catch (error) {
        console.error('❌ Erro ao salvar no Supabase:', error)
        salvouSupabase = false
      }
    }
    
    // Se não salvou no Supabase, salvar no localStorage
    if (!salvouSupabase) {
      console.log('⚠️ Salvando avaliação apenas no localStorage')
      const avaliacoes = await this.getAvaliacoes()
      avaliacoes.push(novaAvaliacao)
      localStorage.setItem('avaliacoes', JSON.stringify(avaliacoes))
      
      // Marcar para sincronização posterior
      this.markForSync(novaAvaliacao)
    }
    
    return {
      success: true,
      data: novaAvaliacao,
      savedToSupabase: salvouSupabase,
      message: salvouSupabase ? 'Avaliação salva com sucesso!' : 'Avaliação salva localmente (será sincronizada quando possível)'
    }
  }

  // ===== CONFIGURAÇÕES =====
  static async getConfig() {
    if (this.useSupabase) {
      try {
        const response = await ApiService.getConfig()
        if (response && response.success) {
          localStorage.setItem('voting_config_backup', JSON.stringify(response.data))
          return response.data
        }
      } catch (error) {
        console.log('⚠️ Config do Supabase indisponível, usando localStorage')
      }
    }
    
    // Fallback para localStorage
    const config = localStorage.getItem('admin_config') || localStorage.getItem('voting_config_backup')
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
        { id: 'receita', nome: 'Receita (execução e produtos)', peso: 3, descricao: 'Qualidade da execução e dos ingredientes utilizados' },
        { id: 'apresentacao', nome: 'Apresentação', peso: 2, descricao: 'Visual, organização e disposição do prato' },
        { id: 'harmonia', nome: 'Harmonia do prato', peso: 2, descricao: 'Equilíbrio entre sabores, texturas e elementos' },
        { id: 'sabor', nome: 'Sabor', peso: 3, descricao: 'Qualidade gustativa e palatabilidade do prato' },
        { id: 'adequacao', nome: 'Adequação do prato ao serviço a quilo', peso: 1, descricao: 'Praticidade e adequação ao formato de self-service' }
      ]
    }
  }

  // ===== RANKING =====
  static async getRanking() {
    const avaliacoes = await this.getAvaliacoes()
    const pratos = await this.getPratos()
    const config = await this.getConfig()
    
    // Calcular ranking com base nas avaliações
    const ranking = pratos.map(prato => {
      const avaliacoesPrato = avaliacoes.filter(av => av.pratoId === prato.id)
      
      if (avaliacoesPrato.length === 0) {
        return {
          ...prato,
          pontuacaoTotal: 0,
          pontuacaoMedia: 0,
          totalAvaliacoes: 0,
          detalhes: {}
        }
      }
      
      // Calcular pontuação por critério
      const detalhes = {}
      let pontuacaoTotal = 0
      
      config.criterios.forEach(criterio => {
        const notasCriterio = avaliacoesPrato.map(av => av.criterios[criterio.id] || 0)
        const media = notasCriterio.reduce((sum, nota) => sum + nota, 0) / notasCriterio.length
        const pontuacaoCriterio = media * criterio.peso
        
        detalhes[criterio.id] = {
          media: media,
          peso: criterio.peso,
          pontuacao: pontuacaoCriterio
        }
        
        pontuacaoTotal += pontuacaoCriterio
      })
      
      return {
        ...prato,
        pontuacaoTotal: pontuacaoTotal,
        pontuacaoMedia: pontuacaoTotal / config.criterios.reduce((sum, c) => sum + c.peso, 0),
        totalAvaliacoes: avaliacoesPrato.length,
        detalhes: detalhes
      }
    })
    
    // Ordenar por pontuação total (decrescente)
    return ranking.sort((a, b) => b.pontuacaoTotal - a.pontuacaoTotal)
  }

  // ===== SINCRONIZAÇÃO =====
  static markForSync(item) {
    const pendingSync = JSON.parse(localStorage.getItem('pending_sync') || '[]')
    pendingSync.push({
      type: 'avaliacao',
      data: item,
      timestamp: new Date().toISOString()
    })
    localStorage.setItem('pending_sync', JSON.stringify(pendingSync))
  }

  static async syncPendingItems() {
    const pendingSync = JSON.parse(localStorage.getItem('pending_sync') || '[]')
    
    if (pendingSync.length === 0) {
      return { success: true, message: 'Nenhum item pendente para sincronizar' }
    }
    
    let syncedCount = 0
    const remainingItems = []
    
    for (const item of pendingSync) {
      try {
        if (item.type === 'avaliacao') {
          await ApiService.createAvaliacao(item.data)
          syncedCount++
          console.log('✅ Item sincronizado:', item.data.id)
        }
      } catch (error) {
        console.log('❌ Erro ao sincronizar item:', error.message)
        remainingItems.push(item)
      }
    }
    
    // Atualizar lista de pendentes
    localStorage.setItem('pending_sync', JSON.stringify(remainingItems))
    
    return {
      success: true,
      message: `${syncedCount} itens sincronizados. ${remainingItems.length} pendentes.`,
      synced: syncedCount,
      pending: remainingItems.length
    }
  }

  // ===== UTILITÁRIOS =====
  static async testConnection() {
    try {
      const response = await ApiService.healthCheck()
      return response && response.status === 'OK'
    } catch (error) {
      return false
    }
  }

  static async getConnectionStatus() {
    const supabaseOnline = await this.testConnection()
    const pendingSync = JSON.parse(localStorage.getItem('pending_sync') || '[]')
    
    return {
      supabase: supabaseOnline,
      localStorage: true,
      pendingSync: pendingSync.length,
      mode: supabaseOnline ? 'online' : 'offline',
      lastSync: localStorage.getItem('last_sync_time') || 'nunca'
    }
  }

  static getSystemInfo() {
    return {
      service: 'VotingDataService',
      version: '2.0-supabase',
      primarySource: 'Supabase PostgreSQL',
      fallbackSource: 'localStorage',
      syncMode: 'automatic',
      realTimeSync: true
    }
  }
}

export default VotingDataService
