FROM node:19.2-alpine3.16
# /app ya viene con app
WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
