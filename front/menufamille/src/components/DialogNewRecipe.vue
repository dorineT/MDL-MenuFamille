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
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="6" lg="6" xl="12">
                  
                  <v-autocomplete
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
                <v-col cols="12" sm="6" md="6" lg="6" xl="12">
                  
                  <v-autocomplete
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
    }
}
</script>

<style lang="sass">
@import "../style/globalStyle"
</style>