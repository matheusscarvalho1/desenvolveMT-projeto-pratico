# 🚀 DesenvolveMT – Projeto Prático Front-End

## 📋 Dados do Candidato

Nome: Matheus de Souza Carvalho

Email: matheusdocarvalho@gmail.com

Telefone: +55 65 99207-9383

Aplicação: Avaliação Profissional – Desenvolvedor Júnior

# 🚀 Como Rodar o Projeto

Você pode executar a aplicação localmente para desenvolvimento ou via Docker para produção. Além disso, é possível rodar todos os testes com Vitest.

### 1️⃣ Localmente (Desenvolvimento)

#### Clonar repositório

`git clone https://github.com/matheusscarvalho1/desenvolveMT-projeto-pratico.git`
`cd desenvolveMT-projeto-pratico`

# Instalar dependências

`npm install `

# Iniciar servidor de desenvolvimento

`npm run dev`

Acesse: http://localhost:5173

Hot reload automático para alterações instantâneas.

2️⃣ Build e Preview de Produção

# Build otimizado (TypeScript + Vite)

`npm run build`

# Visualizar build de produção - Executa utilizando os arquivos do build da aplicação

`npm run preview`

Preview roda por padrão em http://localhost:4173
(ou porta definida pelo Vite).

3️⃣ Docker (Produção)

# Construir imagem Docker

docker build -t desenvolve-mt-app .

# Rodar container

docker run -p 3000:3000 desenvolve-mt-app

Acesse: http://localhost:3000

Para rodar em background:

docker run -d -p 3000:3000 --name app-prod desenvolve-mt-app

Comandos úteis:

docker stop app-prod # Parar container
docker images # Listar imagens

4️⃣ Testes

# Executar todos os testes

`npm run test`

Testes implementados com Vitest e React Testing Library.`

- Os testes foram feitos nos componentes principais para o funncionamento da aplicação, então a aplicação não esta coberta 100% de testes

🎯 Funcionalidades

- Lista de pessoas desaparecidas ou localizadas com cards

- Paginação mínima de 10 registros por página

- Busca em tempo real por parâmetros da API

- Layout responsivo (mobile, tablet e desktop)

- Detalhamento do Registro

- Página de detalhes ao clicar em um card

- Exibição completa das informações

- Destaque visual do status: Desaparecida ou Localizada

- Envio de Informações

- Formulário modal para registrar novas informações

- Date picker e campos de entrada validados com Zod

- Upload de fotos e indicação de localização através do campo 'informação' do formulário

# 💡 Implementações Técnicas

### React + TypeScript

### Vite como bundler (SPA, build rápido e hot reload)

### React Router v7 com Lazy Loading

### Tailwind CSS para UI responsiva

### Axios para consumo da API

### Componentes reutilizáveis shadcn/ui

### Tratamento de erros (404 e falhas de requisição)

🤔 Por que Vite ao invés de Next.js?

Projeto é SPA pura, sem necessidade de SSR

Vite oferece build rápido, hot reload instantâneo e configuração mínima

Next.js adicionaria complexidade desnecessária, apesar de eu também ter conhecimento com next evidenciados em outros projetos meus no github

📁 Estrutura do Projeto
src/
├─ assets/ # Imagens e ícones
├─ components/ # Componentes reutilizáveis (common e ui)
├─ interface/ # Tipagem do TypeScript
├─ lib/ # Configurações de bibliotecas e de requisição de dados (funções reutilizáveis e configuração do axios)
├─ pages/ # Home, Details, Error
├─ tests/ # Testes principais da aplicação
├─ App.tsx # Componente principal (Arvore da aplicação)
├─ index.css # Configuração de estilização (Tailwind)
├─ main.tsx # Ponto de entrada
├─ setupTests.ts # Configuração do jest para testes do react-testing-library
├─ .prettierrc # Configuração do plugin do tailwind para organizar classes (Somente para melhor experiência de densenvolvimento)
├─ components.json # Configuração nativa ao instalar o shadcn/ui
├─ Dockerfile # Configuração Docker
├─ eslint.config.js # Configuração do ESLint
├─ package.json # Dependências e scripts
├─ tsconfig.json # Configuração TypeScript
└─ vite.config.ts # Configuração Vite

🔧 Scripts Disponíveis
npm run dev # Servidor dev com hot reload
npm run build # Build otimizado (TypeScript + Vite)
npm run preview # Preview da build de produção
npm run lint # Verifica problemas de lint
npm run test # Executa todos os testes
