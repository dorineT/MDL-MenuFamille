<template>
    <div class="cardmargin">
        <v-container fluid>
            <v-row justify="center" >
                <v-col cols="12" sm="12" md="12" lg="10" xl="10">
                    <v-card>
                        <h2>Carnet de recette</h2>
                    </v-card>
                </v-col>

                <v-col cols="12" sm="12" md="12" lg="10" xl="10" >
                    
                    <v-card tile flat v-if="!loadingRecipe" class="d-flex transparent" style="overflow-y: auto; overflow-x: hidden;" :max-height="ContainerHeight">
                        <v-row >
                            <v-col v-for="(item,i) in recipe" :key="i" 
                                cols="12" sm="6" md="4" lg="3" xl="3">
                                <!-- nom de recette -->
                                <v-card >
                                    <v-card-title primary-title>                                        
                                        <h3 class="headline mb-0">{{item.nom}}</h3>                                                                                    
                                    </v-card-title>
                                    <v-card-text style="height:100px">
                                        <v-row>
                                              <!--<v-img                                                  
                                              max-height="150"
                                              max-width="250"
                                              src="../assets/tiny_loader.gif"                         
                                            ></v-img>-->
                                            <v-icon size="70">
                                                mdi-food-turkey
                                            </v-icon>
                                            <v-col class="d-flex flex-wrap">
                                                   <v-chip-group
                                                    active-class="primary--text"
                                                    column
                                                    
                                                  >
                                                    <v-chip
                                                      v-for="tag in item.tags"
                                                      :key="tag.id_tag"
                                                      color="light-green lighten-2"
                                                    >
                                                      {{ tag.nom }}
                                                    </v-chip>
                                                  </v-chip-group>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                    <v-divider ></v-divider>
                                    <v-card-actions style="height:70px">
                                        
                                       <v-row justify="end" class="pa-4" >
                                        <v-col class="d-flex flex-wrap">
                                               <v-chip-group
                                                active-class="primary--text"
                                                column
                                                    
                                              >
                                                <v-chip
                                                  v-for="categorie in item.categories"
                                                  :key="categorie.id_categorie"
                                                  color="orange lighten-2"
                                                >
                                                  {{ categorie.periode }}
                                                </v-chip>
                                              </v-chip-group>
                                        </v-col>                                           
                                         <v-icon size="28">mdi-eye</v-icon>
                                       </v-row>
                                    </v-card-actions>
                                </v-card>  
                            </v-col>    
                        </v-row>    
                        
                    </v-card> 

                    <v-card v-else :max-height="ContainerHeight">
                        <v-card-text  align="center">
                               <v-img                                                  
                            max-height="250"
                              max-width="250"
                              src="../assets/tiny_loader.gif"                         
                            ></v-img>
                            <p style="font-size: 20px; margin-top:40px">Chargement en cours ...</p>
                        </v-card-text>
                    </v-card>                    
                   
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import RecetteDAO from '../services/api.recette'
let DAORecette = new RecetteDAO()

export default{
    data(){
        return{
            recipe: [],
            loadingRecipe: false
        }
    },
    async created(){
        this.loadingRecipe = true
        this.recipe = await DAORecette.getAll()
        this.loadingRecipe = false
    },
    computed: {
        ContainerHeight () {
            //return (this.$vuetify.breakpoint.height - 100)
            console.log(this.$vuetify.breakpoint.name)
            console.log((this.$vuetify.breakpoint.height - 100))
            console.log(this.$vuetify.breakpoint.height)
            switch (this.$vuetify.breakpoint.name) {
                case 'xs': return 220
                case 'sm': return this.$vuetify.breakpoint.height - 215
                case 'md': return this.$vuetify.breakpoint.height - 215
                case 'lg': return this.$vuetify.breakpoint.height - 215
                case 'xl': return this.$vuetify.breakpoint.height - 215
            }
      },
    },
}
</script>

<style lang="sass">
.cardmargin
  margin: 10px
  padding: 10px
  //opacity: 85%
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