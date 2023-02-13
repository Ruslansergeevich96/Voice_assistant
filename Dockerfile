FROM node:latest

WORKDIR /Crypto_project

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3500

CMD [ "npm", "start" ]