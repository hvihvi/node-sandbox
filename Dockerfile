FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/koober-api

COPY package.json ./package.json

COPY index.js ./index.js

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "start" ]