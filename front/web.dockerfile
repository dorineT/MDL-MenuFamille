FROM node:latest

WORKDIR /app
COPY ./menufamille /app 

RUN npm install
RUN npm run build
	
