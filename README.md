# 🍽️ O Quilo é Nosso 2025 - Sistema de Votação

Sistema completo de votação para a competição gastronômica **O Quilo é Nosso 2025** com interface de usuário moderna e painel administrativo integrado.

## ✨ Características

### 🗳️ **Interface de Votação**
- **Identificação do Jurado**: Sistema de login simples
- **Seleção de Pratos**: Visualização com imagens padronizadas
- **Avaliação Completa**: 5 critérios com sistema de estrelas
- **Ranking em Tempo Real**: Resultados atualizados instantaneamente

### 🎛️ **Painel Administrativo**
- **Dashboard**: Visão geral do sistema
- **Gerenciamento de Pratos**: CRUD completo com upload de imagens
- **Gerenciamento de Jurados**: Controle de participantes
- **Receitas**: Upload e gerenciamento de PDFs
- **Ranking**: Visualização detalhada dos resultados

## 🚀 Tecnologias

- **React 18** + **Vite**
- **Tailwind CSS** + **shadcn/ui**
- **React Router** para navegação
- **Socket.io** para sincronização em tempo real
- **Responsive Design** para todos os dispositivos

## 🎨 Design

Interface baseada no site oficial **oquiloenosso.com.br** com:
- Paleta de cores laranja/verde
- Gradientes profissionais
- Componentes modernos e acessíveis

## 🔧 Instalação

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 📱 Funcionalidades

### **Critérios de Avaliação**
1. **Limpeza** (Peso: 1x)
2. **Ambiente** (Peso: 1x) 
3. **Atendimento** (Peso: 1x)
4. **Qualidade Geral** (Peso: 1x)
5. **Receita Participante** (Peso: 1x)

### **Sincronização em Tempo Real**
- Alterações no painel admin refletem instantaneamente na interface de votação
- Suporte a múltiplos jurados simultâneos
- Fallback para localStorage quando offline

## 🔐 Acesso Administrativo

- **URL**: `/admin`
- **Senha**: `admin2025`

## 📊 Deploy

Sistema preparado para deploy no **Vercel** com configuração otimizada para SPAs.

---

**Desenvolvido para a competição gastronômica O Quilo é Nosso 2025**
