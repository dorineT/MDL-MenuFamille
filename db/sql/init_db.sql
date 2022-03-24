/*** Définition de l'utilisateur API ***/
create user api with encrypted password 'AF8ns#.<kY:K?b6tH.<^.ft/';
grant all privileges on database MenuFamille to api;



/*** Définition de la timezone pour le timestamp ***/
SET TIMEZONE TO 'UTC+1';

/*** Définition des tables avec leur clé primaire ***/
CREATE TABLE FAMILLE (
                         id_famille SERIAL NOT NULL ,
                         nom VARCHAR NOT NULL ,
                         code_acces VARCHAR UNIQUE NOT NULL,
                         nb_membres INTEGER NOT NULL,
                         PRIMARY KEY (id_famille)
);

CREATE TYPE type_menu AS ENUM ('manuel','auto','sugestion');
CREATE TABLE MENU (
                      id_menu SERIAL NOT NULL ,
                      id_famille INTEGER NOT NULL,
                      periode_debut TIMESTAMP NOT NULL ,
                      periode_fin TIMESTAMP NOT NULL ,
                      plat_identique_matin INTEGER NOT NULL DEFAULT -1,
                      plat_identique_midi INTEGER NOT NULL DEFAULT -1,
                      plat_identique_soir INTEGER NOT NULL DEFAULT -1,
                      days_until_suggestion INTEGER NOT NULL DEFAULT 2,
                      type type_menu,
                      verrou BOOL NOT NULL DEFAULT false,
                      PRIMARY KEY (id_menu)
);

CREATE TABLE MEMBRES (
                         id_membre SERIAL NOT NULL,
                         nom VARCHAR NOT NULL,
                         prenom VARCHAR NOT NULL,
                         email VARCHAR NOT NULL UNIQUE,
                         secret VARCHAR NOT NULL,
                         PRIMARY KEY (id_membre)
);

CREATE TABLE REFRESH_TOKEN (
                               id_refreshtoken SERIAL NOT NULL,
                               id_membre INTEGER NOT NULL,
                               token VARCHAR,
                               date_expiration TIMESTAMP,
                               date_inscription TIMESTAMP default current_timestamp,
                               date_changement TIMESTAMP,
                               PRIMARY KEY (id_refreshToken)
);

CREATE TABLE FAMILLE_MEMBRE (
                                id_famille INTEGER NOT NULL ,
                                id_membre INTEGER NOT NULL,
                                role VARCHAR NOT NULL,
                                PRIMARY KEY (id_famille,id_membre)
);

CREATE TABLE FAVORIS (
                         id_recette INTEGER NOT NULL,
                         id_membre INTEGER NOT NULL,
                         PRIMARY KEY (id_membre,id_recette)
);

CREATE TABLE RECETTE (

    id_recette SERIAL NOT NULL,
    nom VARCHAR NOT NULL UNIQUE,
    difficulte INTEGER NOT NULL,
    calorie INTEGER NOT NULL,
    temps_cuisson INTEGER NOT NULL,
    temps_preparation INTEGER NOT NULL,
    nb_personne INTEGER NOT NULL,
    nutriscore VARCHAR NOT NULL,
    preparation TEXT,
    PRIMARY KEY (id_recette)

);

CREATE TABLE RECETTE_TAGS (
                              id_recette INTEGER NOT NULL,
                              id_tag INTEGER NOT NULL,
                              PRIMARY KEY (id_recette,id_tag)
);

CREATE TABLE RECETTE_CATEGORIES (
                                    id_recette INTEGER NOT NULL,
                                    id_categorie INTEGER NOT NULL,
                                    PRIMARY KEY (id_recette,id_categorie)
);

CREATE TYPE periode AS ENUM ('matin','midi','soir');
CREATE TABLE CATEGORIE (
                           id_categorie SERIAL NOT NULL,
                           periode periode,
                           PRIMARY KEY (id_categorie)
);

CREATE TABLE TAG (
                     id_tag SERIAL NOT NULL,
                     nom VARCHAR UNIQUE NOT NULL ,
                     PRIMARY KEY (id_tag)
);

CREATE TABLE RECETTE_DENREE (
                                id_recette INTEGER NOT NULL,
                                id_denree INTEGER NOT NULL,
                                quantite INTEGER NOT NULL,
                                PRIMARY KEY (id_recette,id_denree)
);


CREATE TABLE DENREE (

    id_denree SERIAL NOT NULL,
    nom VARCHAR NOT NULL UNIQUE ,
    nutriscore VARCHAR,
    PRIMARY KEY (id_denree)

);

CREATE TABLE TYPE (
                      id_type SERIAL NOT NULL,
                      nom VARCHAR NOT NULL UNIQUE,
                      PRIMARY KEY (id_type)
);

CREATE TABLE DENREE_TYPE (
                             id_denree INTEGER NOT NULL,
                             id_type INTEGER NOT NULL,
                             PRIMARY KEY (id_denree,id_type)
);

CREATE TABLE CALENDRIER (
                            id_calendrier SERIAL NOT NULL,
                            date TIMESTAMP NOT NULL
                            PRIMARY KEY (id_calendrier)
);

CREATE TABLE MENU_CALENDRIER (
                                 id_menu INTEGER NOT NULL,
                                 id_calendrier INTEGER NOT NULL,
                                 PRIMARY KEY (id_menu,id_calendrier)
);

CREATE TABLE CALENDRIER_RECETTE (
                                    id_periode SERIAL NOT NULL,
                                    id_calendrier INTEGER NOT NULL,
                                    id_recette INTEGER NOT NULL,
                                    periode periode,
                                    is_recette Bool NOT NULL DEFAULT false,
                                    nb_personne INTEGER
                                    UNIQUE (id_calendrier, id_recette, periode),
                                    PRIMARY KEY (id_periode)
);

CREATE TABLE SUGGESTION (
                                    id_periode INTEGER NOT NULL,
                                    id_recette INTEGER NOT NULL,
                                    id_membre INTEGER NOT NULL,
                                    id_menu INTEGER NOT NULL,
                                    PRIMARY KEY (id_periode, id_recette, id_membre, id_menu)
);

CREATE TABLE TAG_PERIODE (
                                    id_periode INTEGER NOT NULL,
                                    id_tag INTEGER NOT NULL,
                                    PRIMARY KEY (id_periode,id_tag)
);

/*** Définition des clés étrangères ***/
ALTER TABLE MENU ADD CONSTRAINT pk_MUfamille FOREIGN KEY (id_famille) REFERENCES FAMILLE(id_famille) ON DELETE CASCADE;

ALTER TABLE REFRESH_TOKEN ADD CONSTRAINT pk_RNtoken FOREIGN KEY (id_membre) REFERENCES MEMBRES(id_membre) ON DELETE RESTRICT;

ALTER TABLE FAMILLE_MEMBRE ADD CONSTRAINT pk_FMfamille FOREIGN KEY (id_famille) REFERENCES FAMILLE(id_famille) ON DELETE CASCADE;

ALTER TABLE FAMILLE_MEMBRE ADD CONSTRAINT pk_FMmembre FOREIGN KEY (id_membre) REFERENCES MEMBRES(id_membre) ON DELETE CASCADE;

ALTER TABLE FAVORIS ADD CONSTRAINT pk_FImembre FOREIGN KEY (id_membre) REFERENCES MEMBRES(id_membre) ON DELETE CASCADE;

ALTER TABLE FAVORIS ADD CONSTRAINT pk_FIrecette FOREIGN KEY (id_recette) REFERENCES RECETTE(id_recette) ON DELETE CASCADE;

ALTER TABLE DENREE_TYPE ADD CONSTRAINT pk_DTdenree FOREIGN KEY (id_denree) REFERENCES DENREE(id_denree) ON DELETE CASCADE;

ALTER TABLE DENREE_TYPE ADD CONSTRAINT pk_DTtype FOREIGN KEY (id_type) REFERENCES TYPE(id_type) ON DELETE CASCADE ;

ALTER TABLE RECETTE_DENREE ADD CONSTRAINT pk_RDrecette FOREIGN KEY (id_recette) REFERENCES RECETTE(id_recette) ON DELETE CASCADE;

ALTER TABLE RECETTE_DENREE ADD CONSTRAINT pk_RDdenree FOREIGN KEY (id_denree) REFERENCES DENREE(id_denree) ON DELETE CASCADE;

ALTER TABLE RECETTE_TAGS ADD CONSTRAINT pk_RTrecette FOREIGN KEY (id_recette) REFERENCES RECETTE(id_recette) ON DELETE CASCADE;

ALTER TABLE RECETTE_TAGS ADD CONSTRAINT pk_RTtag FOREIGN KEY (id_tag) REFERENCES TAG(id_tag) ON DELETE CASCADE;

ALTER TABLE RECETTE_CATEGORIES ADD CONSTRAINT pk_RCrecette FOREIGN KEY (id_recette) REFERENCES RECETTE(id_recette) ON DELETE CASCADE;

ALTER TABLE RECETTE_CATEGORIES ADD CONSTRAINT pk_RCcategorie FOREIGN KEY (id_categorie) REFERENCES CATEGORIE(id_categorie) ON DELETE CASCADE;

ALTER TABLE CALENDRIER_RECETTE ADD CONSTRAINT pk_CRrecette FOREIGN KEY (id_recette) REFERENCES RECETTE(id_recette) ON DELETE CASCADE;

ALTER TABLE CALENDRIER_RECETTE ADD CONSTRAINT pk_CRcalendrier FOREIGN KEY (id_calendrier) REFERENCES CALENDRIER(id_calendrier) ON DELETE CASCADE;

ALTER TABLE MENU_CALENDRIER ADD CONSTRAINT pk_MCmenu FOREIGN KEY (id_menu) REFERENCES MENU(id_menu) ON DELETE CASCADE;

ALTER TABLE MENU_CALENDRIER ADD CONSTRAINT pk_MCcalendrier FOREIGN KEY (id_calendrier) REFERENCES CALENDRIER(id_calendrier) ON DELETE CASCADE;

ALTER TABLE TAG_PERIODE ADD CONSTRAINT pk_TPtag FOREIGN KEY (id_tag) REFERENCES TAG(id_tag) ON DELETE CASCADE;

ALTER TABLE TAG_PERIODE ADD CONSTRAINT pk_TPperiode FOREIGN KEY (id_periode) REFERENCES CALENDRIER_RECETTE(id_periode) ON DELETE CASCADE;

ALTER TABLE SUGGESTION ADD CONSTRAINT pk_SNrecette FOREIGN KEY (id_recette) REFERENCES RECETTE(id_recette) ON DELETE CASCADE;

ALTER TABLE SUGGESTION ADD CONSTRAINT pk_SNmembre FOREIGN KEY (id_membre) REFERENCES MEMBRES(id_membre) ON DELETE CASCADE;

ALTER TABLE SUGGESTION ADD CONSTRAINT pk_SNperiode FOREIGN KEY (id_periode) REFERENCES CALENDRIER_RECETTE(id_periode) ON DELETE CASCADE;

ALTER TABLE SUGGESTION ADD CONSTRAINT pk_SNmenu FOREIGN KEY (id_menu) REFERENCES MENU(id_menu) ON DELETE CASCADE;


/*insert tag + type*/
INSERT INTO TAG (id_tag, nom) VALUES (DEFAULT, 'soupe');
INSERT INTO TAG (id_tag, nom) VALUES (DEFAULT, 'lunchBox');
INSERT INTO TAG (id_tag, nom) VALUES (DEFAULT, 'light');
INSERT INTO TAG (id_tag, nom) VALUES (DEFAULT, 'gaterie');

INSERT INTO TYPE (id_type, nom) VALUES (DEFAULT, 'fruit');
INSERT INTO TYPE (id_type, nom) VALUES (DEFAULT, 'légume');
INSERT INTO TYPE (id_type, nom) VALUES (DEFAULT, 'produit laitier');
INSERT INTO TYPE (id_type, nom) VALUES (DEFAULT, 'viande');
INSERT INTO TYPE (id_type, nom) VALUES (DEFAULT, 'poisson');
INSERT INTO TYPE (id_type, nom) VALUES (DEFAULT, 'fruits de mer');
INSERT INTO TYPE (id_type, nom) VALUES (DEFAULT, 'alcool');
INSERT INTO TYPE (id_type, nom) VALUES (DEFAULT, 'eau');
INSERT INTO TYPE (id_type, nom) VALUES (DEFAULT, 'sel');
INSERT INTO TYPE (id_type, nom) VALUES (DEFAULT, 'produit sucrée');
INSERT INTO TYPE (id_type, nom) VALUES (DEFAULT, 'matière grasse');
INSERT INTO TYPE (id_type, nom) VALUES (DEFAULT, 'céréale');


/*** 2.on ne peux plus modifier le menu après validation ou periode debut ***/

/*** Détecter par rapport à un BOOL (verrou) et non une date*/


CREATE OR REPLACE FUNCTION menu_already_valid_FC()
    RETURNS TRIGGER
    LANGUAGE PLPGSQL
AS
$$
BEGIN
    IF OLD.periode_debut <= NOW() THEN
        RAISE EXCEPTION 'le menu n est plus modifiable';
    END IF;
    RETURN new;
END;
$$


/*** pas utile je pense*/
CREATE OR REPLACE FUNCTION menu_calendrier_already_valid_FC()
    RETURNS TRIGGER
    LANGUAGE PLPGSQL
AS
$$
BEGIN
    IF OLD.menu.periode_debut <= NOW() THEN
        RAISE EXCEPTION 'vous ne pouvez plus deplacer les jours';
    END IF;
    RETURN new;
END;
$$


CREATE TRIGGER menu_already_valid
    BEFORE UPDATE
    ON menu
    FOR EACH ROW
EXECUTE PROCEDURE menu_already_valid_FC();


CREATE TRIGGER menu_calendrier_already_valid
    BEFORE UPDATE
    ON menu_calendrier
    FOR EACH ROW
EXECUTE PROCEDURE menu_calendrier_already_valid_FC();



/*** la famille doit être suprimer si elle est vide => 


===> fait par la contrainte on cascade delete
bonus l'attribut nb_membre ce met a jour
 ***/

/*
CREATE OR REPLACE FUNCTION empty_familly_FC()
    RETURNS TRIGGER
    LANGUAGE PLPGSQL
AS
$$
BEGIN
    IF (select id_membre from famille_membre where id_famille = old.id_famille) is NULL THEN
        DELETE FROM famille where id_famille = old.id_famille;
    ELSE
        UPDATE Famille
        SET nb_membre = (SELECT count(id_membre) from famille_membre where id_famille = old.id_famille);
    END IF;
    RETURN new;
END;
$$*/

/*

====>  contrainte cascade delete

CREATE TRIGGER empty_familly
    AFTER DELETE
    ON famille_membre
    FOR EACH ROW
EXECUTE PROCEDURE empty_familly_FC();

CREATE TRIGGER update_familly
    AFTER update
    ON famille_membre
    FOR EACH ROW
EXECUTE PROCEDURE empty_familly_FC();*/


/*** Menu doit être suprmier si sa famille a été suprimer  ====> IDEM

CREATE OR REPLACE FUNCTION menu_without_family()
    RETURNS TRIGGER
    LANGUAGE PLPGSQL
AS
$$
BEGIN
    IF (select id_famille from menu where id_famille = new.id_famille) is NULL THEN
        DELETE FROM menu where id_famille = old.id_famille;
    END IF;
    RETURN new;
END;
$$   

CREATE TRIGGER menu_without_family
    AFTER DELETE
    ON famille
    FOR EACH ROW
EXECUTE PROCEDURE menu_without_family();*/



/***Calendrier doit être suprimer si il n'a plus de lien avec Menu   ===

==== > IDEM


***/

/*
CREATE OR REPLACE FUNCTION daily_without_menu()
    RETURNS TRIGGER
    LANGUAGE PLPGSQL
AS
$$
BEGIN
    IF (select id_menu from menu_calendrier where id_menu = new.id_menu) is NULL THEN
        DELETE FROM calendrier where id_calendrier = old.id_menu;
    END IF;
    RETURN new;
END;
$$


CREATE TRIGGER trg_daily_without_menu
    AFTER DELETE
    ON menu
    FOR EACH ROW
EXECUTE PROCEDURE menu_without_family(); */

/***pas 2 fois le même plat  => NOM en unique 

et la contrainte  plat identique sur la semaine gérée sur  le front (voir back)
***/


/** MANQUANT:

* trigger qui met à jour la table calendrier_plat lorsque le menu passe en mode verrou, tout les plats du menu passe en mode verrou aussi
bool dans les différentes tables

* + d'autres mais pas en rapport avec des suppressions ou contraintes unique qui sont réalisés sans trigger
*/



