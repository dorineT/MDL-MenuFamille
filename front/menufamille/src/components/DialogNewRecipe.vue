<template>
    <v-dialog       
        v-model="dialogNewRecipeProps"
        @click:outside="closeDialogueEvent"
        @keydown.esc="closeDialogueEvent"
        :max-width="width"                
        transition="dialog-transition"
        scrollable
    >
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-card>
        <v-toolbar dark color="#9CCC65">
          <v-card-title>Nouvelle une recette</v-card-title>
        </v-toolbar>

        <v-card-text>
          <v-container fluid>
            <v-row>
              <v-col cols="12" sm="6" md="6" lg="6" xl="12">
                <v-text-field
                  v-model="recipe.nom"
                  label="Nom"
                  required
                  :rules="ruleRequired"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6" xl="12">
                <v-text-field
                  v-model="recipe.nbPers"
                  label="Nombre de personnes"
                  required
                  type="number"
                  :rules="ruleRequired"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="6" lg="6" xl="12">
                  
                <v-autocomplete
                :rules="ruleRequired"
                required
                label="Catégories"
                  chips
                  clearable
                  deletable-chips
                  multiple
                  :items="categorieListe"
                  item-text="periode"
                  item-value="id_categorie"
                  return-object
                  v-model="categorieChoix"
                  color="green lighten-2"
                  no-data-text="Aucune catégorie correspondante"
                ></v-autocomplete>
                  
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6" xl="12">
                  
                <v-autocomplete
                  :rules="ruleRequired"
                  required
                  label="Tags"
                  chips
                  clearable
                  deletable-chips
                  multiple
                  :items="tagsListe"
                  item-text="nom"
                  item-value="id_tag"
                  return-object
                  v-model="tagsChoix"
                  color="green lighten-2"
                  no-data-text="Aucun tag correspondant"
                ></v-autocomplete>
                  
              </v-col>

              <!--Ingredients-->
              <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                 <v-combobox
                :rules="ruleRequired"
                 label="Ingrédients"
                  v-model="currentIngredients"                   
                 :filter="filter"
                  :hide-no-data="!search"
                  :items="items"
                  :search-input.sync="search"
                  item-text="nom"
                  return-object
                  hide-selected
                  clearable
                  multiple
                  small-chips
                  rounded                  
                  required                  
                >
                  <template v-slot:no-data>
                    <v-list-item v-if="search !== null && search.length > 2">
                      <span class="subheading mr-2">Nouvel ingrédient</span>
                      <v-chip
                        color="green lighten-3"
                        label
                        small
                      >
                        {{ search }}
                      </v-chip>
                    </v-list-item>
                  <v-list-item v-else>
                      <span class="subheading mr-2">Veuillez entrer un ingrédient</span> 
                    </v-list-item>
                  </template>
                  <template v-slot:selection="{ attrs, item, parent, selected }">
                    <v-chip
                      v-if="item === Object(item)"
                      v-bind="attrs"
                      :color="`${item.color} lighten-3`"
                      :input-value="selected"
                      label
                      small
                    >
                      <span class="pr-2">
                        {{ item.nom }}
                      </span>
                      <v-icon
                        small
                        @click="parent.selectItem(item)"
                      >
                        $delete
                      </v-icon>
                    </v-chip>
                  </template>
                  <template v-slot:item="{ item }">

                    <v-chip                      
                      :color="`${item.color} lighten-3`"
                      dark
                      label
                      small
                    >
                      {{ item.nom }}
                    </v-chip>                     

                  </template>
                </v-combobox>
              </v-col>

              <!--quantite des ingredients-->
              <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                <v-card>
                  <v-card-title>
                    Quantités
                  </v-card-title>
                  <v-card-text class="d-flex">
                    <v-form>
                      <div
                        class="ml-6 d-inline-block"
                        v-for="(ingredient, index) in currentIngredients"
                        :key="index"
                      >
                      <div v-if="ingredient !== undefined">
                        {{ ingredient.nom }}<br>
                        <div class="d-inline-flex">
                          <v-text-field   
                            :rules="ruleRequired"                                                    
                            :value="ingredient.quantite"
                            @blur="updateQuantity(index,$event.target.value)"
                            placeholder="200"
                            type="number"
                            required                           
                            class="text-field-width-small mr-3"
                          ></v-text-field>
                          <v-autocomplete
                          auto-select-first
                          :rules="ruleRequired"
                          required
                          placeholder="gr,ml,.."     
                            class="text-field-width-small"                                            
                            @blur="updateMesure(index,$event.target.value)"
                            :input="ingredient.mesure"
                            :items="mesureListe"                          
                            color="green lighten-2"
                            no-data-text="Aucune mesure correspondante"
                          ></v-autocomplete>
                        </div>
                      </div>
                      </div>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-col>


              <!--durees etc-->

              <v-col cols="6" sm="4" md="4" lg="4" xl="4">
                <v-text-field    
                  :rules="ruleRequired"               
                  label="Temps de préparation"
                  v-model="recipe.preparationTime"             
                  required
                  prepend-icon="mdi-account-clock-outline"
                  type="time"
                ></v-text-field>
              </v-col>

               <v-col cols="6" sm="4" md="4" lg="4" xl="4">
                <v-text-field                   
                  label="Temps de cuisson"  
                  :rules="ruleRequired"
                  v-model="recipe.cuissonTime"              
                  required
                  prepend-icon="mdi-clock-time-ten-outline"
                  type="time"
                ></v-text-field>
              </v-col>
               <v-col cols="12" sm="4" md="4" lg="4" xl="4">
                 Difficulté
                <v-rating                                   
                  hover
                  length="5"
                  size="40"
                  :value="recipe.difficulte"
                  required
                  
                >
                  <template v-slot:item="props">
                    <v-icon
                      :color="props.isFilled ? 'green lighten-3' : 'grey lighten-1'"
                      large
                      @click="props.click"
                    >
                      {{ props.isFilled ? 'mdi-chef-hat' : 'mdi-chef-hat' }}
                    </v-icon>
                  </template>
                </v-rating>
              </v-col>

              <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                <v-text-field                   
                  label="Url de l'image"
                    v-model="recipe.image"
                ></v-text-field>
              </v-col>

              <!--preparation de la recette -->
              <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                <v-card>
                  <v-card-title>Préparation</v-card-title>
                  <v-card-text>
                    <v-form>
                      <v-container fluid>
                        <v-row 
                          v-for="(step,index) in currentSteps"
                          :key="index"
                        >
                           <v-col cols="9" sm="9" md="9" lg="9" xl="9">
                            <v-text-field
                              dense
                              outlined
                              rounded                        
                              @blur="updateSteps(index, $event.target.value)"                                
                              :value="step.description"
                              :label="'Etape '+step.step"
                              placeholder="Verser la farine dans un bol ..."                           
                              required
                              :rules="ruleRequired"
                            ></v-text-field>

                          </v-col>
                          <v-col cols="2" sm="2" md="2" lg="2" xl="2">
                            <v-btn-toggle>
                              <v-btn 

                                small
                                dark
                                fab  
                                class="colorbtnGreen"
                                                           
                                @click="addStep(index, $event)"
                                v-if="index != 0 && index == currentSteps.length - 1"
                              >
                                <v-icon>mdi-plus-thick</v-icon>
                              </v-btn>
                              <v-btn
                              small
                              dark
                              fab
                                class="colorbtnOrange"
                                  
                                @click="removeStep(index, $event)"
                                v-if="index != 0 && index != currentSteps.length"
                              >
                                <v-icon>mdi-minus-thick</v-icon>                                  
                              </v-btn>
                                
                            </v-btn-toggle>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-col>

            </v-row>


          </v-container>
        </v-card-text>

        <v-card-actions class="pa-3">
          <v-btn rounded color="grey">
            Annuler
          </v-btn>
          <v-btn rounded class="colorbtnGreen" @click="validation">
            Créer
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-form>
    </v-dialog>
</template>

<script>
import TagDAO from '../services/api.tag';
import DenreeDao from '../services/api.denree';
import CategorieDao from '../services/api.categorie'
let DAOTag = new TagDAO()
let DAODenree = new DenreeDao()
let DAOCategorie = new CategorieDao()

export default {
  
    props:['dialogNewRecipeProps'],
    data() {
        return {
          mesureListe:['cr','gr','kg','ml','cl','dl','L','cm','mm'],
          categorieListe: [],
          valid: false,
          tagsListe: [],
          tagsChoix:[],
          categorieChoix: [],
          recipe: {
            nom: null,
            nbPers: null,
            image: null,
            ingredients: [],
            steps: [],
            preparationTime: null,
            cuissonTime: null,
            difficulte: 0
          },
          currentSteps: [
            { step: 1, description: "Faire fondre le beurre." },
            { step: 2, description: "Mélanger avec la farine." },
          ],

          ruleRequired: [v => !!v || 'Champs requis'],

          //combobox
          activator: null,
          attach: null,
          colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
          items: [
            { header: 'Rechercher votre ingrédient' }
          ],
          nonce: 1,        
          currentIngredients: [],        
          x: 0,
          search: null,
          y: 0,
        };
      },

    methods:{
        closeDialogueEvent(){
            this.$emit('closeDialogNewRecipe')
        },
        updateQuantity(index, value) {
          console.log("update quantity "  + value)                   
          this.$set(this.currentIngredients[index], "quantite", value);
        },
        updateMesure(index, value) {
          console.log("update mesure ")                      
          this.$set(this.currentIngredients[index], "mesure", value);
        },
        addStep(index, event) {
          event.preventDefault();
          this.currentSteps.push({ step: index + 2, description: "" });
        },
        removeStep(index, event) {
          //delete le step
          //decaler les autres steps 1,2,3
          event.preventDefault();
          let copyStep = structuredClone(this.currentSteps)
          copyStep.splice(index,1)      
          let newStep = index+1
          for(let i=index; i< copyStep.length; i++){
            copyStep[i].step = newStep
            newStep+=1
          }        
          this.currentSteps = structuredClone(copyStep)
        },
        updateSteps(index, value) {          
          this.$set(this.currentSteps[index], "description", value);
        },
        //combobox

      filter (item, queryText, itemText) {
        if (item.header) return false

        const hasValue = val => val != null ? val : ''

        const text = hasValue(itemText)
        const query = hasValue(queryText)

        return text.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      },
      getColor(){       
        if( this.nonce > this.colors.length ) this.nonce = 0
        let color = this.colors[this.nonce]
        this.nonce ++
        return color
      },
      validation(){
        console.log('submit form')
        this.$refs.form.validate()
      }
    },
    computed: {
        width() {
            let x = 100;
            switch (this.$vuetify.breakpoint.name) {
                case "xs":
                    return this.$vuetify.breakpoint.width - x;
                case "sm":
                    return this.$vuetify.breakpoint.width - x;
                case "md":
                    return this.$vuetify.breakpoint.width - x;
                case "lg":
                    return this.$vuetify.breakpoint.width - x * 2;
                case "xl":
                    return this.$vuetify.breakpoint.width - x * 3;
            }
        },
    },
    watch: {
      dialogNewRecipeProps(){        
        if(this.dialogNewRecipeProps){
          DAOTag.getAll().then(
            (response) =>{
              this.tagsListe = response.data              
            }
          )

          DAOCategorie.getAll().then(
            (response) =>{
              this.categorieListe = response.data
            }
          )
        }
        //fetch categorie
      },
      //select couleur pour badge ingredient new ingredient
      currentIngredients (val, prev) {     
        if (val.length === prev.length) return

        this.currentIngredients = val.map(v => {
          let product = {}       

          switch(typeof v){
            case 'string': 
              DAODenree.findCreateProduct(v).then(
                (response) =>{
                  product = response.data[0]
                  if (product !== null) {
              
                    product.color= this.colors[this.nonce - 1],               
                    v = structuredClone(product)
                    this.currentIngredients.push(product)
                    this.items.push(product)                    
                    this.nonce++                  
                    return v
                  }
                },
                (error) => {
                  alert('erreur lors de la création de l\'ingrédient')
                  return
                }
              ); break;
              default:               
                return v 
          }                      
        })
      },
      //get from api
      search(){         
        if(this.search !== null && this.search.length === 3){            
          DAODenree.searchProduct(this.search).then(
            (response)=>{            
              let denrees = response.data            
              denrees.forEach(element => {
                element.color = this.getColor()
              });
              this.items = structuredClone(denrees)        
              this.items.push({header: 'Rechercher votre ingrédient'})
            },
            (error)=>{
              alert(error.message)
            }
          )          
        }
      }
    }
}
</script>

<style lang="sass">
@import "../style/globalStyle"
</style>
