## Menu-Famille
Projet réalisé dans un cadre pédagogique de l'université de Namur

Gestion des menus d'une famille par différents rôles (enfant - parent)

- gestion de la famille (création, gestion des membres et rôles, gestion des adhésions)
- gestion des menus de la semaine (contrainte, création, suggestion, modification)
- gestion des recettes (création, favoris, génération pdf)
- gestions de la liste de courses (+ génération pdf)


## Lancement en mode développement

Requis: 
- node js v16
- vue cli 2
- initialisation d'une base de données postgresql 14 à l'aide du fichier db/sql/init_db.sql
- MDL-MenuFamille/api/menufamille/app/config/db.config.js  : configurer les accès à la base de données (host, port, user, password, db)

### Frontend

dans le dossier front/menufamille
- npm install
- npm run serve
=> http://localhost:8080/

## Backend

dans le dossier api/menufamille
- npm install
- node server
=> http://localhost:3000/info 


## Docker

Se placer dans le dossier root MDL-MenuFamille

docker-compose up

accès au frontend via http://localhost/

accès à l'api via http://localhost/api/info

