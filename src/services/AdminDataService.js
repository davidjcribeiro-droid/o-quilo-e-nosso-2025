// Sistema Híbrido de Dados - O Quilo é Nosso 2025
// Admin: Supabase (PostgreSQL) | Votação: localStorage
// Interface compatível com o código existente

import ApiService from './ApiService.js'

class AdminDataService {
  
  // ===== CONFIGURAÇÃO =====
  static useSupabaseForAdmin = true
  static useLocalStorageForVoting = true
  
  // ===== PRATOS =====
  static async getPratos() {
    // Para admin, tentar Supabase primeiro, fallback para localStorage
    try {
      const response = await ApiService.getPratos()
      console.log('✅ Tentativa Supabase - Pratos:', response)
      if (response && response.success && Array.isArray(response.data)) {
        return response.data
      }
    } catch (error) {
      console.log('⚠️ Supabase indisponível, usando localStorage:', error.message)
    }
    
    // Fallback para localStorage
    return this.getPratosFromLocalStorage()
  }

  static getPratosFromLocalStorage() {
    const pratos = localStorage.getItem('admin_pratos')
    if (pratos) {
      console.log('✅ Pratos do localStorage')
      return JSON.parse(pratos)
    }
    
    // Dados iniciais se não existirem
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
        ativo: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
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
        ativo: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
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
        ativo: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
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
        ativo: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
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
        ativo: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
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
        ativo: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]
    
    localStorage.setItem('admin_pratos', JSON.stringify(pratosIniciais))
    console.log('✅ Pratos iniciais criados no localStorage')
    return pratosIniciais
  }

  // Método para compatibilidade
  static getPrato(id) {
    const pratos = this.getPratosFromLocalStorage()
    return pratos.find(prato => prato.id === parseInt(id))
  }

  // Método para compatibilidade
  static addPrato(pratoData) {
    const pratos = this.getPratosFromLocalStorage()
    const novoId = Math.max(...pratos.map(p => p.id), 0) + 1
    
    const novoPrato = {
      ...pratoData,
      id: novoId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    pratos.push(novoPrato)
    localStorage.setItem('admin_pratos', JSON.stringify(pratos))
    
    // Tentar salvar no Supabase também
    this.syncPratoToSupabase(novoPrato)
    
    return novoPrato
  }

  // Método para compatibilidade
  static updatePrato(id, pratoData) {
    const pratos = this.getPratosFromLocalStorage()
    const index = pratos.findIndex(prato => prato.id === parseInt(id))
    
    if (index !== -1) {
      pratos[index] = {
        ...pratos[index],
        ...pratoData,
        updatedAt: new Date().toISOString()
      }
      localStorage.setItem('admin_pratos', JSON.stringify(pratos))
      
      // Tentar atualizar no Supabase também
      this.syncPratoToSupabase(pratos[index])
      
      return pratos[index]
    }
    return null
  }

  // Método para compatibilidade
  static deletePrato(id) {
    const pratos = this.getPratosFromLocalStorage()
    const filteredPratos = pratos.filter(prato => prato.id !== parseInt(id))
    localStorage.setItem('admin_pratos', JSON.stringify(filteredPratos))
    return true
  }

  // ===== JURADOS =====
  static async getJurados() {
    // Para admin, tentar Supabase primeiro, fallback para localStorage
    try {
      const response = await ApiService.getJurados()
      console.log('✅ Tentativa Supabase - Jurados:', response)
      if (response && response.success && Array.isArray(response.data)) {
        return response.data
      }
    } catch (error) {
      console.log('⚠️ Supabase indisponível, usando localStorage:', error.message)
    }
    
    // Fallback para localStorage
    return this.getJuradosFromLocalStorage()
  }

  static getJuradosFromLocalStorage() {
    const jurados = localStorage.getItem('admin_jurados')
    if (jurados) {
      console.log('✅ Jurados do localStorage')
      return JSON.parse(jurados)
    }
    
    // Dados iniciais se não existirem
    const juradosIniciais = [
      {
        id: 1,
        nome: 'Ana Paula',
        email: 'ana.paula@oquiloenosso.com',
        especialidade: 'Culinária Regional',
        ativo: true,
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        nome: 'Bruno Silva',
        email: 'bruno.silva@oquiloenosso.com',
        especialidade: 'Gastronomia Internacional',
        ativo: true,
        createdAt: new Date().toISOString()
      },
      {
        id: 3,
        nome: 'Carla Mendes',
        email: 'carla.mendes@oquiloenosso.com',
        especialidade: 'Confeitaria e Sobremesas',
        ativo: true,
        createdAt: new Date().toISOString()
      },
      {
        id: 4,
        nome: 'Diego Rocha',
        email: 'diego.rocha@oquiloenosso.com',
        especialidade: 'Churrasco e Carnes',
        ativo: true,
        createdAt: new Date().toISOString()
      },
      {
        id: 5,
        nome: 'Fernanda Alves',
        email: 'fernanda.alves@oquiloenosso.com',
        especialidade: 'Culinária Saudável',
        ativo: true,
        createdAt: new Date().toISOString()
      }
    ]
    
    localStorage.setItem('admin_jurados', JSON.stringify(juradosIniciais))
    console.log('✅ Jurados iniciais criados no localStorage')
    return juradosIniciais
  }

  // Métodos para compatibilidade com jurados
  static getJurado(id) {
    const jurados = this.getJuradosFromLocalStorage()
    return jurados.find(jurado => jurado.id === parseInt(id))
  }

  static addJurado(juradoData) {
    const jurados = this.getJuradosFromLocalStorage()
    const novoId = Math.max(...jurados.map(j => j.id), 0) + 1
    
    const novoJurado = {
      ...juradoData,
      id: novoId,
      createdAt: new Date().toISOString()
    }

    jurados.push(novoJurado)
    localStorage.setItem('admin_jurados', JSON.stringify(jurados))
    
    // Tentar salvar no Supabase também
    this.syncJuradoToSupabase(novoJurado)
    
    return novoJurado
  }

  static updateJurado(id, juradoData) {
    const jurados = this.getJuradosFromLocalStorage()
    const index = jurados.findIndex(jurado => jurado.id === parseInt(id))
    
    if (index !== -1) {
      jurados[index] = {
        ...jurados[index],
        ...juradoData,
        updatedAt: new Date().toISOString()
      }
      localStorage.setItem('admin_jurados', JSON.stringify(jurados))
      
      // Tentar atualizar no Supabase também
      this.syncJuradoToSupabase(jurados[index])
      
      return jurados[index]
    }
    return null
  }

  // ===== AVALIAÇÕES =====
  static getAvaliacoes() {
    const avaliacoes = localStorage.getItem('avaliacoes')
    return avaliacoes ? JSON.parse(avaliacoes) : []
  }

  static addAvaliacao(avaliacaoData) {
    const avaliacoes = this.getAvaliacoes()
    const novaAvaliacao = {
      ...avaliacaoData,
      id: Date.now(),
      timestamp: new Date().toISOString()
    }
    
    avaliacoes.push(novaAvaliacao)
    localStorage.setItem('avaliacoes', JSON.stringify(avaliacoes))
    
    // Tentar salvar no Supabase também (background)
    this.syncAvaliacaoToSupabase(novaAvaliacao)
    
    return novaAvaliacao
  }

  // ===== RECEITAS =====
  static getReceitas() {
    const receitas = localStorage.getItem('admin_receitas')
    return receitas ? JSON.parse(receitas) : {}
  }

  static getReceita(pratoId) {
    const receitas = this.getReceitas()
    return receitas[pratoId] || null
  }

  static addReceita(pratoId, receitaData) {
    const receitas = this.getReceitas()
    receitas[pratoId] = {
      ...receitaData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    localStorage.setItem('admin_receitas', JSON.stringify(receitas))
    return receitas[pratoId]
  }

  // ===== CONFIGURAÇÕES =====
  static getConfig() {
    const config = localStorage.getItem('admin_config')
    if (config) {
      return JSON.parse(config)
    }
    
    // Configuração padrão
    const configInicial = {
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
      ],
      lastUpdate: new Date().toISOString()
    }
    
    localStorage.setItem('admin_config', JSON.stringify(configInicial))
    return configInicial
  }

  static updateConfig(config) {
    localStorage.setItem('admin_config', JSON.stringify(config))
    return config
  }

  // ===== ESTATÍSTICAS =====
  static async getEstatisticas() {
    const pratos = await this.getPratos()
    const jurados = await this.getJurados()
    const avaliacoes = this.getAvaliacoes()
    const receitas = this.getReceitas()
    
    return {
      total_pratos: Array.isArray(pratos) ? pratos.length : 0,
      jurados_ativos: Array.isArray(jurados) ? jurados.filter(j => j.ativo).length : 0,
      total_avaliacoes: Array.isArray(avaliacoes) ? avaliacoes.length : 0,
      total_receitas: Object.keys(receitas).length,
      ultima_atualizacao: new Date().toISOString(),
      fonte: 'Sistema Híbrido (localStorage + Supabase)'
    }
  }

  // ===== SINCRONIZAÇÃO (Background) =====
  static async syncPratoToSupabase(prato) {
    try {
      await ApiService.createPrato(prato)
      console.log('✅ Prato sincronizado com Supabase:', prato.nome)
    } catch (error) {
      console.log('⚠️ Erro ao sincronizar prato:', error.message)
    }
  }

  static async syncJuradoToSupabase(jurado) {
    try {
      await ApiService.createJurado(jurado)
      console.log('✅ Jurado sincronizado com Supabase:', jurado.nome)
    } catch (error) {
      console.log('⚠️ Erro ao sincronizar jurado:', error.message)
    }
  }

  static async syncAvaliacaoToSupabase(avaliacao) {
    try {
      await ApiService.createAvaliacao(avaliacao)
      console.log('✅ Avaliação sincronizada com Supabase')
    } catch (error) {
      console.log('⚠️ Erro ao sincronizar avaliação:', error.message)
    }
  }

  // ===== UTILITÁRIOS =====
  static syncWithVotingSystem() {
    // Método para compatibilidade - não faz nada pois já está sincronizado
    console.log('✅ Sistema híbrido - sincronização automática')
  }

  static async testConnection() {
    try {
      const response = await ApiService.healthCheck()
      return response.status === 'OK'
    } catch (error) {
      return false
    }
  }

  static getSystemInfo() {
    return {
      mode: 'hybrid',
      adminDataSource: 'Supabase + localStorage (fallback)',
      votingDataSource: 'localStorage',
      version: '2.0-hybrid',
      supabaseAvailable: this.testConnection()
    }
  }
}

export default AdminDataService
