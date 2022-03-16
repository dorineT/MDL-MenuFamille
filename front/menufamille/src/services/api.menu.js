import api from './api'
import moment from 'moment'

export default class MenuDao{
    /**
     * Get les menus validés (verrou à true) selon la famille sélectionnée
     * @param idFamille
     */
    async getMenuLock(/*idFamille*/) {
      console.log('in get locked')  
        let menus = []
        
        await api.get("/menu/GetLockedMenu/1")
          .then((response) => {            
            console.log('response')
            console.log(response.data)
            menus = response.data
                      
          });    
        console.log('out get locked')
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

