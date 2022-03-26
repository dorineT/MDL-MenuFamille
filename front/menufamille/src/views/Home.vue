<template>  
    <v-card       
        class="cardmargin"
    >
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
              <v-list-item
                v-for="(item, i) in menuToSuggest"
                :key="i"
              >       
                <v-list-item-content>
                  <v-list-item-title  @click="goToSuggestionMenu(i, item)" v-text="item"></v-list-item-title>
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
          
        >
          <v-list>
            <v-subheader>Menu à valider :</v-subheader>
            <v-list-item-group              
              color="primary"
            >
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
        menuToSuggest: ['07/03 - 13/03']  // à retirer
      }
    },
    async created(){
      let menus = await DAOMenu.getMenuUnlocked(this.$store.state.auth.user.id_membre)  
      //let suggestionMenus = await DAOMenu.getMenuSuggestionUnlocked(this)   
      menus.forEach(menu => {         
          let periodeNew = { 
              text: menu.periode_debut + ' - ' +menu.periode_fin,
              value: menu.id_menu
            }     
          this.menuToValide.push(periodeNew)        
      });
    },
    methods:{
      goToModificationMenu(item){             
        this.$router.push({name:'MenuModification', query: {menu: item}});    
      },
      goToSuggestionMenu(key, item){
        this.$router.push({name:'MenuSuggestion', query: {id: key, periode: item}});
      }
    }
  }
</script>

<style lang="sass">
.cardmargin
  margin: 10px
  padding: 10px
</style>
