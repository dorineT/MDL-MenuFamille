



/*** Définition de la timezone pour le timestamp ***/
SET TIMEZONE TO 'UTC+1';

/*** Définition des tables avec leur clé primaire ***/
CREATE TABLE FAMILLE (
                         id_famille SERIAL NOT NULL ,
                         nom VARCHAR NOT NULL ,
                         code_acces VARCHAR UNIQUE,
                         nb_membres INTEGER NOT NULL,
                         PRIMARY KEY (id_famille)
);

CREATE TYPE type_menu AS ENUM ('manuel','auto','suggestion');
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

CREATE TYPE arbre AS ENUM ('parent','enfant');
CREATE TYPE statut AS ENUM ('accepter','refuser','attente');
CREATE TABLE FAMILLE_MEMBRE (
                                id_famille INTEGER NOT NULL ,
                                id_membre INTEGER NOT NULL,
                                role arbre NOT NULL,
                                statut statut NOT NULL DEFAULT 'attente',
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
                                mesure VARCHAR NOT NULL,
                                PRIMARY KEY (id_recette,id_denree)
);


CREATE TABLE DENREE (

    id_denree SERIAL NOT NULL,
    nom VARCHAR NOT NULL UNIQUE ,
    nutriscore VARCHAR,
    calories FLOAT NOT NULL,
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
                            date TIMESTAMP NOT NULL,
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
                                    nb_personne INTEGER,
                                    UNIQUE (id_calendrier, periode),
                                    PRIMARY KEY (id_periode)
);

CREATE TABLE SUGGESTION (
                                    id_periode INTEGER NOT NULL,
                                    id_recette INTEGER NOT NULL,
                                    id_membre INTEGER NOT NULL,
                                    id_menu INTEGER NOT NULL,
                                    PRIMARY KEY (id_periode, id_membre, id_menu)
);

CREATE TABLE TAG_PERIODE (
                                    id_periode INTEGER NOT NULL,
                                    id_tag INTEGER NOT NULL,
                                    PRIMARY KEY (id_periode,id_tag)
);

/*** Définition des clés étrangères ***/
ALTER TABLE MENU ADD CONSTRAINT pk_MUfamille FOREIGN KEY (id_famille) REFERENCES FAMILLE(id_famille) ON DELETE CASCADE;

ALTER TABLE REFRESH_TOKEN ADD CONSTRAINT pk_RNtoken FOREIGN KEY (id_membre) REFERENCES MEMBRES(id_membre) ON DELETE CASCADE;

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
INSERT INTO TAG (id_tag, nom) VALUES (DEFAULT, 'sucré');
INSERT INTO TAG (id_tag, nom) VALUES (DEFAULT, 'salé');
INSERT INTO TAG (id_tag, nom) VALUES (DEFAULT, 'lunch-box');
INSERT INTO TAG (id_tag, nom) VALUES (DEFAULT, 'light');
INSERT INTO TAG (id_tag, nom) VALUES (DEFAULT, 'vegan');
INSERT INTO TAG (id_tag, nom) VALUES (DEFAULT, 'repas complet');

INSERT INTO CATEGORIE (id_categorie, periode) VALUES (DEFAULT, 'matin');
INSERT INTO CATEGORIE (id_categorie, periode) VALUES (DEFAULT, 'midi');
INSERT INTO CATEGORIE (id_categorie, periode) VALUES (DEFAULT, 'soir');


/* Contraintes */
create function delete_famille()
returns trigger as $$
declare
    value record;
begin
    for value in (select f.id_famille, count(*) as nb from famille_membre f 
        where f.id_famille in (select fm.id_famille from famille_membre fm 
                                natural join membres m
                                where m.email = old.email and fm."role" = 'parent') 
        and f."role" = 'parent'
        group by f.id_famille)
        loop
            if value.nb = 1 then 
                raise exception 'unique parent de la famille' using ERRCODE = 23500;
            end if;
        end loop;
        return old;
    
end; $$ language plpgsql;



create trigger delete_famille
before delete
on membres
for each row 
execute procedure delete_famille();


CREATE OR REPLACE FUNCTION delete_update_membre()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
declare
	nb integer;
	isCascade integer;
begin
	if old.role = 'parent' then
		SELECT COUNT(query_start) as nb_query into isCascade FROM pg_stat_activity as activity where query_start is not null and query like 'DELETE FROM "famille" WHERE "id_famille" = %'
			group by query_start
			ORDER BY query_start  desc
			limit 4;
		select count(*) as nb into nb from famille_membre f where f.id_famille = old.id_famille  and f."role" = 'parent' group by f.id_famille;
    	if nb > 0 and nb = 1 and isCascade IS NULL then 
       		raise exception 'unique parent de la famille!' using ERRCODE = 23500;
    	end if;
    end if;
   	if tg_op = 'UPDATE' then 
    	return new;  
    elsif tg_op = 'DELETE' then
    	return old;
    end if;
end; $function$;

create trigger delete_membre
before delete
on famille_membre
for each row 
execute procedure delete_update_membre();

create trigger update_membre
before update
of role
on famille_membre
for each row 
execute procedure delete_update_membre();

CREATE OR REPLACE FUNCTION update_nb_famille()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
declare
	nb_membres_max  integer;
	actual_nb_membres integer;
begin
   	if tg_op = 'INSERT' then
   		select count(*) as nb into actual_nb_membres from famille_membre fm where id_famille = new.id_famille and "statut" != 'refuser';
		select nb_membres into nb_membres_max from famille where id_famille = new.id_famille;
   		if nb_membres_max = actual_nb_membres then 
   			update famille set nb_membres = nb_membres_max+1 where id_famille = new.id_famille;
   		end if;
    	return new;  
    elsif tg_op = 'DELETE' then
    	select nb_membres into nb_membres_max from famille where id_famille = old.id_famille;
    	update famille set nb_membres = nb_membres_max-1 where id_famille = old.id_famille;
    	return old;
    end if;
end; $function$;

create trigger update_nb_famille before
delete or insert
on
famille_membre for each row execute function update_nb_famille();

CREATE OR REPLACE FUNCTION control_date_menu()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
declare
	nb_response  integer;
begin
   		select count(*) into nb_response from menu m where m.id_famille = new.id_famille and (new.periode_debut  between  m.periode_debut and m.periode_fin or new.periode_fin between  m.periode_debut and m.periode_fin);
   		if nb_response > 0 then 
   			raise exception 'chevauchement des dates!' using ERRCODE = 23500;
   		end if;
    	return new;  
end; $function$;

create trigger control_menu
before insert
on menu
for each row 
execute procedure control_date_menu();

