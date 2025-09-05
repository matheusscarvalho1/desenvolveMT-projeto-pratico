# 🚀 Desenvolve MT – Projeto Prático Front-End

## 📋 Dados do Candidato

Nome Completo: Matheus de Souza Carvalho

E-mail: matheusdocarvalho@gmail.com

Telefone para contato: +55 65 99207-9383

Aplicação: Avaliação Profissional – Desenvolvedor Júnior

## 🚀 Como Rodar o Projeto

Você pode executar a aplicação localmente para desenvolvimento ou via Docker para produção. Além disso, é possível rodar todos os testes com Vitest.

### 1️⃣ Localmente (Desenvolvimento)

#### Clone o repositório

```
git clone https://github.com/matheusscarvalho1/desenvolveMT-projeto-pratico.git
```

#### Acesse o projeto

```
cd desenvolveMT-projeto-pratico
```

#### Instalar dependências

```
npm install
```

#### Iniciar servidor de desenvolvimento

```
npm run dev
```

#### Pronto, basta acessar http://localhost:5173

<hr>

### 2️⃣ Build e Preview de Produção

### Build otimizado (TypeScript + Vite)

```
npm run build
```

### Visualizar build de produção - Executa utilizando os arquivos do build da aplicação

```
npm run preview
```

#### Preview roda por padrão em http://localhost:4173

<hr>

### 3️⃣ Testes

### Executar todos os testes

```
npm run test
```

Testes implementados com Vitest e React Testing Library.`

- Os testes foram feitos nos componentes principais para o funcionamento da aplicação, então a aplicação não esta coberta 100% de testes.

<hr>

### 4️⃣ Docker (Produção)

### Construir imagem Docker

```bash
docker build -t projeto-desenvolve-mt-app-by-matheus-carvalho .
```

### Rodar container

```bash
docker run -p 3000:3000 projeto-desenvolve-mt-app-by-matheus-carvalho
```

##### Dando tudo certo basta acessar: http://localhost:3000

#### Comandos úteis:

```bash
# Para listar imagens para saber se ocorreu tudo certo o build da imagem e a execução do container
docker images 

```
<hr>

### ⚙️ Observações Técnicas e Decisões de Implementação

### Por que optei pelo Vite?

- O principal motivo da escolha do Vite foi o alinhamento com o objetivo do projeto prático, que é desenvolver uma Single Page Application (SPA) em JavaScript (ou TypeScript), ele proporciona um ambiente de desenvolvimento moderno e ágil, com inicialização rápida, hot reload eficiente e build otimizado para produção, o que torna a criação de uma SPA mais simples, performática e aderente ao que o projeto propõe.
  
### Sobre a sugestão de utilizar máscaras no formulário

- Vi que no projeto prático solicita a aplicação de máscaras em campos como datas ou telefones.

No formulário, para o campo 'data do ocorrido' da API de 'informações do desaparecido', utilizei um Date Picker, que:

- Garante que a data selecionada esteja sempre no formato correto para a API;

- Evita erros de digitação, melhorando a experiência do usuário;

- Substitui a necessidade de digitar cada dígito ou usar uma máscara manual.

- Todos os campos são validados com Zod, garantindo que os dados enviados estejam corretos, mesmo sem máscaras adicionais.

- Essa abordagem cumpre o requisito do projeto, mantendo usabilidade e confiabilidade no envio das informações.
- Máscaras no campo são muito bem vindas, e são essenciais pra garantir que usuário forneça os dados como a gente (desenvolvedores) deseja receber, só optei por essa forma com data picker por mais questão de gosto.

### Tratamento de erros da API
  
- 404 – Not Found: página exibida para rotas inexistentes.

- 500 – Internal Server Error: página exibida em caso de falha no servidor.

- Função handleError captura erros de requisição e exibe mensagens amigáveis via toast.

### Upload de arquivos

- Durante os testes com a API, percebi que anexar arquivos grandes podem gerar erro 500 da API.

- Para reduzir essa chance, o envio é limitado a **no máximo 2 arquivos por formulário**.

- A aplicação está 100% funcional, apenas com essa limitação para melhorar a experiência do usuário evitando o erro.
  
- Tipos de arquivos aceitos: imagens (JPEG, PNG) e documentos (.pdf, .doc, .docx).

- Caso ocorra erro por tamanho ou formato inválido, o usuário recebe uma mensagem clara via toast:  
  *"Verifique se os arquivos não são muito grandes ou estão em formato inválido."*

 


<hr>

### 🎯 Funcionalidades

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

- Date picker e campos validados com Zod: optei por não usar máscaras neste campo, pois o componente já garante o formato correto, tornando a experiência mais intuitiva, embora seja totalmente possível aplicá-las.

- Upload de fotos e indicação de localização através do campo 'informação' do formulário

<hr>

### 💡 Implementações Técnicas

- <strong>`React + TypeScript` - </strong> Base da aplicação com tipagem estática e componentes reutilizáveis.

- <strong>`Vite` - </strong> Bundler moderno, com build rápido e hot reload para desenvolvimento.

- <strong>`React Router v7` - </strong> Navegação da SPA com Lazy Loading nas rotas, fallback de carregamento com <Loading /> e tratamento de rotas inexistentes com <NotFound />.

- <strong>`Tailwind CSS` - </strong> Framework utilitário para UI responsiva.

- <strong>`shadcn/ui + Lucide React Icons` - </strong> Componentes prontos e customizáveis com ícones leves e compatíveis nativamente.

- <strong>`React Hook Form` - </strong> Gerenciamento de formulários e integração com validação de dados.

- <strong>`Zod` - </strong> Validação de schemas de dados (Usado para validadar dados dos formulários), usado junto com React Hook Form.

- <strong>`Axios` - </strong> Consumo de APIs e tratamento de requisições HTTP.
  
- <strong>`Sonner` - </strong> Notificações e toasts para feedback do usuário.

- <strong>`Componentes reutilizáveis` - </strong> Combinação de componentes .tsx e shadcn/ui.

- <strong>`Tratamento de erros` - </strong> Páginas de 404 e mensagens para falhas de requisição.

- <strong>`Testes` - </strong> Vitest + Testing Library para testes unitários e de interação do usuário.

<hr>

## 📁 Estrutura do Projeto

```bash
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
```

## 🔧 Scripts Disponíveis

#### Iniciar servidor de desenvolvimento

```bash
npm run dev

```

#### Build

```bash
npm run build
```

#### Preview da build de produção

```bash
npm run preview
```

#### Verifica problemas de lint

```bash
npm run lint
```

#### Executa todos os testes

```bash
npm run test
```
