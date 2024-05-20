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

# Etapa 2: Servindo a aplicação com Express
FROM node:18-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos construídos da etapa anterior
COPY --from=builder /app/build /app

# Expoe a porta 5173
EXPOSE 5173

# Comando para rodar a aplicação com Express
CMD ["npm", "run", "dev"]
