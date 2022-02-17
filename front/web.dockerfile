FROM node:latest

ENV CONTAINER_PATH /app

WORKDIR $CONTAINER_PATH

RUN npm install

COPY ./menufamille .

CMD ["npm", "run", "serve"]
