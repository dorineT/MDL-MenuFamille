<template>  
    <v-card       
        class="cardmargin"
    >
      <v-container fluid>
        <v-row class="d-flex justify-end ">
          <v-col>
            <v-select
            color="orange lighten-2"
            label="Choix du menu"
            class="combobox-class"
            no-data-text="Aucun menu disponible"
            :items="itemPeriode"
            return-object     
            v-model="comboboxMenuSelected">
            
              <!-- Template for render data when the select is expanded -->
              <template
                slot="item"
                slot-scope="data"
              >
                <!-- Divider and Header-->
                <template v-if="(typeof data.item !== 'object')">
                  <v-list-item-content v-text="data.item"/>
                </template>
                <!-- Normal item -->
                <template v-else>
                  <v-list-item-content>
                    <v-list-item-title v-html="data.item.text"/>
                    
                  </v-list-item-content>
                </template>
              </template>
            
            </v-select>
          </v-col>
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
        menuLocked: [],
        selectedFamille: null,
        famille: [],
        
        itemPeriode: [{header:'Menu de la semaine'},{ divider: true },{header:'Menu en attente de validation'},{ divider: true }, {header:'Menu disponible à la suggestion '}],
        comboboxMenuSelected: null,
      }
    },
    async mounted(){      
      
      this.$store.state.auth.user.roles.forEach(element => {        
        this.famille.push(element[1])
      });
      if(this.$store.state.info.nomFamille !== null) {
        this.selectedFamille = this.$store.state.info.nomFamille
        this.itemPeriode = []
        await this.getLockedMenu()
        await this.getUnlockedMenu()
        await this.getUnlockedSuggestionMenu() 
        
      } else {
        this.selectedFamille = this.famille.length > 0 ? this.famille[0] : null
        this.changeFamille();
      }  
      
    },
    watch:{
      async comboboxMenuSelected(slot){
        alert(slot.value)

        //bind component
        if(slot.type === 'modification'){

        }
        else if(slot.type === 'suggestion'){

        }
        else{
          // locked type
        }
       }
    },
    methods:{
      goToModificationMenu(item){             
        this.$router.push({name:'MenuModification', query: {menu: item}});    
      },
      goToSuggestionMenu(item){
       
        this.$router.push({name:'MenuSuggestion', query: {menu: item}});
      },
      async changeFamille(){       
        //select les menus correspondants
        if(this.selectedFamille !== null){
          let famille = this.$store.state.auth.user.roles.find(el => el[1] === this.selectedFamille)
          // change store value
          this.$store.dispatch("info/changeFamille", [famille[0], famille[1], famille[2], famille[3]])   
          this.itemPeriode = []          
          await this.getLockedMenu() 
          await this.getUnlockedMenu()
          await this.getUnlockedSuggestionMenu()                   
        }
      },
      getUnlockedMenu(){      
        this.menuToValide = []
        DAOMenu.getMenuUnlocked(this.$store.state.info.idFamilleActuel).then(
          (response) =>{
            this.itemPeriode.push({ divider: true },{header:'Menu en attente de validation'})
            let menus = response.data
            menus.forEach(menu => {         
                let periodeNew = { 
                    text: menu.periode_debut + ' - ' +menu.periode_fin,
                    value: menu.id_menu,
                    type: 'modification'
                  }         
                this.itemPeriode.push(periodeNew)            
                //this.menuToValide.push(periodeNew)        
            });
          }
        ) 

      },
      getUnlockedSuggestionMenu(){
        this.menuToSuggest = []
        DAOMenu.getMenuSuggestionUnlocked(this.$store.state.info.idFamilleActuel).then(
          (response) =>{
            let menus = response.data
            this.itemPeriode.push({ divider: true }, {header:'Menu disponible à la suggestion '})
            menus.forEach(menu => {           
                let periodeSugg = {
                  text:menu.periode_debut+ ' - ' +menu.periode_fin,
                  value:menu.id_menu,
                  type: 'suggestion'          
              }     
              this.itemPeriode.push(periodeSugg)   
              //this.menuToSuggest.push(periodeSugg)
            })
          }
        )
      },
      getLockedMenu(){
        this.menuLocked = [{header:'Menu de la semaine'}]
        DAOMenu.getMenuLock(this.$store.state.info.idFamilleActuel).then(
          (response) =>{
            let menus = response.data
            this.itemPeriode.push({header:'Menu de la semaine'}) 
            menus.forEach(menu => {           
                let periode = {
                  text:menu.periode_debut+ ' - ' +menu.periode_fin,
                  value:menu.id_menu, 
                  type: 'locked'         
              }
              this.itemPeriode.push(periode)    
              //this.menuLocked.push(periode)
            })
          }
        )
      }
    }
  }
</script>

<style lang="sass">
.cardmargin
  margin: 10px
  padding: 10px
</style>
