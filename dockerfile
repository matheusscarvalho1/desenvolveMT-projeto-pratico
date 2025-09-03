# ===========================================
# DOCKERFILE SIMPLES PARA APLICAÇÃO REACT
# ===========================================
# Este arquivo cria um container Docker com sua aplicação
# É como "empacotar" tudo em uma caixa que roda em qualquer lugar

# Usa uma imagem do Node.js (versão 22) com Alpine Linux
# Alpine é uma versão leve do Linux (só 5MB)
FROM node:22-alpine

# Define qual pasta será usada dentro do container
# É como fazer "cd /app" no terminal
WORKDIR /app

# Copia os arquivos de dependências primeiro
# Isso ajuda o Docker a reutilizar o cache quando possível
COPY package*.json ./

# Instala todas as dependências do projeto
# npm ci é mais rápido e instala exatamente as versões corretas
RUN npm ci

# Copia todo o resto do código fonte
COPY . ./

# Executa o build da aplicação
# Isso cria os arquivos otimizados na pasta /dist
RUN npm run build

# Instala um servidor web simples para servir os arquivos
# serve é um servidor web básico que serve arquivos estáticos
RUN npm install -g serve

# Informa que o container usa a porta 3000
EXPOSE 3000

# Comando que será executado quando o container iniciar
# serve -s dist -l 3000 significa:
#   -s dist: serve os arquivos da pasta dist
#   -l 3000: escuta na porta 3000
CMD ["serve", "-s", "dist", "-l", "3000"]

# ===========================================
# COMO USAR (COMANDOS BÁSICOS):
# ===========================================
# 1. Construir a imagem: docker build -t minha-app .
# 2. Rodar o container: docker run -p 3000:3000 minha-app
# 3. Acessar no navegador: http://localhost:3000
#
# Para parar: Ctrl+C ou docker stop [nome-do-container]
# Para rodar em background: docker run -d -p 3000:3000 minha-app


