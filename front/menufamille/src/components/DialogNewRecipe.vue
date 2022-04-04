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
          <v-toolbar dark color="#FFB74D">
            <v-card-title>Nouvelle une recette</v-card-title>
          </v-toolbar>

          <v-card-text>
            <v-container fluid>
              <v-row>
                <v-col cols="12" sm="6" md="6" lg="6" xl="12">
                  <v-text-field
                    v-model="name"
                    label="Nom"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6" lg="6" xl="12">
                  <v-text-field
                    v-model="nbPers"
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
                    :filter="filter"
                    :hide-no-data="!search"
                    :items="items"
                    :search-input.sync="search"
                    hide-selected
                    clearable
                    multiple
                    small-chips
                    solo
                  >
                    <template v-slot:no-data>
                      <v-list-item>
                        <span class="subheading">Create</span>
                        <v-chip
                          :color="`${colors[nonce - 1]} lighten-3`"
                          label
                          small
                        >
                          {{ search }}
                        </v-chip>
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
                          {{ item.text }}
                        </span>
                        <v-icon
                          small
                          @click="parent.selectItem(item)"
                        >
                          $delete
                        </v-icon>
                      </v-chip>
                    </template>
                    <template v-slot:item="{ index, item }">
                      <v-text-field
                        v-if="editing === item"
                        v-model="editing.text"
                        autofocus
                        flat
                        background-color="transparent"
                        hide-details
                        solo
                        @keyup.enter="edit(index, item)"
                      ></v-text-field>
                      <v-chip
                        v-else
                        :color="`${item.color} lighten-3`"
                        dark
                        label
                        small
                      >
                        {{ item.text }}
                      </v-chip>
                      <v-spacer></v-spacer>
                      <v-list-item-action @click.stop>
                        <v-btn
                          icon
                          @click.stop.prevent="edit(index, item)"
                        >
                          <v-icon>{{ editing !== item ? 'mdi-pencil' : 'mdi-check' }}</v-icon>
                        </v-btn>
                      </v-list-item-action>
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
                          class="mb-2 ml-2 d-inline-block"
                          v-for="(ingredient, index) in currentIngredients"
                          :key="index"
                        >
                          {{ ingredient.name }}
                          <v-text-field                                                        
                            @input="updateQuantity(index, $event.target.value)"
                            :value="ingredient.quantity"
                            placeholder="200g, 20ml.."
                            required
                            width="10px"
                            class=""
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
                    
                    color="red lighten-3"

                    hover
                    length="5"
                    size="40"
                    value="2.5"
                  ></v-rating>
                </v-col>

                <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                  <v-text-field                   
                    label="Url de l'image"
                    
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                  <v-card>
                    <v-card-title>Préparation</v-card-title>
                    <v-card-text>
                      <v-form>
                        <div
                          class="mb-2"
                          v-for="(step, index) in currentSteps"
                          :key="index"
                        >
                          <label class="mr-3">{{ step.step }}</label>
                          <input
                            type="text"
                            class="form-control form-control-sm mr-3"
                            @input="updateSteps(index, $event.target.value)"
                            :value="step.description"
                            placeholder="Mix the ingredients.."
                            style="width: 80%"
                            required
                          />
                          <button
                            class="btn btn-sm custom-btn-secondary mr-2"
                            @click="addStep(index, $event)"
                            v-if="index != 0 && index == currentSteps.length - 1"
                          >
                            +
                          </button>
                          <button
                            class="btn btn-sm custom-btn-primary"
                            @click="removeStep(index, $event)"
                            v-if="index != 0 && index != currentSteps.length"
                          >
                            -
                          </button>
                        </div>
                      </v-form>
                    </v-card-text>
                  </v-card>
                </v-col>

              </v-row>


            </v-container>
          </v-card-text>

          <v-card-actions>
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
let DAOTag = new TagDAO()

export default {
  
    props:['dialogNewRecipe'],
    data() {
        return {
          tagsListe: [],
          tagsChoix:[],
          recipe: {
            name: "",
            nbPers: null,
            note: "",
            category: "",
            image:
              "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80",
            units: "",
            time: "",
            likes: "",
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
          selectedCategory: "sucré",
          categories: [
            { name: "Sucré", value: "sucré" },
            { name: "Salé", value: "salé" },
            { name: "Dessert", value: "dessert" },
            { name: "Plat", value: "plat" },
            { name: "Entrée", value: "entrée" },
          ],


          //combobox
          activator: null,
          attach: null,
          colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
          editing: null,
          editingIndex: -1,
          items: [
            { header: 'Select an option or create one' },
            {
              text: 'Foo',
              color: 'blue',
            },
            {
              text: 'Bar',
              color: 'red',
            },
          ],
          nonce: 1,
          menu: false,
          model: [
            {
              text: 'Foo',
              color: 'blue',
            },
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
        handleSubmitForm() {
          let apiURL = "https://oishi-recipes.herokuapp.com/api/add";
          this.recipe.ingredients = this.currentIngredients;
          this.recipe.category = this.selectedCategory;
          this.recipe.steps = this.currentSteps;
          console.log(this.recipe);
          axios
            .post(apiURL, this.recipe)
            .then(() => {
              this.$router.push("/");
            })
            .catch((error) => {
              console.log(error);
            });
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
      edit (index, item) {
        if (!this.editing) {
          this.editing = item
          this.editingIndex = index
        } else {
          this.editing = null
          this.editingIndex = -1
        }
      },
      filter (item, queryText, itemText) {
        if (item.header) return false

        const hasValue = val => val != null ? val : ''

        const text = hasValue(itemText)
        const query = hasValue(queryText)

        return text.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      },
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
        }
    },
  watch: {
    model (val, prev) {
      if (val.length === prev.length) return

      this.model = val.map(v => {
        if (typeof v === 'string') {
          v = {
            text: v,
            color: this.colors[this.nonce - 1],
          }

          this.items.push(v)

          this.nonce++
        }

        return v
      })
    },
  },

}
</script>

<style lang="sass">
@import "../style/globalStyle"
</style>