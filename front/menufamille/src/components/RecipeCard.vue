<template>
      <v-card @click="showInfo" class="card-recipe" >
        <v-card-title primary-title>                                        
          <v-container>
              <v-row>
                <v-col   cols="8" sm="9" md="9" lg="10" xl="10">
                  <h3 class="headline mb-0 spanTitle">{{recipe.nom}}</h3> 
                </v-col>
                <v-col cols="1" sm="1" md="1" lg="1" xl="1">
                  <v-rating v-if="recipe.isFavoris==1"                               
                    hover
                    length="1"
                    size="30"
                    color="yellow"
                    :value="recipe.isFavoris"          
                    readonly
                  >
                  </v-rating>   
                </v-col>
              </v-row>  
            </v-container>                                                                               
        </v-card-title>
        <v-card-text  style="height: 240px">
            <v-row class="d-flex justify-center">
                  <v-img v-if="recipe.url_image !== null"
                  style="border-radius: 20px"               
                  :aspect-ratio="16/9"                  
                  contain
                  max-width="229"
                  :src="recipe.url_image"
                ></v-img>
                  <v-img v-else                 
                  :aspect-ratio="16/9"                  
                  contain
                  max-width="229"
                  src="../assets/platNone.jpg"
                ></v-img>
            </v-row>
             <v-row>
                <v-col class="d-flex flex-wrap">
                       <v-chip-group
                        active-class="primary--text"
                        column
                                                    
                      >
                        <v-chip
                          v-for="tag in recipe.tags"
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
        <v-card-actions style="height: 70px">
                                        
           <v-row justify="end" class="pa-4" >
            <v-col class="d-flex flex-wrap">
                   <v-chip-group
                    active-class="primary--text"
                    column
                                                    
                  >
                    <v-chip
                      v-for="categorie in recipe.categories"
                      :key="categorie.id_categorie"
                      color="orange lighten-2"
                    >
                      {{ categorie.periode }}
                    </v-chip>
                  </v-chip-group>
            </v-col>                                                   
           </v-row>
        </v-card-actions>
      <recipe-info :id_recette="recipe.id_recette" :dialogInfoRecipe="showDialogueInfoRecipe" @closeDialog="closeDialog"/>
    </v-card>
</template>

<script>
import RecipeInfo from '../components/RecipeInfo.vue'
export default {
    components:{
        RecipeInfo
    },
    props: ['recipe','isFavoris'],
    data(){
        return{
            showDialogueInfoRecipe: false            
        }
    },
    methods:{
        showInfo(){            
            this.showDialogueInfoRecipe = true
        },
        closeDialog(){           
            this.showDialogueInfoRecipe = false    
        }
    }
}
</script>

<style lang="sass"> 
  
.card-recipe 
  margin: 20px !important
  margin-right: 5px !important
  margin-left: 5px !important
  transition: transform .2s

  .spanTitle
    width: 100% 
    display: inline-block
    text-overflow: ellipsis
    overflow: hidden
    white-space: nowrap

  &:hover
    box-shadow: 0 5px 20px 0 #9CCC65, 0 6px 20px 0 #9CCC65 !important
    transform: scale(1.1)
    z-index: 1
    //position: absolute
    

    .spanTitle
      white-space: pre-wrap !important
      word-break: break-word !important
</style>