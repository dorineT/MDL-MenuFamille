FROM node:latest


COPY ./menufamille api

WORKDIR /api

CMD [ "node", "server.js" ]

