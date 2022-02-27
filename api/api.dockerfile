FROM node:latest


COPY ./menufamille api

WORKDIR /api

RUN npm install

CMD [ "node", "server.js" ]

