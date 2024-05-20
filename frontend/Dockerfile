# Etapa 1: Construção da aplicação
FROM node:18-alpine AS builder

# Define o diretório de trabalho
WORKDIR /app

# Copia o arquivo de dependências
COPY package.json .

# Instala as dependências
RUN npm install

# Copia os demais arquivos para o diretório de trabalho
COPY . .

# Executa o build da aplicação
RUN npm run build

# Serve a aplicação
FROM node:18-alpine

# Instala uma ferramenta simples para servir conteúdo estático
RUN npm install -g serve

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos construídos da etapa anterior
COPY --from=builder /app/build /app

# Expoe a porta 5432
EXPOSE 5173

# Comando para rodar a aplicação usando "serve"
CMD ["serve", "-s", "."]