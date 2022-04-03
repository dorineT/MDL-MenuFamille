<template>

	<v-row>
		<v-dialog
			v-model="dialogInfoRecipe"
			scrollable	
            @click:outside="closeDialogueEvent"		            
			:overlay="false"
			:max-width="width"
			transition="dialog-transition"
		>
			<v-card>
				<v-toolbar dark color="#FFB74D">
					<v-btn icon dark @click="$emit('closeDialog', false, message)">
						<v-icon>mdi-close</v-icon>
					</v-btn>
				</v-toolbar>
                <v-container fluid>
				<v-row>
					<v-col cols="3" sm="4" md="5" lg="5" xl="5"> 
                          <v-img v-if="recipe.url_image !== null"
                          style="border-radius: 20px"               
                          :aspect-ratio="16/9"                  
                          
                          max-width="500"
                          :src="recipe.url_image"
                        ></v-img>
                          <v-img v-else                 
                          :aspect-ratio="16/9"                  
                          contain
                          max-width="350"
                          src="../assets/platNone.jpg"
                        ></v-img> 
                    </v-col>
					<v-col cols="9" sm="8" md="7" lg="7" xl="7">
                        <v-row>
                            <v-col>
                                <v-card-title primary-title>
                                    <h3 class="headline mb-0">{{ recipe.nom }}</h3>
                                </v-card-title>

                            </v-col>
                            <v-col self-align="center">                                
                                    <v-chip-group >
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
						<v-card-text class="overflow: auto"> 
                            <v-row>
                                <v-col>
                                    <v-list dense>
                                        Ingrédients:
                                        <v-list-item v-for="(denree,i) in recipe.denrees" :key="denree.id_denree+'denree'+i">
                                            <v-list-item-icon ><v-icon v-text="iconBullet"></v-icon></v-list-item-icon>
                                            <v-list-item-content>{{denree.nom}} {{denree.recette_denree.quantite}} gr</v-list-item-content>
                                        </v-list-item>
                                    </v-list>
                                </v-col>
                                <v-col>
                                    nutriscore + kal + preparation time
                                    <v-img
                                      v-if="recipe.nutriscore !== undefined"
                                      :aspect-ratio="16/9"                  
                                      contain
                                      max-width="500"                                   
                                      :src="require('../assets/'+recipe.nutriscore+'.jpg')"  ></v-img>
                                    


                                    <v-chip-group >
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
                        </v-card-text>
					</v-col>
				</v-row>
                </v-container>
			</v-card>
		</v-dialog>
	</v-row>
 
</template>

<script>
	import RecetteDAO from "../services/api.recette";
	let DAORecette = new RecetteDAO();

	export default {
		props: ["id_recette", "dialogInfoRecipe"],
		data() {
			return {
                iconBullet: 'mdi-circle-small',
				message: "",
				recipe: {},
			};
		},
		created() {
            console.log('created')
			//get recette info
			DAORecette.getById(this.id_recette).then(
				(response) => {
					this.recipe = response.data;
				},
				(error) => {
					console.log("jjjj");
					this.message =
						(error.response && error.response.data) ||
						error.message ||
						error.toString();
					
					this.$emit("closeDialog", true, this.message);
				}
			);
		},
        methods:{
            closeDialogueEvent(){
                console.log('destroyed')
                this.$emit("closeDialog", false, this.message);
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
	};
</script>