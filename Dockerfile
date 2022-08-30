FROM node:15

# diretório criado no container
WORKDIR /app3

# copia todos os arquivos para o container
COPY . . 

RUN npm i 
#só executa quando rodarmos a imagem
