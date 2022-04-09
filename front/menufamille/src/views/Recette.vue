<template>
    <div class="cardmargin ">
      <dialog-new-recipe :dialogNewRecipeProps="showDialogueNewRecipe" @closeDialogNewRecipe="closeDialogNewRecipe" />
        <v-container fluid fill-height>
            <v-row justify="center" >
                <v-col cols="12" sm="12" md="12" lg="10" xl="10">
                    <v-alert  type="error" border="left" color="red" dismissible v-if="error">
                            {{message.message}}
                    </v-alert>
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
                    
                    <v-card tile flat v-if="!loadingRecipe" class="d-flex transparent parentClass"  :height="ContainerHeight">
                        <v-row >

                            <v-col v-for="(item,i) in recipe" :key="i" 
                                cols="12" sm="6" md="4" lg="3" xl="3"
                                >
                                <!-- nom de recette -->
                                  <v-lazy
                                  :options="{
                                      threshold: 0.25
                                  }"
                                  height="350px"
                                  transition="fade-transition">
                                  <recipe-card  :recipe="item" @transmitError="receivedError"></recipe-card>
                               </v-lazy>  
                                
                            </v-col> 
                      
                        </v-row>    
                        
                    </v-card> 

                    <loading-avocado v-else></loading-avocado>                   
                   
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import RecetteDAO from '../services/api.recette'
import RecipeCard from '../components/RecipeCard.vue'
import loadingAvocado from '../components/loadingAvocado.vue'
import DialogNewRecipe from '../components/DialogNewRecipe.vue'
let DAORecette = new RecetteDAO()

export default{
    components: {
      RecipeCard, loadingAvocado, DialogNewRecipe
    },
    data(){
        return{
            recipe: [],
            loadingRecipe: false,
            showDialogueNewRecipe: false,
            message: "",
            error: false,
        }
    },
    mounted(){
      this.loadingRecipe = true
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
      receivedError(message){
        console.log('received error recette')
        
        this.message = message
        this.error = true
        this.recipe=[]
        this.loadingRecipe = true
        this.fetchRecipe()
      },      
      fetchRecipe(){
        DAORecette.getAll().then(
          (response) => {
            console.log(response)
            this.recipe = response.data
            this.loadingRecipe = false
            this.error = false
            console.log(this.error)
          },
          (error) => {
            this.error = true;
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
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
    }
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