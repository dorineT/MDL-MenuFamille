## Menu-Famille
Projet réalisé dans un carde pédagogique de l'université de Namur

Gestion des menus d'une famille par différents rôle (enfant - parent)

- gestion de la famille (création, gestion des membres et rôles, gestion des adhésions)
- gestion des menus de la semaine (contrainte, création, suggestion, modification)
- gestion des recettes (création, favoris, génération pdf)
- gestions de la liste de courses (+ génération pdf)


## Lancement en mode développement

Requis: 
- node js v16
- vue cli 2
- initialisation d'une base de données postgres à l'aide du fichier db/sql/init_db.sql

### Frontend

dans le dossier front/menufamille
- npm install
- npm run serve
=> localhost:8080/

## Backend

dans le dossier api/menufamille
- npm install
- node server
=> localhost:3000/info 


## Docker

Se placer dans le dossier root MDL-MenuFamille

docker-compose up

accès au frontend via localhost:80/
accès à l'api via localhost:80/api/info

