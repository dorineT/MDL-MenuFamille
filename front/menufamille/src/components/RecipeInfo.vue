<template>

  <v-dialog
    v-model="dialogInfoRecipe"
    @click:outside="closeDialogueEvent"
    @keydown.esc="closeDialogueEvent"
    :max-width="width"
    transition="dialog-transition"
  >
    <v-toolbar dark color="#FFB74D">


					<v-btn icon dark @click="$emit('closeDialog', false, message)">
						<v-icon>mdi-close</v-icon>
					</v-btn>
	</v-toolbar>
     <v-card >
            <v-card-text>
            <v-container fluid>
                <v-row>
                    <!--
                        col image
                        -->
                    <v-col cols="12" sm="5" md="5" lg="5" xl="5" style="position:fixed" class="media">
                        <v-img
                            v-if="recipe.url_image !== null"                            
                            style="border-radius: 60px"
                            :aspect-ratio="16 / 9"
                            contain                        
                            :width="widthImage"
                            max-width="500"  
                            :src="recipe.url_image"
                        ></v-img>
                        <v-img
                            v-else
                            :aspect-ratio="16 / 9"
                            contain
                            :width="widthImage"
                            max-width="500"  
                            src="../assets/platNone.jpg"
                        ></v-img>
                    </v-col>
                    <v-col cols="12" sm="5" md="5" lg="5" xl="5" class="media">
                        <v-row>
                            <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                                <v-img
                                    v-if="recipe.url_image !== null"
                                    style="border-radius: 60px; visibility: hidden;"
                                    :aspect-ratio="16 / 9"
                                    contain                        
                                    :width="widthImage"
                                    :src="recipe.url_image"                                  
                                ></v-img>
                                <v-img v-else
                                    :aspect-ratio="16 / 9"
                                    contain   
                                    :width="widthImage"
                                    max-width="500"          
                                    src="../assets/platNone.jpg"
                                    style="visibility: hidden;"
                                ></v-img>
                            </v-col>

                            <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                                <v-chip-group>
                                    <v-chip
                                        v-for="categorie in recipe.categories"
                                        :key="categorie.id_categorie"
                                        color="orange lighten-2"
                                    >
                                        {{ categorie.periode }}
                                    </v-chip>
                                </v-chip-group>
                            </v-col>

                            <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                                <v-chip-group>
                                    <v-chip
                                        v-for="tag in recipe.tags"
                                        :key="tag.id_tag"
                                        color="green lighten-2"
                                    >
                                        {{ tag.nom }}
                                    </v-chip>
                                </v-chip-group>
                            </v-col>

                        </v-row>
                       
                    </v-col>
                   

                    <!--texte-->
                    <v-col cols="12" sm="7" md="7" lg="7" xl="7" style="overflow: auto">
                        
                        <v-row>
                            <v-col>                             
                                    <h3 class="headline mb-0 font">{{ recipe.nom }}</h3>
                                
                            </v-col>

                        </v-row>                      
                        <v-row>
                            
                            <v-col>
                                <v-list dense>
                                    Ingrédients:
                                    <v-list-item
                                        v-for="(denree, i) in recipe.denrees"
                                        :key="denree.id_denree + 'denree' + i"
                                    >
                                        <v-list-item-icon
                                            ><v-icon v-text="iconBullet"></v-icon
                                        ></v-list-item-icon>
                                        <v-list-item-content
                                            >{{ denree.nom }}
                                            {{ denree.recette_denree.quantite }} gr</v-list-item-content
                                        >
                                    </v-list-item>
                                </v-list>
                            </v-col>
                            <v-col>
                                <div class="infos d-flex">
                                    <div class="custom-badge custom-badge-primary" id="time">
                                        Préparation
                                    </div>
                                    <div
                                        id="time-value"
                                        class="custom-badge custom-badge-primary-outline"
                                    >
                                        {{ transformTime(recipe.temps_preparation) }}
                                    </div>
                                </div>

                                <div class="d-flex infos">
                                    <div class="custom-badge custom-badge-primary" id="timeCuisson">
                                        Cuisson
                                    </div>
                                    <div
                                        id="time-valueCuisson"
                                        class="custom-badge custom-badge-primary-outline"
                                    >
                                        {{ transformTime(recipe.temps_cuisson) }}
                                    </div>
                                </div>

                                <div class="d-flex infos">
                                    <div
                                        class="custom-badge custom-badge-secondary"
                                        id="nbPersonne"
                                    >
                                        Personnes
                                    </div>
                                    <div
                                        id="value-nbPersonne"
                                        class="custom-badge custom-badge-secondary-outline"
                                    >
                                        {{ recipe.nb_personne }}
                                    </div>
                                </div>

                                <div class="d-flex infos">
                                    <div class="custom-badge custom-badge-secondary" id="calories">
                                        Calories
                                    </div>
                                    <div
                                        id="value-calories"
                                        class="custom-badge custom-badge-secondary-outline"
                                    >
                                        {{ recipe.calorie }} kcal
                                    </div>
                                </div>

                                <v-img
                                    v-if="recipe.nutriscore !== undefined"
                                    :aspect-ratio="16 / 9"
                                    contain
                                    max-width="120"
                                    :src="require('../assets/' + recipe.nutriscore + '.jpg')"
                                ></v-img>


                            </v-col>
                        </v-row>
                        <v-row>
                            <v-textarea
                                name="input-7-1"
                                filled
                                readonly
                                label="Préparation de la recette"
                                auto-grow
                                :value="recipe.preparation"
                            ></v-textarea>
                        </v-row>
                        
                    </v-col>
                </v-row>
                
            </v-container>
            </v-card-text>
        </v-card>
  </v-dialog>
</template>

<script>
import RecetteDAO from "../services/api.recette";
let DAORecette = new RecetteDAO();
import moment from "moment";
import vuetify from '../plugins/vuetify';

	export default {
		props: ["id_recette", "dialogInfoRecipe"],
		data() {
			return {
				iconBullet: "mdi-circle-small",
				message: "",
				recipe: {},              
			};
		},
		methods: {
            fetchData(){              
                DAORecette.getById(this.id_recette).then(
                    (response) => {
                        this.recipe = response.data;
                    },
                    (error) => {
                        this.message =
                            (error.response && error.response.data) ||
                            error.message ||
                            error.toString();

                        this.$emit("closeDialog", true, this.message);
                    }
                );
            },
			closeDialogueEvent() {			
				this.$emit("closeDialog", false, this.message);
			},
			//transforme des minutes en format 00:00
			transformTime(mins) {
				if (mins >= 24 * 60 || mins < 0) {
					throw new RangeError(
						"Valid input should be greater than or equal to 0 and less than 1440."
					);
				}
				var h = (mins / 60) | 0,
					m = mins % 60 | 0;

                console.log('heure : ' + h)
                console.log('minutes '  + m)
				return moment.utc().hours(h).minutes(m).format("HH:mm");
			},
		},
        watch:{
            dialogInfoRecipe(){
                if(this.dialogInfoRecipe !== null && this.dialogInfoRecipe){
                    this.fetchData()
                }
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
            widthImage() {
                console.log(this.$vuetify.breakpoint.width)
                console.log(this.$vuetify.breakpoint.name)
                let x = 100;
                switch (this.$vuetify.breakpoint.name) {
                    case "xs":
                        return 100
                        //return this.$vuetify.breakpoint.width - x;
                    case "sm":
                        
                        return 200;
                        //return this.$vuetify.breakpoint.width - x;
                    case "md":
                        if(this.$vuetify.breakpoint.width <= 1084) return 300
                        return 400
                        //return this.$vuetify.breakpoint.width - x;
                    case "lg":
                        return 450;
                        //return this.$vuetify.breakpoint.width - x * 2;
                    case "xl":
                        return 500;
                        //return this.$vuetify.breakpoint.width - x * 3;
                }
            },
			height() {
				let x = 0;
				switch (this.$vuetify.breakpoint.name) {
					case "xs":
						return this.$vuetify.breakpoint.height - x;
					case "sm":
						return this.$vuetify.breakpoint.height - x;
					case "md":
						return this.$vuetify.breakpoint.height - x;
					case "lg":
						return this.$vuetify.breakpoint.height - x;
					case "xl":
						return this.$vuetify.breakpoint.height - x;
				}
			},
		},
	};

</script>

<style lang="sass">
@import '../style/globalStyle'


@media (max-width: 601px)
  .media
    display: none
    

html
    overflow-y: auto

$primary: $colorGreen
$secondary: $colorOrange

.custom-badge
    display: block
    width: fit-content
    padding: 2px 7px
    margin-bottom: 10px
    color: white
    font-size: 15px
    border-radius: 15px

    &-primary
        background-color: $primary
        border: 2px solid $primary

        &-outline
            background-color: white
            border: 2px solid $primary
            color: $primary

    &-secondary
        background-color: $secondary
        border: 2px solid $secondary

        &-outline
            background-color: white
            border: 2px solid $secondary
            color: $secondary

.infos

    #time, #timeCuisson, #nbPersonne, #calories
        z-index: 1

    #time-value, #time-valueCuisson, #value-nbPersonne, #value-calories
        display: inline-block
        position: relative
        width: 6.4rem
        text-align: right
        margin-left: -2rem

    #time-valueCuisson
        width: 8.3rem
        margin-left: -2rem

    #value-calories
        width: 8rem
        margin-left: -2rem

    #value-nbPersonne
        width: 7rem
        margin-left: -2rem

</style>