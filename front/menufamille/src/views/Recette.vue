<template>
    <div class="cardmargin ">
      <dialog-new-recipe :dialogNewRecipeProps="showDialogueNewRecipe" @closeDialogNewRecipe="closeDialogNewRecipe" />
        <v-container fluid fill-height>
            <v-row justify="center" >
                <v-col cols="12" sm="12" md="12" lg="10" xl="10">
                    <v-card class="noPadding">
                        <v-card-title>
                          <v-row class="justify-end">
                            <v-col>
                              Carnet de recettes
                              
                            </v-col>
                            <v-col ><v-btn style="float: right" rounded small class="colorbtnGreen" @click="newRecipe">Nouvelle recette</v-btn></v-col>  
                          </v-row>
                        </v-card-title>
                        <v-card-text>                          
                            <v-row>
                              <v-col>                             
                                <v-text-field
                                  v-model="search"
                                  append-icon="mdi-magnify"
                                  label="recherche recette"
                                  color="orange lighten-2"
                                  single-line
                                  hide-details
                                  @keydown="filter"
                                  clearable
                                  @click:clear="() => {search=null; filter()}"
                                  >
                                </v-text-field>                        
                              </v-col>
                              <v-col>
                                <v-autocomplete
                                  v-model="categorieSearch"
                                  filled                      
                                  multiple
                                  rounded
                                  color="orange lighten-2"
                                  label="filtre catégorie"
                                  append-icon="mdi-filter-outline"
                                  :items="categories"
                                  @change="filter"
                                ></v-autocomplete>
                              </v-col>
                              <v-col>
                                <v-autocomplete
                                  v-model="tagsSearch"
                                  filled                      
                                  multiple
                                  rounded
                                  color="orange lighten-2"
                                  label="filtre tags"
                                  append-icon="mdi-filter-outline"
                                  :items="tags"
                                  @change="filter"
                                ></v-autocomplete>
                              </v-col>
                              <v-col>
                                 <v-checkbox
                                  v-model="favorisCheckBox"
                                  label="Favoris"   
                                  @change="filter"
                                  ></v-checkbox>
                              </v-col>
                            </v-row>                   
                        </v-card-text>
                    </v-card>
                </v-col>

                <v-col cols="12" sm="12" md="12" lg="10" xl="10" >
                    

                    <v-card tile flat class="d-flex transparent parentClass"  :height="ContainerHeight">
                        <v-row >

                            <v-col v-for="(item,i) in recipe" :key="i" 
                                cols="12" sm="4" md="3" lg="3" xl="3"
                                >
                                <!-- nom de recette -->
                                  <v-lazy
                                  :options="{
                                      threshold: 0.25
                                  }"
                                  height="400px"
                                  transition="fade-transition">
                                  <recipe-card  :recipe="item" @updateFavoris_recipeCard="updateList"></recipe-card>
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
import CategorieDao from '../services/api.categorie'
import TagDAO from '../services/api.tag'
let DAORecette = new RecetteDAO()
let DAOFavoris = new FavorisDao()
let DAOCategorie = new CategorieDao()
let DAOTag = new TagDAO()

export default{
    components: {
      RecipeCard, DialogNewRecipe
    },
    data(){
        return{
            recipeAll: [],
            recipe: [],
            favoris: [],
            showDialogueNewRecipe: false,

            //filtre
            search: null,
            favorisCheckBox: false,
            tagsSearch: [],
            categorieSearch: [],
            tags: [],
            categories: ['matin', 'midi','soir']

        }
    },
    async mounted(){        
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
            var recettesRes = response.data            
             DAOFavoris.getAll().then(
              (response)=>{
                this.favoris = response.data 
                
                for(let i =0; i< recettesRes.length ; i++){
                  let isIn = this.favoris.some(id => id.id_recette === recettesRes[i].id_recette)
                  if(isIn){
                    recettesRes[i].isFavoris = 1
                  }else{
                    recettesRes[i].isFavoris = 0
                  }
                   //get tags

                      recettesRes[i].tags.forEach( tag => {
                      if(!this.tags.includes(tag.nom)){
                        this.tags.push(tag.nom)
                      }
                    })
                  this.recipe = recettesRes
                  this.recipeAll = recettesRes
                }
            
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
        if(newItem !== null){
          this.recipe.push(newItem)
        }
        this.showDialogueNewRecipe = false
      },
      updateList(idRecette, favoris){
        let recette = this.recipe.find( el => el.id_recette === idRecette)
        recette.isFavoris = favoris
      },

      //filter
      filter(){         
          this.recipe = this.recipeAll.filter((elem) => (!this.favorisCheckBox) || elem.isFavoris === 1 )
          .filter((elem)=> (! (this.search !== null)) || elem.nom.toLowerCase().match(this.search.toLowerCase()))
          .filter((elem) => (! (this.categorieSearch.length > 0) || this.filterCategories(elem)))  
          .filter((elem) => (! (this.tagsSearch.length > 0) || this.filterTags(elem)))         

      },
      filterCategories(elem){  
        let catElem = []
        elem.categories.forEach(el => {catElem.push(el.periode)})
        return this.categorieSearch.every(el => catElem.includes(el))
      },
      filterTags(elem){  
        let tagElem = []
        elem.tags.forEach(el => {tagElem.push(el.nom)})
        return this.tagsSearch.every(el => tagElem.includes(el))
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