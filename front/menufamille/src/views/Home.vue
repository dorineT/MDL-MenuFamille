<template>  
    <v-card       
        class="cardmargin"
    >
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
      <calendarResume/>

      <v-card
        class="d-flex justify-space-around mb-9" 
        style="margin: 30px"       
        flat
        tile
      >
        <v-card             
          class="pa-6"
          outlined
          tile
        >
          <v-list>
            <v-subheader>Menus disponible à la suggestion :</v-subheader>
            <v-list-item-group              
              color="primary"
            >  
              <v-list-item v-if ="menuToSuggest.length ===0">
                <v-list-item-content>
                  <v-list-item-title> Aucune suggestion actuellement </v-list-item-title>
                </v-list-item-content> 
              </v-list-item>
                  <v-list-item 
                  v-for="(item) in menuToSuggest"
                  :key="item.value"  @click="goToSuggestionMenu(item)">
                  <v-list-item-icon>
                  <v-icon>mdi-arrow-right-thick</v-icon>
                  </v-list-item-icon>   
                  <v-list-item-content>
                    <v-list-item-title  v-text="item.text" :value="item.value"></v-list-item-title>
                  </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>

        <!--ONLY parent mode--->
        <v-card 
          class="pa-2"
          outlined
          tile
          v-if="this.$store.state.info.roleActuel==='parent'"
        >
          <v-list>
            <v-subheader>Menu à valider :</v-subheader>
            <v-list-item-group              
              color="primary"
            >
              <v-list-item v-if="menuToValide.length === 0">
                <v-list-item-content >
                  <v-list-item-title > Aucun menu à valider actuellement</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item
                v-for="(item) in menuToValide"
                :key="item.value"

                @click="goToModificationMenu(item)"
              >  
              <v-list-item-icon>
                <v-icon>mdi-arrow-right-thick</v-icon>
                </v-list-item-icon>     
                <v-list-item-content >
                  <v-list-item-title  v-text="item.text" :value="item.value"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>

      </v-card>

    </v-card>
</template>

<script>
  import CalendarResume from '../components/CalendarResume'
  import MenuDao from '../services/api.menu'
  let DAOMenu = new MenuDao()
  export default {

    components: {
      CalendarResume,
    },

    data (){
      return{
        menuToValide: [],
        menuToSuggest: [],
        selectedFamille: null,
        famille: [],        
      }
    },
    created(){      
      
      this.$store.state.auth.user.roles.forEach(element => {        
        this.famille.push(element[1])
      });
      if(this.$store.state.info.nomFamille !== null) {
        this.selectedFamille = this.$store.state.info.nomFamille
        this.getUnlockedMenu()
        this.getUnlockedSuggestionMenu() 
      } else {
        this.selectedFamille = this.famille.length > 0 ? this.famille[0] : null
        this.changeFamille();
      }  
      
    },
    methods:{
      goToModificationMenu(item){             
        this.$router.push({name:'MenuModification', query: {menu: item}});    
      },
      goToSuggestionMenu(item){
       
        this.$router.push({name:'MenuSuggestion', query: {menu: item}});
      },
      changeFamille(){
        console.log('changement')
        //select les menus correspondants
        if(this.selectedFamille !== null){
          let famille = this.$store.state.auth.user.roles.find(el => el[1] === this.selectedFamille)
          // change store value
          this.$store.dispatch("info/changeFamille", [famille[0], famille[1], famille[2], famille[3]])             
          this.getUnlockedMenu()
          this.getUnlockedSuggestionMenu() 
        }
      },
      async getUnlockedMenu(){      
        this.menuToValide = []
        let menus = await DAOMenu.getMenuUnlocked(this.$store.state.info.idFamilleActuel)     
        menus.forEach(menu => {         
            let periodeNew = { 
                text: menu.periode_debut + ' - ' +menu.periode_fin,
                value: menu.id_menu
              }                   
            this.menuToValide.push(periodeNew)        
        });
      },
      async getUnlockedSuggestionMenu(){
        this.menuToSuggest = []
        let menus = await DAOMenu.getMenuSuggestionUnlocked(this.$store.state.info.idFamilleActuel)
        menus.forEach(menu => {
           
          let periodeSugg = {
          text:menu.periode_debut+ ' - ' +menu.periode_fin,
          value:menu.id_menu,
          
        }    
        
        this.menuToSuggest.push(periodeSugg)
      })
      }

    }
  }
</script>

<style lang="sass">
.cardmargin
  margin: 10px
  padding: 10px
  //opacity: 85%
</style>
