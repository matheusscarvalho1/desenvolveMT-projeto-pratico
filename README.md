# 🚀 DesenvolveMT - Projeto Prático

## 📋 Dados de Inscrição

**Aplicação:** Chamada avaliação Profissional – Desenvolvedor Júnior e Pleno - Desenvolve MT
**Participante:** [Matheus de Souza Carvalho]  
**Email:** [matheusdocarvalho@gmail.com]  
**Telefone para contato:** 65 992079383

---

## 🎯 Sobre o Projeto

Este é um projeto React + TypeScript + Vite que implementa um sistema de gerenciamento de pessoas com funcionalidades de listagem, busca e visualização de detalhes. O projeto está configurado com Docker para facilitar o deploy e execução em qualquer ambiente.

### ✨ Funcionalidades

- 📱 **Interface Responsiva** com Tailwind CSS
- 🔍 **Sistema de Busca** em tempo real
- 📋 **Listagem de Pessoas** com paginação
- 👤 **Visualização de Detalhes** individuais
- 🎨 **Design Moderno** com componentes reutilizáveis
- 🐳 **Containerização** com Docker

---

## ✅ **Itens Atendidos do Projeto Prático**

### 🎯 **Requisitos Gerais Implementados:**

- ✅ **Rotas com Lazy Loading** - Implementado com `React.lazy()` e `Suspense` para otimizar carregamento
- ✅ **Design limpo e responsivo** - Interface intuitiva com Tailwind CSS cobrindo todos os tamanhos de tela
- ✅ **Containerização Docker** - Aplicação empacotada com todas as dependências
- ✅ **Tratamento de erros** - Páginas de erro personalizadas para diferentes tipos de falhas

### 🔧 **Requisitos Específicos Atendidos:**

#### **1. Tela Inicial:**

- ✅ **Cards com foto e dados** - Exibição visual com status "Desaparecida" ou "Localizada"
- ✅ **Paginação** - Implementada com 10 registros por página
- ✅ **Campo de busca** - Filtro em tempo real por nome e outros parâmetros

#### **2. Detalhamento do Registro:**

- ✅ **Navegação para detalhes** - Implementado com React Router v7
- ✅ **Destaque visual do status** - Badges coloridos para diferenciar situações
- ✅ **Informações completas** - Layout organizado com todos os dados disponíveis

#### **3. Envio de Informações:**

- ✅ **Botão para registrar informações** - Formulário modal na página de detalhes
- ✅ **Máscaras de entrada** - Date picker para datas (sem máscaras manuais para melhor UX)
- ✅ **Localização e fotos** - Campos para coordenadas e upload de imagens

### 🚀 **Implementações Técnicas:**

- **React Router v7** - Roteamento moderno com lazy loading nativo
- **Lazy Loading** - Carregamento sob demanda das páginas (Home, Details, Error)
- **Componentes Reutilizáveis** - UI components organizados em pasta `components/ui/`
- **TypeScript** - Tipagem estática para melhor qualidade de código
- **Tailwind CSS** - Framework CSS utilitário para design responsivo
- **Tratamento de Erros** - Páginas específicas para 404 e erro interno
- **Docker** - Containerização completa com nginx para produção

### 💡 **Decisões de Design:**

- **Date Picker ao invés de máscaras** - Melhor UX em dispositivos móveis
- **Modal para formulário** - Não interrompe o fluxo de navegação
- **Badges coloridos** - Identificação visual rápida do status
- **Layout responsivo** - Funciona perfeitamente em mobile, tablet e desktop

---

## 🛠️ Tecnologias Utilizadas

### Frontend

- **React 19** - Biblioteca para interfaces de usuário
- **TypeScript** - Superset JavaScript com tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utilitário
- **React Router** - Roteamento da aplicação
- **Axios** - Cliente HTTP para APIs

### Ferramentas de Desenvolvimento

- **ESLint** - Linter para qualidade de código
- **Prettier** - Formatador de código
- **Vitest** - Framework de testes
- **Docker** - Containerização da aplicação

---

## 🤔 Por que Vite ao invés de Next.js?

### 🎯 **Este é um projeto SPA (Single Page Application)**

**SPA** significa que toda a aplicação roda no navegador do cliente, sem necessidade de renderização no servidor. O Next.js seria uma escolha desnecessária e até contraproducente para este caso.

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** (gerenciador de pacotes)
- **Docker** (para execução em container)
- **Git** (controle de versão)

### 🔍 Verificar Instalações

```bash
# Verificar versões
node --version
npm --version
docker --version
git --version
```

---

## 🚀 Instalação e Execução

### Opção 1: Execução Local (Recomendado para Desenvolvimento)

#### 1. Clone o repositório

```bash
git clone [URL_DO_REPOSITORIO]
cd desenvolveMT-projeto-pratico
```

#### 2. Instale as dependências

```bash
npm install
```

#### 3. Execute o projeto

```bash
# Modo desenvolvimento (com hot-reload)
npm run dev

# Modo produção (build otimizado)
npm run build
npm run preview
```

#### 4. Acesse a aplicação

- **Desenvolvimento:** http://localhost:5173

---

## 💻 **Como Rodar Localmente - Passo a Passo**

### 🔧 **Pré-requisitos na sua máquina:**

#### **1. Node.js e npm**

```bash
# Verificar se já tem instalado
node --version  # Deve ser 18+
npm --version   # Deve ser 9+

# Se não tiver, baixe em: https://nodejs.org/
# Escolha a versão LTS (Long Term Support)
```

### 🚀 **Passos para executar:**

#### **Passo 1: Baixar o projeto**

```bash
# Opção A: Clone via Git (recomendado)
git clone [URL_DO_REPOSITORIO]
cd desenvolveMT-projeto-pratico

# Opção B: Download direto
# Baixe o ZIP do GitHub e extraia na pasta desejada
cd desenvolveMT-projeto-pratico
```

#### **Passo 2: Instalar dependências**

```bash
# Na pasta do projeto
npm install

# Aguarde a instalação (pode demorar alguns minutos na primeira vez)
# Você verá uma pasta node_modules sendo criada
```

#### **Passo 3: Executar em desenvolvimento**

```bash
npm run dev
```

**O que vai acontecer:**

- Vite vai iniciar o servidor de desenvolvimento
- Você verá algo como: `Local: http://localhost:5173/`
- O navegador pode abrir automaticamente
- Qualquer mudança no código recarrega automaticamente

#### **Passo 4: Acessar no navegador**

- Abra: **http://localhost:5173**
- A aplicação deve carregar com a tela inicial

### 📱 **Testando responsividade:**

1. **No navegador, pressione F12** (DevTools)
2. **Clique no ícone de dispositivo móvel** (Toggle device toolbar)
3. **Teste diferentes tamanhos:**
   - Mobile: 375px
   - Tablet: 768px
   - Desktop: 1024px+

### 🎯 **Funcionalidades para testar:**

#### **Tela Inicial:**

- ✅ Lista de pessoas com fotos
- ✅ Paginação (botões de navegação)
- ✅ Campo de busca (digite um nome)
- ✅ Cards clicáveis

#### **Página de Detalhes:**

- ✅ Clique em um card
- ✅ Veja informações completas
- ✅ Badge de status (Desaparecida/Localizada)
- ✅ Botão "Registrar Informações"

#### **Formulário:**

- ✅ Modal abre ao clicar no botão
- ✅ Campos de entrada funcionam
- ✅ Date picker para datas
- ✅ Upload de fotos

### Opção 2: Execução com Docker (Recomendado para Produção)

#### 1. Construir a imagem Docker

```bash
docker build -t desenvolve-mt-app .
```

#### 2. Executar o container

```bash
docker run -p 3000:3000 desenvolve-mt-app
```

#### 3. Acessar a aplicação

- **Docker:** http://localhost:3000

---

## 🧪 Executando Testes

### Executar todos os testes

```bash
npm test
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Gera build de produção
npm run preview      # Visualiza build de produção

# Qualidade de Código
npm run lint         # Executa verificação de lint
npm run lint:fix     # Corrige problemas de lint automaticamente

# Testes
npm run test             # Executa todos os testes

```

---

## 🐳 Docker

### Arquivos Docker

- **`dockerfile`** - Configuração para criar imagem da aplicação
- **`.dockerignore`** - Arquivos que não devem ser incluídos na imagem

### Comandos Docker Básicos

```bash
# Construir imagem
docker build -t desenvolve-mt-app .

# Executar container
docker run -p 3000:3000 desenvolve-mt-app

# Executar em background
docker run -d -p 3000:3000 --name app-container desenvolve-mt-app


# Ver imagens
docker images
```

---

## 📁 Estrutura do Projeto

```
desenvolveMT-projeto-pratico/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   └── ui/             # Componentes de interface da biblioteca shadcn/ui
│   ├── pages/              # Páginas da aplicação
│   │   ├── Home/           # Página inicial
│   │   ├── Details/        # Página de detalhes
│   │   └── Error/          # Páginas de erro
│   ├── lib/                # Utilitários e configurações
│   ├── interface/          # Definições de tipos TypeScript
│   ├── assets/             # Recursos estáticos
│   ├── App.tsx             # Componente principal
│   └── main.tsx            # Ponto de entrada
├── public/                 # Arquivos públicos
├── dist/                   # Build de produção (gerado)
├── dockerfile              # Configuração Docker
├── .dockerignore           # Arquivos ignorados pelo Docker
├── package.json            # Dependências e scripts
├── tsconfig.json           # Configuração TypeScript
├── vite.config.ts          # Configuração Vite
└── README.md               # Este arquivo
```

---

## 🎨 Padrões de Código

### ESLint

O projeto utiliza ESLint com regras personalizadas para manter a qualidade do código:

```bash
# Verificar problemas
npm run lint

# Corrigir automaticamente
npm run lint:fix
```

### Prettier

Formatação automática de código com regras para Tailwind CSS:

```bash
# Formatar código
npx prettier --write .
```

### Organização de Imports

- **Imports de terceiros** (bibliotecas externas)
- **Imports internos** (arquivos do próprio projeto)
- **Imports relativos** (arquivos locais)

---

## 🔍 Funcionalidades da Aplicação

### Página Inicial (Home)

- Listagem de pessoas com paginação
- Sistema de busca em tempo real
- Cards responsivos com informações básicas
- Navegação para detalhes

### Página de Detalhes

- Informações completas da pessoa selecionada
- Layout responsivo e acessível
- Navegação de volta para a lista

## 🚀 Deploy

### Deploy Local com Docker

```bash
# 1. Construir imagem
docker build -t desenvolve-mt-app .

# 2. Executar container
docker run -d -p 3000:3000 --name app-prod desenvolve-mt-app

# 3. Acessar aplicação
# http://localhost:3000
```

## 📚 Recursos Adicionais

### Documentação

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Docker Documentation](https://docs.docker.com/)

### Extensões VS Code Recomendadas

- **Prettier - Code formatter**
- **ESLint**
- **Tailwind CSS IntelliSense**
- **TypeScript Importer**

---

## 📞 Suporte

Para dúvidas ou problemas:

- **Email:** [matheusdocarvalho@gmail.com]

---
