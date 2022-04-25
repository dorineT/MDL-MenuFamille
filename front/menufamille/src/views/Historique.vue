<template>
    <v-card class="cardmargin">
          <v-container fluid>
            <v-row class="d-flex justify-end ">
              <v-col cols="12" sm="12" md="3" lg="3" xl="3" >          
                <v-select
                  v-model="selectedFamille"
                  :items="famille"
                  menu-props="auto"
                  label="Famille"
                  hide-details
                  prepend-icon="mdi-account-group"
                  single-line     
                  no-data-text="Aucune famille disponible"
                  @change="changeFamille()"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>



          <v-expansion-panels class="pa-7">
            <v-expansion-panel
              v-for="menu in menus"
              :key="menu.id_menu"
              @click="openPanel(menu)"
            >
              <v-expansion-panel-header class="ma-3">
                {{menu.periode_debut }} - {{ menu.periode_fin}}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                  <calendar-resume :periodeMenu="periode" :idMenu="menuId"></calendar-resume>
             </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>  
    </v-card>
</template>

<script>
import CalendarResume from '../components/CalendarResume.vue'

import MenuDao from '../services/api.menu'
let DAOMenu = new MenuDao()
export default {
	components: { CalendarResume },
    data(){
        return{
            menus: [],
            periode: null,
            menuId: null,

            //famille
            selectedFamille: null,
            famille: [],
        }
    },
    mounted(){
          this.$store.state.auth.user.roles.forEach(element => {        
            this.famille.push(element[1])
          });
          if(this.$store.state.info.nomFamille !== null) {
            this.selectedFamille = this.$store.state.info.nomFamille
            this.itemPeriode = []  
            this.i = 0     
            this.fetch()
        
          } else {
            this.selectedFamille = this.famille.length > 0 ? this.famille[0] : null
            this.changeFamille();
          }  
        
    },
    methods:{
        fetch(){
            DAOMenu.getMenuOld(this.$store.state.info.idFamilleActuel).then(
                (response) => {
                    this.menus = response.data
                }
            )
        },
          async changeFamille(){       
            //select les menus correspondants
            if(this.selectedFamille !== null){
              let famille = this.$store.state.auth.user.roles.find(el => el[1] === this.selectedFamille)
              // change store value
              this.$store.dispatch("info/changeFamille", [famille[0], famille[1], famille[2], famille[3]])   
              this.itemPeriode = []    
              this.i = 0      
              await this.fetch()
                         
            }
          },
        openPanel(menu){
            
            this.periode = menu.periode_debut + " - " + menu.periode_fin
            this.menuId = menu.id_menu
        }
    }
}
</script>

<style lang="sass">
@import "../style/globalStyle"
</style>