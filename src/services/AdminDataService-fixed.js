// AdminDataService.js - CORRIGIDO
// Sistema Híbrido: Admin usa Supabase + localStorage como backup
// Admin: Supabase (PostgreSQL) | Votação: localStorage
// Interface compatível com o código existente

import ApiService from './ApiService.js'

class AdminDataService {
  
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
      console.log('⚠️ Supabase falhou, usando localStorage - Pratos:', error.message)
    }
    
    // Fallback: localStorage
    return this.getPratosFromLocalStorage()
  }

  static getPratosFromLocalStorage() {
    try {
      const pratos = localStorage.getItem('pratos')
      return pratos ? JSON.parse(pratos) : [
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
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]
    } catch (error) {
      console.error('Erro ao ler pratos do localStorage:', error)
      return []
    }
  }

  // CORRIGIDO: Salvar no Supabase primeiro
  static async addPrato(pratoData) {
    try {
      console.log('🍽️ Adicionando prato no Supabase...', pratoData)
      
      // Tentar salvar no Supabase primeiro
      const response = await ApiService.createPrato(pratoData)
      console.log('✅ Prato adicionado no Supabase:', response)
      
      // Também salvar no localStorage como backup
      const pratos = this.getPratosFromLocalStorage()
      const novoId = Math.max(...pratos.map(p => p.id), 0) + 1
      
      const novoPrato = {
        id: response.data?.id || novoId,
        ...pratoData,
        ativo: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      
      pratos.push(novoPrato)
      localStorage.setItem('pratos', JSON.stringify(pratos))
      
      return { success: true, data: response.data || novoPrato }
    } catch (error) {
      console.error('❌ Erro ao adicionar prato:', error)
      
      // Fallback: salvar apenas no localStorage
      const pratos = this.getPratosFromLocalStorage()
      const novoId = Math.max(...pratos.map(p => p.id), 0) + 1
      
      const novoPrato = {
        id: novoId,
        ...pratoData,
        ativo: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      
      pratos.push(novoPrato)
      localStorage.setItem('pratos', JSON.stringify(pratos))
      
      return { success: true, data: novoPrato }
    }
  }

  // CORRIGIDO: Atualizar no Supabase primeiro
  static async updatePrato(id, pratoData) {
    try {
      console.log('🔄 Atualizando prato no Supabase...', id, pratoData)
      
      // Tentar atualizar no Supabase primeiro
      const response = await ApiService.updatePrato(id, pratoData)
      console.log('✅ Prato atualizado no Supabase:', response)
      
      // Também atualizar no localStorage
      const pratos = this.getPratosFromLocalStorage()
      const index = pratos.findIndex(prato => prato.id === parseInt(id))
      
      if (index !== -1) {
        pratos[index] = {
          ...pratos[index],
          ...pratoData,
          updated_at: new Date().toISOString()
        }
        localStorage.setItem('pratos', JSON.stringify(pratos))
      }
      
      return { success: true, data: response.data }
    } catch (error) {
      console.error('❌ Erro ao atualizar prato:', error)
      
      // Fallback: atualizar apenas no localStorage
      const pratos = this.getPratosFromLocalStorage()
      const index = pratos.findIndex(prato => prato.id === parseInt(id))
      
      if (index !== -1) {
        pratos[index] = {
          ...pratos[index],
          ...pratoData,
          updated_at: new Date().toISOString()
        }
        localStorage.setItem('pratos', JSON.stringify(pratos))
        return { success: true, data: pratos[index] }
      }
      
      throw new Error('Prato não encontrado')
    }
  }

  // CORRIGIDO: Deletar no Supabase primeiro
  static async deletePrato(id) {
    try {
      console.log('🗑️ Deletando prato no Supabase...', id)
      
      // Tentar deletar no Supabase primeiro
      const response = await ApiService.deletePrato(id)
      console.log('✅ Prato deletado no Supabase:', response)
      
      // Também deletar do localStorage
      const pratos = this.getPratosFromLocalStorage()
      const filteredPratos = pratos.filter(prato => prato.id !== parseInt(id))
      localStorage.setItem('pratos', JSON.stringify(filteredPratos))
      
      return { success: true }
    } catch (error) {
      console.error('❌ Erro ao deletar prato:', error)
      
      // Fallback: deletar apenas do localStorage
      const pratos = this.getPratosFromLocalStorage()
      const filteredPratos = pratos.filter(prato => prato.id !== parseInt(id))
      localStorage.setItem('pratos', JSON.stringify(filteredPratos))
      
      return { success: true }
    }
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
      console.log('⚠️ Supabase falhou, usando localStorage - Jurados:', error.message)
    }
    
    // Fallback: localStorage
    return this.getJuradosFromLocalStorage()
  }

  static getJuradosFromLocalStorage() {
    try {
      const jurados = localStorage.getItem('jurados')
      return jurados ? JSON.parse(jurados) : [
        {
          id: 1,
          nome: "Ana Paula",
          email: "ana.paula@email.com",
          especialidade: "Culinária Regional",
          biografia: "Especialista em culinária regional brasileira",
          telefone: "(11) 99999-0001",
          ativo: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]
    } catch (error) {
      console.error('Erro ao ler jurados do localStorage:', error)
      return []
    }
  }

  // CORRIGIDO: Salvar jurado no Supabase primeiro
  static async addJurado(juradoData) {
    try {
      console.log('👥 Adicionando jurado no Supabase...', juradoData)
      
      const response = await ApiService.createJurado(juradoData)
      console.log('✅ Jurado adicionado no Supabase:', response)
      
      // Também salvar no localStorage como backup
      const jurados = this.getJuradosFromLocalStorage()
      const novoId = Math.max(...jurados.map(j => j.id), 0) + 1
      
      const novoJurado = {
        id: response.data?.id || novoId,
        ...juradoData,
        ativo: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      
      jurados.push(novoJurado)
      localStorage.setItem('jurados', JSON.stringify(jurados))
      
      return { success: true, data: response.data || novoJurado }
    } catch (error) {
      console.error('❌ Erro ao adicionar jurado:', error)
      
      // Fallback: salvar apenas no localStorage
      const jurados = this.getJuradosFromLocalStorage()
      const novoId = Math.max(...jurados.map(j => j.id), 0) + 1
      
      const novoJurado = {
        id: novoId,
        ...juradoData,
        ativo: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      
      jurados.push(novoJurado)
      localStorage.setItem('jurados', JSON.stringify(jurados))
      
      return { success: true, data: novoJurado }
    }
  }

  // CORRIGIDO: Atualizar jurado no Supabase primeiro
  static async updateJurado(id, juradoData) {
    try {
      console.log('🔄 Atualizando jurado no Supabase...', id, juradoData)
      
      const response = await ApiService.updateJurado(id, juradoData)
      console.log('✅ Jurado atualizado no Supabase:', response)
      
      // Também atualizar no localStorage
      const jurados = this.getJuradosFromLocalStorage()
      const index = jurados.findIndex(jurado => jurado.id === parseInt(id))
      
      if (index !== -1) {
        jurados[index] = {
          ...jurados[index],
          ...juradoData,
          updated_at: new Date().toISOString()
        }
        localStorage.setItem('jurados', JSON.stringify(jurados))
      }
      
      return { success: true, data: response.data }
    } catch (error) {
      console.error('❌ Erro ao atualizar jurado:', error)
      
      // Fallback: atualizar apenas no localStorage
      const jurados = this.getJuradosFromLocalStorage()
      const index = jurados.findIndex(jurado => jurado.id === parseInt(id))
      
      if (index !== -1) {
        jurados[index] = {
          ...jurados[index],
          ...juradoData,
          updated_at: new Date().toISOString()
        }
        localStorage.setItem('jurados', JSON.stringify(jurados))
        return { success: true, data: jurados[index] }
      }
      
      throw new Error('Jurado não encontrado')
    }
  }

  // CORRIGIDO: Deletar jurado no Supabase primeiro
  static async deleteJurado(id) {
    try {
      console.log('🗑️ Deletando jurado no Supabase...', id)
      
      const response = await ApiService.deleteJurado(id)
      console.log('✅ Jurado deletado no Supabase:', response)
      
      // Também deletar do localStorage
      const jurados = this.getJuradosFromLocalStorage()
      const filteredJurados = jurados.filter(jurado => jurado.id !== parseInt(id))
      localStorage.setItem('jurados', JSON.stringify(filteredJurados))
      
      return { success: true }
    } catch (error) {
      console.error('❌ Erro ao deletar jurado:', error)
      
      // Fallback: deletar apenas do localStorage
      const jurados = this.getJuradosFromLocalStorage()
      const filteredJurados = jurados.filter(jurado => jurado.id !== parseInt(id))
      localStorage.setItem('jurados', JSON.stringify(filteredJurados))
      
      return { success: true }
    }
  }

  // ===== AVALIAÇÕES =====
  
  static async getAvaliacoes() {
    try {
      const response = await ApiService.getAvaliacoes()
      if (response && response.success && Array.isArray(response.data)) {
        return response.data
      }
    } catch (error) {
      console.log('⚠️ Supabase falhou, usando localStorage - Avaliações:', error.message)
    }
    
    // Fallback: localStorage
    const avaliacoes = localStorage.getItem('avaliacoes')
    return avaliacoes ? JSON.parse(avaliacoes) : []
  }

  // CORRIGIDO: Salvar avaliação no Supabase primeiro
  static async addAvaliacao(avaliacaoData) {
    try {
      console.log('📊 Adicionando avaliação no Supabase...', avaliacaoData)
      
      const response = await ApiService.createAvaliacao(avaliacaoData)
      console.log('✅ Avaliação adicionada no Supabase:', response)
      
      // Também salvar no localStorage como backup
      const avaliacoes = JSON.parse(localStorage.getItem('avaliacoes') || '[]')
      const novoId = Math.max(...avaliacoes.map(a => a.id), 0) + 1
      
      const novaAvaliacao = {
        id: response.data?.id || novoId,
        ...avaliacaoData,
        created_at: new Date().toISOString()
      }
      
      avaliacoes.push(novaAvaliacao)
      localStorage.setItem('avaliacoes', JSON.stringify(avaliacoes))
      
      return { success: true, data: response.data || novaAvaliacao }
    } catch (error) {
      console.error('❌ Erro ao adicionar avaliação:', error)
      
      // Fallback: salvar apenas no localStorage
      const avaliacoes = JSON.parse(localStorage.getItem('avaliacoes') || '[]')
      const novoId = Math.max(...avaliacoes.map(a => a.id), 0) + 1
      
      const novaAvaliacao = {
        id: novoId,
        ...avaliacaoData,
        created_at: new Date().toISOString()
      }
      
      avaliacoes.push(novaAvaliacao)
      localStorage.setItem('avaliacoes', JSON.stringify(avaliacoes))
      
      return { success: true, data: novaAvaliacao }
    }
  }

  // ===== ESTATÍSTICAS =====
  
  static async getEstatisticas() {
    try {
      const response = await ApiService.getEstatisticas()
      console.log('✅ Estatísticas carregadas:', response)
      if (response && response.success) {
        return response.data
      }
    } catch (error) {
      console.log('⚠️ Erro ao carregar estatísticas do Supabase:', error.message)
    }
    
    // Fallback: calcular estatísticas do localStorage
    const pratos = this.getPratosFromLocalStorage()
    const jurados = this.getJuradosFromLocalStorage()
    const avaliacoes = JSON.parse(localStorage.getItem('avaliacoes') || '[]')
    const receitas = JSON.parse(localStorage.getItem('receitas') || '[]')
    
    return {
      total_pratos: pratos.length,
      jurados_ativos: jurados.filter(j => j.ativo).length,
      total_avaliacoes: avaliacoes.length,
      total_receitas: receitas.length,
      ultima_atualizacao: new Date().toISOString()
    }
  }

  // ===== VALIDAÇÕES =====
  
  static validatePratoData(data) {
    if (!data.nome || data.nome.trim() === '') {
      throw new Error('Nome do prato é obrigatório')
    }
    if (!data.restaurante || data.restaurante.trim() === '') {
      throw new Error('Nome do restaurante é obrigatório')
    }
    if (!data.descricao || data.descricao.trim() === '') {
      throw new Error('Descrição é obrigatória')
    }
  }

  static validateJuradoData(data) {
    if (!data.nome || data.nome.trim() === '') {
      throw new Error('Nome do jurado é obrigatório')
    }
    if (!data.email || data.email.trim() === '') {
      throw new Error('Email é obrigatório')
    }
    if (!data.especialidade || data.especialidade.trim() === '') {
      throw new Error('Especialidade é obrigatória')
    }
  }

  // ===== UTILITÁRIOS =====
  
  static async imageToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }
}

export default AdminDataService
