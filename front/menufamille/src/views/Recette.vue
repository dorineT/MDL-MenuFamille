<template>
    <div class="cardmargin ">
        <v-container fluid fill-height>
            <v-row justify="center" >
                <v-col cols="12" sm="12" md="12" lg="10" xl="10">
                    <v-alert  type="error" border="left" color="red" dismissible v-if="error">
                            {{message.message}}
                    </v-alert>
                    <v-card >
                        <h2>Carnet de recette</h2>
                    </v-card>
                </v-col>

                <v-col cols="12" sm="12" md="12" lg="10" xl="10" >
                    
                    <v-card tile flat v-if="!loadingRecipe" class="d-flex transparent"  style="overflow-y: auto; overflow-x: hidden;" :height="ContainerHeight">
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
let DAORecette = new RecetteDAO()

export default{
    components: {
      RecipeCard, loadingAvocado
    },
    data(){
        return{
            recipe: [],
            loadingRecipe: false,
            message: "",
            error: false,
        }
    },
    created(){
      this.loadingRecipe = true
    },
    mounted(){
        
      this.fetchRecipe()
        
    },
    computed: {
        ContainerHeight () {

            let x = 200
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
      }
    }
}
</script>

<style lang="sass">
@import "../style/globalStyle"
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