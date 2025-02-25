# Estágio de build
FROM node:20-alpine

# Definindo o diretório de trabalho
WORKDIR /app

# Copiando os arquivos de dependências
COPY package.json package-lock.json ./

# Instalando dependências
RUN npm ci

# Copiando o resto dos arquivos do projeto
COPY . .

# Gerando build de produção
RUN npm run build

# Verificando se a pasta dist foi criada e tem arquivos
RUN ls -la dist && test -f dist/index.html

# Instalando serve para disponibilizar os arquivos estáticos
RUN npm install -g serve

# Expondo a porta (pode ser alterada conforme necessidade)
EXPOSE 5179

# Comando para servir os arquivos estáticos
CMD ["serve", "-s", "dist", "-l", "5179", "--cors"]