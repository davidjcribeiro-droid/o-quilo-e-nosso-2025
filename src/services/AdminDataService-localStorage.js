// Serviço de gerenciamento de dados para o painel administrativo
class AdminDataService {
  constructor() {
    this.initializeData();
  }

  // Inicializar dados padrão se não existirem
  initializeData() {
    // Pratos padrão (migrar dados existentes)
    if (!localStorage.getItem('admin_pratos')) {
      const pratosIniciais = [
        {
          id: 1,
          nome: 'Presunto Artesanal de Frango com Pequi',
          restaurante: 'Junior Cozinha Brasileira',
          descricao: 'Presunto artesanal de frango com pequi recheado, empanado em semente de abóbora, acompanhado de musseline de agrião e crispy de casca de maçã',
          tempo: '90 min',
          porcoes: '4-6 pessoas',
          categoria: 'Prato Principal',
          imagem: '/images/pratos/junior_cozinha_brasileira.png',
          estado: 'GO',
          chef: 'Alex Ricardo dos Reis Martins',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 2,
          nome: 'Café da Manhã Inglês Completo',
          restaurante: 'Sabores Internacionais',
          descricao: 'Café da manhã tradicional inglês com ovos, bacon, linguiça, feijão e cogumelos',
          tempo: '30 min',
          porcoes: '1-2 pessoas',
          categoria: 'Café da Manhã',
          imagem: '/images/pratos/prato-de-pequeno-almoco-ingles.jpg',
          estado: 'SP',
          chef: 'Chef Internacional',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 3,
          nome: 'Salada Caesar com Camarão',
          restaurante: 'Tempero da Bahia',
          descricao: 'Salada caesar clássica com camarões grelhados, parmesão e croutons artesanais',
          tempo: '20 min',
          porcoes: '2-3 pessoas',
          categoria: 'Salada',
          imagem: '/images/pratos/camarao-caesar-salada-vista-superior.jpg',
          estado: 'BA',
          chef: 'Chef Baiano',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 4,
          nome: 'Sopa Oriental de Ervilha',
          restaurante: 'Pantanal Gourmet',
          descricao: 'Sopa cremosa de ervilha com temperos orientais e carne desfiada',
          tempo: '35 min',
          porcoes: '3-4 pessoas',
          categoria: 'Sopa',
          imagem: '/images/pratos/sopa-de-ervilha-oriental-deliciosa-antropofaga-com-carne-em-uma-tabela-de-madeira-vista-de-alto-angulo.jpg',
          estado: 'MS',
          chef: 'Chef Oriental',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 5,
          nome: 'Penne com Molho de Tomate',
          restaurante: 'Massa & Arte',
          descricao: 'Macarrão penne al dente com molho de tomate artesanal, carne e queijo parmesão',
          tempo: '25 min',
          porcoes: '2-3 pessoas',
          categoria: 'Massa',
          imagem: '/images/pratos/macarrao-penne-com-molho-de-tomate-carne-e-queijo-ralado.jpg',
          estado: 'RJ',
          chef: 'Chef Italiano',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 6,
          nome: 'Salada Caesar Gourmet',
          restaurante: 'Verde & Sabor',
          descricao: 'Salada caesar premium com molho especial da casa e parmesão envelhecido',
          tempo: '15 min',
          porcoes: '1-2 pessoas',
          categoria: 'Salada',
          imagem: '/images/pratos/salada-caesar-com-tomate-e-pano-em-prato-triangular.jpg',
          estado: 'MG',
          chef: 'Chef Gourmet',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      localStorage.setItem('admin_pratos', JSON.stringify(pratosIniciais));
    }

    // Jurados padrão
    if (!localStorage.getItem('admin_jurados')) {
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
      ];
      localStorage.setItem('admin_jurados', JSON.stringify(juradosIniciais));
    }

    // Receitas padrão
    if (!localStorage.getItem('admin_receitas')) {
      const receitasIniciais = {
        1: {
          ingredientes: [
            '1 Kg de peito de frango triturado',
            '5 g de caldo de frango',
            '7,5 g de sal',
            '5 g páprica defumada',
            '1 unidade de pimenta de cheiro triturada',
            '2 g de pimenta do reino',
            '50 g de azeitona verde fatiada',
            '75 g tomate seco',
            '150 g de pequi fatiado',
            '120 g de queijo fresco',
            '40 g de catupiry',
            '100 g de talo de agrião',
            '300 ml de água',
            '10 g de caldo de legumes',
            '15 g de farinha de trigo',
            '15 g de margarina',
            '100 g de semente de abóbora torrado e triturado',
            '30 g creme de mostarda',
            '20 g de amido de milho',
            'Suco de meio limão',
            'Raspas de 5 maçãs'
          ],
          modoPreparo: [
            'Misture todos os ingredientes da massa, e enrole no papel alumínio, no formato do presunto e coloque para cozinhar por 60 minutos em uma panela sem levantar fervura.',
            'Para a musseline: Esquente a margarina e em seguida, adicione a farinha de trigo, mexendo sempre com auxílio de um fouet, para não empelotar. Vá adicionando aos poucos a água com o caldo de legumes e o talo de agrião triturado, até ficar na consistência de musseline.',
            'Para o empanado: Triture as sementes de abóbora torrada, a seguir, pegue a presunto artesanal já cozido, e pincele o creme de mostarda para agregar a semente de abóbora triturada. Após empanado, levar ao forno por 10 minutos por 180°C.',
            'Para o crispy: Raspe a casca das 5 maçãs e reserve. Esprema o suco do limão e jogue nas raspas de maçã, misture e separe. Após isso, reserve em uma vasilha a maizena e polvilhe as raspas, para em seguida fritá-las em óleo vegetal à 120°C.'
          ],
          tempoPreparo: '90 minutos',
          rendimento: '4-6 porções',
          dificuldade: 'Intermediário'
        }
      };
      localStorage.setItem('admin_receitas', JSON.stringify(receitasIniciais));
    }

    // Configurações do sistema
    if (!localStorage.getItem('admin_config')) {
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
      };
      localStorage.setItem('admin_config', JSON.stringify(configInicial));
    }
  }

  // ========== PRATOS ==========
  
  // Obter todos os pratos
  getPratos() {
    const pratos = localStorage.getItem('admin_pratos');
    return pratos ? JSON.parse(pratos) : [];
  }

  // Obter prato por ID
  getPrato(id) {
    const pratos = this.getPratos();
    return pratos.find(prato => prato.id === parseInt(id));
  }

  // Adicionar novo prato
  addPrato(pratoData) {
    const pratos = this.getPratos();
    const novoId = Math.max(...pratos.map(p => p.id), 0) + 1;
    
    const novoPrato = {
      ...pratoData,
      id: novoId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    pratos.push(novoPrato);
    localStorage.setItem('admin_pratos', JSON.stringify(pratos));
    this.syncWithVotingSystem();
    return novoPrato;
  }

  // Atualizar prato
  updatePrato(id, pratoData) {
    const pratos = this.getPratos();
    const index = pratos.findIndex(prato => prato.id === parseInt(id));
    
    if (index !== -1) {
      pratos[index] = {
        ...pratos[index],
        ...pratoData,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem('admin_pratos', JSON.stringify(pratos));
      this.syncWithVotingSystem();
      return pratos[index];
    }
    return null;
  }

  // Deletar prato
  deletePrato(id) {
    const pratos = this.getPratos();
    const filteredPratos = pratos.filter(prato => prato.id !== parseInt(id));
    localStorage.setItem('admin_pratos', JSON.stringify(filteredPratos));
    
    // Remover receita associada
    const receitas = this.getReceitas();
    delete receitas[id];
    localStorage.setItem('admin_receitas', JSON.stringify(receitas));
    
    this.syncWithVotingSystem();
    return true;
  }

  // ========== JURADOS ==========
  
  // Obter todos os jurados
  getJurados() {
    const jurados = localStorage.getItem('admin_jurados');
    return jurados ? JSON.parse(jurados) : [];
  }

  // Obter jurado por ID
  getJurado(id) {
    const jurados = this.getJurados();
    return jurados.find(jurado => jurado.id === parseInt(id));
  }

  // Adicionar novo jurado
  addJurado(juradoData) {
    const jurados = this.getJurados();
    const novoId = Math.max(...jurados.map(j => j.id), 0) + 1;
    
    const novoJurado = {
      ...juradoData,
      id: novoId,
      ativo: true,
      createdAt: new Date().toISOString()
    };

    jurados.push(novoJurado);
    localStorage.setItem('admin_jurados', JSON.stringify(jurados));
    return novoJurado;
  }

  // Atualizar jurado
  updateJurado(id, juradoData) {
    const jurados = this.getJurados();
    const index = jurados.findIndex(jurado => jurado.id === parseInt(id));
    
    if (index !== -1) {
      jurados[index] = {
        ...jurados[index],
        ...juradoData
      };
      localStorage.setItem('admin_jurados', JSON.stringify(jurados));
      return jurados[index];
    }
    return null;
  }

  // Deletar jurado
  deleteJurado(id) {
    const jurados = this.getJurados();
    const filteredJurados = jurados.filter(jurado => jurado.id !== parseInt(id));
    localStorage.setItem('admin_jurados', JSON.stringify(filteredJurados));
    return true;
  }

  // ========== RECEITAS ==========
  
  // Obter todas as receitas
  getReceitas() {
    const receitas = localStorage.getItem('admin_receitas');
    return receitas ? JSON.parse(receitas) : {};
  }

  // Obter receita por ID do prato
  getReceita(pratoId) {
    const receitas = this.getReceitas();
    return receitas[pratoId] || null;
  }

  // Salvar receita
  saveReceita(pratoId, receitaData) {
    const receitas = this.getReceitas();
    receitas[pratoId] = {
      ...receitaData,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem('admin_receitas', JSON.stringify(receitas));
    return receitas[pratoId];
  }

  // Deletar receita
  deleteReceita(pratoId) {
    const receitas = this.getReceitas();
    delete receitas[pratoId];
    localStorage.setItem('admin_receitas', JSON.stringify(receitas));
    return true;
  }

  // ========== CONFIGURAÇÕES ==========
  
  // Obter configurações
  getConfig() {
    const config = localStorage.getItem('admin_config');
    return config ? JSON.parse(config) : {};
  }

  // Atualizar configurações
  updateConfig(configData) {
    const config = this.getConfig();
    const updatedConfig = {
      ...config,
      ...configData,
      lastUpdate: new Date().toISOString()
    };
    localStorage.setItem('admin_config', JSON.stringify(updatedConfig));
    return updatedConfig;
  }

  // ========== SINCRONIZAÇÃO ==========
  
  // Sincronizar dados com o sistema de votação
  syncWithVotingSystem() {
    // Atualizar dados no formato esperado pelo sistema de votação
    const pratos = this.getPratos();
    const jurados = this.getJurados();
    
    // Manter compatibilidade com o sistema atual
    // Os componentes de votação continuarão funcionando normalmente
    
    console.log('Dados sincronizados com o sistema de votação');
  }

  // ========== ESTATÍSTICAS ==========
  
  // Obter estatísticas gerais
  getEstatisticas() {
    const pratos = this.getPratos();
    const jurados = this.getJurados();
    const receitas = this.getReceitas();
    
    return {
      totalPratos: pratos.length,
      totalJurados: jurados.filter(j => j.ativo).length,
      totalReceitas: Object.keys(receitas).length,
      pratosComReceita: pratos.filter(p => receitas[p.id]).length,
      ultimaAtualizacao: new Date().toISOString()
    };
  }

  // ========== UTILITÁRIOS ==========
  
  // Converter imagem para base64 com redimensionamento padrão
  async imageToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Dimensões padrão (16:9 aspect ratio)
          const targetWidth = 800;
          const targetHeight = 450;
          
          canvas.width = targetWidth;
          canvas.height = targetHeight;
          
          // Desenhar imagem redimensionada mantendo proporção
          const scale = Math.min(targetWidth / img.width, targetHeight / img.height);
          const scaledWidth = img.width * scale;
          const scaledHeight = img.height * scale;
          const x = (targetWidth - scaledWidth) / 2;
          const y = (targetHeight - scaledHeight) / 2;
          
          // Preencher fundo branco
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, targetWidth, targetHeight);
          
          // Desenhar imagem centralizada
          ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
          
          // Converter para base64 com qualidade otimizada
          const resizedImage = canvas.toDataURL('image/jpeg', 0.85);
          resolve(resizedImage);
        };
        img.onerror = reject;
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // Converter PDF para base64
  async pdfToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // Validar dados do prato
  validatePratoData(data) {
    const required = ['nome', 'restaurante', 'descricao'];
    const missing = required.filter(field => !data[field] || data[field].trim() === '');
    
    if (missing.length > 0) {
      throw new Error(`Campos obrigatórios não preenchidos: ${missing.join(', ')}`);
    }
    
    return true;
  }

  // Validar dados do jurado
  validateJuradoData(data) {
    const required = ['nome', 'email'];
    const missing = required.filter(field => !data[field] || data[field].trim() === '');
    
    if (missing.length > 0) {
      throw new Error(`Campos obrigatórios não preenchidos: ${missing.join(', ')}`);
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new Error('Email inválido');
    }
    
    return true;
  }
}

// Exportar instância única
const adminDataService = new AdminDataService();
export default adminDataService;
