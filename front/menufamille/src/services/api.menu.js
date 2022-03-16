import api from './api'
import moment from 'moment'

export default class MenuDao{
    /**
     * Get les menus validés (verrou à true) selon la famille sélectionnée
     * @param idFamille
     */
    async getMenuLock(/*idFamille*/) {
        let menus = []
        
        await api.get("/menu/GetLockedMenu/1")
          .then((response) => {            
            
            response.data.forEach(menuItem => {
                let i = 0
                menus.push({
                  menu_id: menuItem.id_menu,
                  dateDebut: menuItem.periode_debut,
                  dateFin: menuItem.periode_fin,
                  verrou: menuItem.verrou,
                  plats:[]
                })

                let j = 0
                //get les jours
                menuItem.calendriers.forEach(jourItem => {
                  menus[i].plats.push({
                    id: jourItem.id_calendrier,
                    date: jourItem.date,
                    jour: this.getDay(jourItem.date)
                  })

                  jourItem.calendrier_recettes.forEach(periodeItem =>{
                    let recette = ""
                    if(periodeItem.recette === null & periodeItem.is_recette){
                      recette = ""
                    }
                    else if(periodeItem.recette === null & !periodeItem.is_recette){
                      recette = "/"
                    }else{
                      recette = periodeItem.recette.nom
                    }

                    if(periodeItem.periode === 'matin'){
                      menus[i].plats[j].matin = recette
                      menus[i].plats[j].matinNbPers = jourItem.nb_personne
                    }
                    else if(periodeItem.periode === 'midi'){
                      menus[i].plats[j].midi = recette
                      menus[i].plats[j].midiNbPers = jourItem.nb_personne
                    }
                    else{
                      menus[i].plats[j].soir = recette
                      menus[i].plats[j].soirNbPers = jourItem.nb_personne
                    }
                  })

                  j++


                })
                
            });
                      
          });  
        console.log(menus)          
        return menus 
    }

    getDay(date){
      let dateJour = moment(date, "DD-MM-YYYY");
      return dateJour.locale('fr').format('dddd')
    }
  
    /*getNameOfDay(day) {
      console.log(' day : ' + day)
      if (day == 0) return "Dimanche";
      else if (day == 1) return "Lundi";
      else if (day == 2) return "Mardi";
      else if (day == 3) return "Mercredi";
      else if (day == 4) return "Jeudi";
      else if (day == 5) return "Vendredi";
      return "Samedi";
    }*/

}

