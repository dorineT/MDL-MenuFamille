FROM node:latest


COPY ./menufamille api

WORKDIR /api

RUN node server.js

