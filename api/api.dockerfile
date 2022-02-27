FROM node:16

WORKDIR /api

COPY ./menufamille/package*.json ./

RUN npm install

COPY ./menufamille .

CMD [ "node", "server.js" ]

