FROM node:latest

WORKDIR /app
COPY ./menufamille /app 

RUN npm run serve
	
