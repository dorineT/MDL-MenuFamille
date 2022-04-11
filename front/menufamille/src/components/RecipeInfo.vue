<template>

  <v-dialog
    v-model="dialogInfoRecipe"
    @click:outside="closeDialogueEvent"
    @keydown.esc="closeDialogueEvent"
    :max-width="width"
    transition="dialog-transition"
  >
    <v-toolbar dark color="#FFB74D">


					<v-btn icon dark @click="$emit('closeDialog')">
						<v-icon>mdi-close</v-icon>
					</v-btn>
                    <v-spacer></v-spacer>
        <v-toolbar-items>
            <v-btn dark text @click="generatePDF()"> Générer le pdf </v-btn>             
        </v-toolbar-items>
	</v-toolbar>
     <v-card v-if="dialogInfoRecipe">
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
                            <v-col>
                                <v-btn v-if="isFavoris===0"
                                  icon
                                  color="green lighten-3"
                                  @click="addFavorite"
                                >
                                  <v-icon>mdi-star-outline</v-icon>
                                </v-btn>
                                   <v-btn v-else
                                  icon
                                  color="green lighten-3"
                                  @click="deleteFavorite"
                                >
                                  <v-icon>mdi-star</v-icon>
                                </v-btn>
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
                                            >{{ denree.nom }},
                                            {{ denree.recette_denree.quantite }} {{denree.recette_denree.mesure}}</v-list-item-content
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
import jsPDF from 'jspdf'
import RecetteDAO from "../services/api.recette"
import FavorisDao from "../services/api.favoris"
let DAORecette = new RecetteDAO();
let DAOFavoris = new FavorisDao();
import moment from "moment";


	export default {
		props: ["id_recette", "dialogInfoRecipe"],
		data() {
			return {
				iconBullet: "mdi-circle-small",
				message: "",
				recipe: {}, 
                isFavoris: 0,             
			};
		},
		methods: {
            fetchData(){              
                DAORecette.getById(this.id_recette).then(
                    (response) => {
                        this.recipe = response.data;
                    },
                    (error) => {                        
                        this.$emit("closeDialog");
                    }
                );

                DAOFavoris.find(this.id_recette).then(
                    (response) =>{
                        if(response.data === ''){
                            this.isFavoris = 0
                        }else{
                            this.isFavoris = 1
                        }
                    }
                )
            },
			closeDialogueEvent() {			
				this.$emit("closeDialog");
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

				return moment.utc().hours(h).minutes(m).format("HH:mm");
			},
            pluriel(nb){
                if(nb > 1) return 's'
                return ''
            },
            generatePDF(){
                let pdfName = this.recipe.nom; 
                var doc = new jsPDF("p","mm","a4");

                let normalSize = 16
                let subTitle = 18
                let lMargin=20; //left margin in mm
                let rMargin=20; //right margin in mm
                let pdfInMM=210;

                let categories = ""
                this.recipe.categories.forEach(c => {
                    categories += c.periode +" "
                });

                let tags = "Tags : "
                this.recipe.tags.forEach(t => {
                    tags += t.nom +" "
                });

                //config
                doc.setFont("times");
                //doc.setFontType("bolditalic");
                doc.setLineWidth(0.5);
                

                //text
                doc.setFontSize(24);

                doc.text(20, 25, this.recipe.nom);                
                doc.line(20, 35, 190, 35);

                doc.setFontSize(18);
                doc.text(20, 50, 'Ingrédient :')

                doc.setFontSize(14);
                doc.text(90, 50, this.recipe.nb_personne + ' personne' + this.pluriel(this.recipe.nb_personne)); 
                doc.text(90, 60, 'temps de préparation : ' + this.transformTime(this.recipe.temps_preparation)); 
                doc.text(90, 70, 'temps de cuisson : '+this.transformTime(this.recipe.temps_cuisson));                
                doc.text(90, 80, 'Calories : ' + this.recipe.calorie + 'kcal'); 
                doc.text(90, 90, 'Nutriscore : ' + this.recipe.nutriscore); 
                doc.text(90, 100, 'Catégorie : ' + categories);                 

                let linesTags =doc.splitTextToSize(tags, (pdfInMM-90-rMargin));
                doc.text(90,110,linesTags);
                
                let y = 60

                this.recipe.denrees.forEach(denree => {
                    let plurielAdd =''              
                    if(denree.recette_denree.mesure === 'unité'){
                        plurielAdd = this.pluriel(denree.recette_denree.quantite)
                    }
                    doc.text(30, y, '- ' + denree.nom + " : " + denree.recette_denree.quantite + " " + denree.recette_denree.mesure + plurielAdd); 
                    y += 6
                });

                if(y < 130) y=130

                let lines =doc.splitTextToSize(this.recipe.preparation, (pdfInMM-lMargin-rMargin));
                doc.text(20,y,lines);

                doc.save(pdfName + '.pdf');
            },
            addFavorite(){                       
                this.isFavoris = 1
                DAOFavoris.create(this.id_recette)
            },
            deleteFavorite(){               
                this.isFavoris = 0
                DAOFavoris.deleteRecipe(this.id_recette)
            }
		},
        watch:{
            dialogInfoRecipe(){               
                if(this.dialogInfoRecipe !== null && this.dialogInfoRecipe){
                    this.fetchData()
                }
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
			},
            widthImage() {     
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