<template>
    <v-dialog       
        v-model="dialogNewRecipe"
        @click:outside="closeDialogueEvent"
        @keydown.esc="closeDialogueEvent"
        :max-width="width"                
        transition="dialog-transition"
        scrollable
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
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6" lg="6" xl="12">
                  <v-text-field
                    v-model="recipe.nbPers"
                    label="Nombre de personnes"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6" lg="6" xl="12">
                  
                  <v-autocomplete
                  required
                  label="Catégories"
                    chips
                    clearable
                    deletable-chips
                    multiple
                    :items="tagsListe"
                    item-text="nom"
                    item-value="id_tag"
                    return-object
                    v-model="tagsChoix"
                    color="orange lighten-2"
                    no-data-text="Aucune catégorie correspondante"
                  ></v-autocomplete>
                  
                </v-col>
                <v-col cols="12" sm="6" md="6" lg="6" xl="12">
                  
                  <v-autocomplete
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
                    color="orange lighten-2"
                    no-data-text="Aucun tag correspondant"
                  ></v-autocomplete>
                  
                </v-col>

                <!--Ingredients-->
                <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                   <v-combobox
                   label="Ingrédients"
                    v-model="model"
                    auto-select-first
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
                    solo                    
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
                      Quantité
                    </v-card-title>
                    <v-card-text class="d-flex">
                      <v-form>

                        <div
                          class="ml-6 d-inline-block"
                          v-for="(ingredient, index) in currentIngredients"
                          :key="index"
                        >
                          {{ ingredient.name }}
                          <v-text-field                                                        
                            @input="updateQuantity(index, $event.target.value)"
                            :value="ingredient.quantity"
                            placeholder="200g, 20ml.."
                            required                           
                            class="text-field-witdth"
                          ></v-text-field>
                        </div>
                      </v-form>
                    </v-card-text>
                  </v-card>
                </v-col>


                <!--durees etc-->

                <v-col cols="12" sm="4" md="4" lg="4" xl="4">
                  <v-text-field                   
                    label="Temps de préparation"
                    required
                  ></v-text-field>
                </v-col>

                 <v-col cols="12" sm="4" md="4" lg="4" xl="4">
                  <v-text-field                   
                    label="Temps de cuisson"
                    required
                  ></v-text-field>
                </v-col>
                 <v-col cols="12" sm="4" md="4" lg="4" xl="4">
                   Difficulté
                  <v-rating                
                    color="green lighten-3"
                    hover
                    length="5"
                    size="40"
                    :value="2"
                  ></v-rating>
                </v-col>

                <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                  <v-text-field                   
                    label="Url de l'image"
                    
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
                                @input="updateSteps(index, $event.target.value)"
                                v-model="step.description"
                                :label="'Etape '+step.step"
                                placeholder="Verser la farine dans un bol ..."                           
                                required
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
            <v-btn rounded class="colorbtnGreen">
              Créer
            </v-btn>
          </v-card-actions>

        </v-card>
    </v-dialog>
</template>

<script>
import TagDAO from '../services/api.tag';
import DenreeDao from '../services/api.denree';
let DAOTag = new TagDAO()
let DAODenree = new DenreeDao()

export default {
  
    props:['dialogNewRecipe'],
    data() {
        return {
          tagsListe: [],
          tagsChoix:[],
          recipe: {
            nom: null,
            nbPers: null,
            image: null,
            ingredients: [],
            steps: [],
          },
          currentIngredients: [
            { name: "beurre", quantity: "200g" },
            { name: "farine", quantity: "100g" },
          ],
          currentSteps: [
            { step: 1, description: "Faire fondre le beurre." },
            { step: 2, description: "Mélanger avec la farine." },
          ],


          //combobox
          activator: null,
          attach: null,
          colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
          items: [
            { header: 'Rechercher votre ingrédient' }
          ],
          nonce: 1,        
          model: [
          ],
          x: 0,
          search: null,
          y: 0,
        };
      },

    
    async created(){
      this.tagsListe = await DAOTag.getAll()	
    },


    methods:{
        closeDialogueEvent(){
            this.$emit('closeDialogNewRecipe')
        },
        addTag: function (event) {
          event.preventDefault();
          // trim deletes extra whitespaces at the beginning and the end of the string
          var tag = event.target.value;
          if (tag.length > 0) {
            tag = tag.replace(" ", "-");
            this.currentIngredients.push({ name: tag, quantity: "none" });
            //this.$set(this.recipe.ingredients, tag, "");
            event.target.value = "";
          }
        },
        removeTag: function (index) {
          this.currentIngredients.splice(index, 1);
          //this.$delete(this.recipe.ingredients, ingredient)
        },
        removeLastTag: function (event) {
          if (event.target.value.length === 0) {
            this.removeTag(this.currentIngredients.length - 1);
          }
        },
        updateQuantity(index, value) {
          this.$set(this.currentIngredients[index], "quantity", value);
        },
        addStep(index, event) {
          event.preventDefault();
          this.currentSteps.push({ step: index + 2, description: "" });
        },
        removeStep(index, event) {
          event.preventDefault();
          let toChange = this.currentSteps.slice(index + 1);
          toChange.forEach((el) => {
            el.step--;
          });
          this.currentSteps.splice(index + 1, 1);
        },
        updateSteps($event, value) {
          this.$set(this.currentSteps[$event], "description", value);
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
      getColor(){
        if( this.nonce > this.colors.length ) this.nonce = 0
        let color = this.colors[this.nonce]
        this.nonce ++
        return color
      }
    },
    watch: {
      //select couleur pour badge ingredient new ingredient
      model (val, prev) {
        if (val.length === prev.length) return

        this.model = val.map(v => {
          let product = {}
          console.log('map')
          console.log(v)          

          switch(typeof v){
            case 'string': 
              DAODenree.findCreateProduct(v).then(
                (response) =>{
                  product = response.data[0]
                  if (product !== null) {
              
                    product.color= this.colors[this.nonce - 1],               
                    v = structuredClone(product)
                    this.model.push(product)
                    this.items.push(product)                    
                    this.nonce++
                    console.log(v)
                    return v
                  }
                },
                (error) => {
                  alert('erreur lors de la création de l\'ingrédient')
                  return
                }
              ); break;
              default:
                console.log(v)
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
              this.items = []
              denrees.forEach(element => {
                element.color = this.colors[this.nonce - 1]
                this.nonce++
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
    },
}
</script>

<style lang="sass">
@import "../style/globalStyle"
</style>