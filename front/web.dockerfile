FROM node:16.13.0

ENV CONTAINER_PATH /app

WORKDIR $CONTAINER_PATH

COPY ./menufamille .

RUN npm install
RUN chown -R node:node /app/node_modules

CMD ["npm", "run", "serve"]
