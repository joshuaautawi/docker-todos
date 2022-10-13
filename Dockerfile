
FROM node:14.15.4-stretch-slim

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

EXPOSE 3000

CMD ["npm","run","dev"]

