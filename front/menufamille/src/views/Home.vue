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
                v-for="(item, i) in menuToValide"
                :key="i"

                @click="goToModificationMenu(i, item)"
              >       
                <v-list-item-content >
                  <v-list-item-title  v-text="item"></v-list-item-title>
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

  export default {

    components: {
      CalendarResume,
    },

    data (){
      return{
        menuToValide: ['21/02 - 27/02','28/02 - 6/03'],
        menuToSuggest: ['7/03 - 13/03 ']
      }
    },

    methods:{
      goToModificationMenu(key , item){        
        this.$router.push({name:'MenuModification', query: {id: key, periode: item}});    
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
