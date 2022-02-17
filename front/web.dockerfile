FROM node:latest

ENV CONTAINER_PATH /app

WORKDIR $CONTAINER_PATH

COPY ./menufamille .

RUN npm install

CMD ["npm", "run", "serve"]
