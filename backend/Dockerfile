# Define a imagem base
FROM node:18-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia o arquivo package.json para o diretório de trabalho
COPY package.json .

# Instala as dependências
RUN npm install

# Copia todos os outros arquivos para o diretório de trabalho
COPY . .

# Exponha a porta do servidor backend
EXPOSE 3000

# Comando para iniciar o servidor backend
CMD ["npm", "run", "dev"]