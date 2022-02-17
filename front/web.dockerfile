FROM node:16.13.0

ENV CONTAINER_PATH /app

WORKDIR $CONTAINER_PATH

COPY ./menufamille .

RUN npm install

CMD ["npm", "run", "serve"]
