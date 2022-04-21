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

      <component v-bind:is="componentName" :periodeMenu="periode" :idMenu="idMenu" @eventReceived="eventChild"></component>
      <div v-if="componentName===null">
        <v-img
           :aspect-ratio="16/9"                  
          contain
          max-height="500"
          src="../assets/selectMenu.png">
        </v-img>
      </div>

    </v-card>
</template>

<script>
  import CalendarResume from '../components/CalendarResume'
  import CalendarModificationMenu from '../components/CalendarModificationMenu.vue'
  import CalendarSuggestion from '../components/CalendarSuggestion.vue'
  import MenuDao from '../services/api.menu'
  let DAOMenu = new MenuDao()
  export default {

    components: {
      CalendarResume,
      CalendarModificationMenu,
      CalendarSuggestion
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

        //dynamic bind
        componentName: null,
        idMenu: null,
        periode: null,
        i: 0,
      }
    },
    async mounted(){            
      this.$store.state.auth.user.roles.forEach(element => {        
        this.famille.push(element[1])
      });
      if(this.$store.state.info.nomFamille !== null) {
        this.selectedFamille = this.$store.state.info.nomFamille
        this.itemPeriode = []  
        this.i = 0     
        await this.getLockedMenu()        
        await this.getUnlockedSuggestionMenu() 
        await this.getUnlockedMenu()
        
        
      } else {
        this.selectedFamille = this.famille.length > 0 ? this.famille[0] : null
        this.changeFamille();
      }  
      
    },
    watch:{
      async comboboxMenuSelected(slot){      
        this.idMenu = slot.id_menu
        this.periode = slot.text
        //bind component
        if(slot.type === 'modification'){
          this.componentName = 'CalendarModificationMenu'
        }
        else if(slot.type === 'suggestion'){
          this.componentName = 'CalendarSuggestion'
        }
        else{
          // locked type
          this.componentName = 'CalendarResume'

        }
       }
    },
    methods:{
      async changeFamille(){       
        //select les menus correspondants
        if(this.selectedFamille !== null){
          let famille = this.$store.state.auth.user.roles.find(el => el[1] === this.selectedFamille)
          // change store value
          this.$store.dispatch("info/changeFamille", [famille[0], famille[1], famille[2], famille[3]])   
          this.itemPeriode = []    
          this.i = 0      
          await this.getLockedMenu() 
          await this.getUnlockedSuggestionMenu()    
          await this.getUnlockedMenu()
                         
        }
      },
      getUnlockedMenu(){      
        this.menuToValide = []      
        if(this.$store.state.info.roleActuel!=='parent') return
        DAOMenu.getMenuUnlocked(this.$store.state.info.idFamilleActuel).then(
          (response) =>{
            this.itemPeriode.push({ divider: true },{header:'Menu en attente de validation'})
            let menus = response.data
            menus.forEach(menu => {         
                let periodeNew = { 
                    text: menu.periode_debut + ' - ' +menu.periode_fin,
                    value: this.i,
                    id_menu: menu.id_menu,
                    type: 'modification'
                  }
                  this.i+=1       
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
                  value: this.i,
                  id_menu: menu.id_menu,
                  type: 'suggestion'          
              }     
              this.i+=1
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
                  value: this.i,
                  id_menu: menu.id_menu,
                  type: 'locked'         
              }
              this.i+=1
              this.itemPeriode.push(periode)    
              //this.menuLocked.push(periode)
            })
          }
        )
      },
      async eventChild(){
        if(this.componentName === 'CalendarModificationMenu'){          
          this.componentName = null
          this.i = 0
          this.itemPeriode = []  
          await this.getLockedMenu()        
          await this.getUnlockedSuggestionMenu() 
          await this.getUnlockedMenu()
        
        }
      }
    }
  }
</script>

<style lang="sass">
.cardmargin
  margin: 10px
  padding: 10px
</style>
