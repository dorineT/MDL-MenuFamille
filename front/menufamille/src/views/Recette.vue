<template>
    <div class="cardmargin ">
      <dialog-new-recipe :dialogNewRecipeProps="showDialogueNewRecipe" @closeDialogNewRecipe="closeDialogNewRecipe" />
        <v-container fluid fill-height>
            <v-row justify="center" >
                <v-col cols="12" sm="12" md="12" lg="10" xl="10">
                    <v-card >
                        <v-card-title>
                          Carnet de recettes
                        </v-card-title>
                        <v-card-actions  >
                          <v-btn rounded small class="colorbtnGreen" @click="newRecipe">Nouvelle recette</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>

                <v-col cols="12" sm="12" md="12" lg="10" xl="10" >
                    

                    <v-card tile flat class="d-flex transparent parentClass"  :height="ContainerHeight">
                        <v-row >

                            <v-col v-for="(item,i) in recipe" :key="i" 
                                cols="12" sm="6" md="4" lg="3" xl="3"
                                >
                                <!-- nom de recette -->
                                  <v-lazy
                                  :options="{
                                      threshold: 0.25
                                  }"
                                  height="400px"
                                  transition="fade-transition">
                                  <recipe-card  :recipe="item"></recipe-card>
                               </v-lazy>  
                                
                            </v-col> 
                      
                        </v-row>    
                        
                    </v-card>                 
                   
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import RecetteDAO from '../services/api.recette'
import RecipeCard from '../components/RecipeCard.vue'
import DialogNewRecipe from '../components/DialogNewRecipe.vue'
import FavorisDao from '../services/api.favoris'
let DAORecette = new RecetteDAO()
let DAOFavoris = new FavorisDao()

export default{
    components: {
      RecipeCard, DialogNewRecipe
    },
    data(){
        return{
            recipe: [],
            favoris: [],
            showDialogueNewRecipe: false
        }
    },
    mounted(){
        
      this.fetchRecipe()
        
    },
    computed: {
        ContainerHeight () {

            let x = 350
            switch (this.$vuetify.breakpoint.name) {
                case 'xs': return this.$vuetify.breakpoint.height - x
                case 'sm': return this.$vuetify.breakpoint.height - x
                case 'md': return this.$vuetify.breakpoint.height - x
                case 'lg': return this.$vuetify.breakpoint.height - x
                case 'xl': return this.$vuetify.breakpoint.height - x
            }
      },
    },
    methods:{      
      fetchRecipe(){
        DAORecette.getAll().then(
          (response) => {
            this.recipe = response.data

            DAOFavoris.getAll().then(
              (response)=>{
                this.favoris = response.data              
                console.log(this.favoris)
                this.recipe.forEach(element => {
                  let isIn = this.favoris.some(id => id.id_recette === element.id_recette)
                  if(isIn){
                    element.isFavoris = 1
                  }else{
                    element.isFavoris = 0
                  }
                   
                });
              }
            )
          }
        )

      },
      newRecipe(){
        //show modal      
        this.showDialogueNewRecipe = true
      },
      closeDialogNewRecipe(newItem){
        console.log(newItem)
        if(newItem !== null){
          this.recipe.push(newItem)
        }
        this.showDialogueNewRecipe = false
      }
    },
}
</script>

<style lang="sass">
@import "../style/globalStyle"

.parentClass
  overflow-y: auto
  overflow-x: hidden
  position: static

</style>

<style>
    ::-webkit-scrollbar {
        width: 20px;        
    }
 
    /* Track */
    ::-webkit-scrollbar-track {
      background-color: transparent;
    }
 
    /* Handle */

    ::-webkit-scrollbar-thumb {
      background-color: #d6dee1;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #d6dee1;
      border-radius: 20px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #d6dee1;
      border-radius: 20px;
      border: 6px solid transparent;
      background-clip: content-box;
    }
</style>