  <template>
	<v-row justify="center">
		<v-dialog
			v-model="dialog"
			fullscreen
			hide-overlay
			transition="dialog-bottom-transition"
		>
			<v-card>
				<v-toolbar dark color="#FFB74D">
					<v-btn icon dark @click="dialog = false">
						<v-icon>mdi-close</v-icon>
					</v-btn>
					<v-toolbar-title>Modification du menu</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-toolbar-items>
						<v-btn dark text @click="sauvegardeMenuJour()"> Sauvegarder </v-btn>
					</v-toolbar-items>
				</v-toolbar>

				<v-list subheader>
					<v-subheader>
						Menu du : {{ jourSemaine }} {{ periode }}, le {{date}}
					</v-subheader>
					<v-list-item>
						<v-list-item-content>
							<v-list-item-title>
								Menu prévu pour cette période ?
							</v-list-item-title>
							<v-list-item-subtitle>
								<v-radio-group v-model="selectedRadioMenuOuiNon" row>
									<v-radio
										label="Oui"
										value="oui"
										color="orange lighten-2"
									></v-radio>
									<v-radio
										label="Non"
										value="non"
										color="orange lighten-2"
									></v-radio>
								</v-radio-group>
							</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>
				</v-list>

				<v-divider></v-divider>

				<v-list v-if="selectedRadioMenuOuiNon === 'oui'">
					<v-list-item>
						<v-list-item-content>
							<v-list-item-title>
								Recette prévue : {{ recetteChoisie }}

								<v-btn
									outlined
									rounded
									small
									color="orange lighten-2"
									class="btnInlist"
									@click="showModifMenu = !showModifMenu"
									>Modifier</v-btn
								>
							</v-list-item-title>

							<div v-if="newRecetteChoix !== null">
								<br />
								Vous avez choisi de remplacer le menu par :

								<v-chip
									class="ma-2"
									close
									color="orange"
									label
									outlined
									@click:close="resetNewRecette()"
								>
									{{ newRecetteChoix }}
								</v-chip>
							</div>
						</v-list-item-content>
					</v-list-item>
					<v-expand-transition>
						<div v-show="showModifMenu">
							<v-container fluid>
								<v-row>
									<v-col cols="12" sm="6" md="6" lg="6" xl="6">
										<v-card   
											elevation="7"
											outlined
											shaped>
											<v-card-title>
												Choix parmis la liste de recettes
											</v-card-title>
											<v-card-text>
												<v-autocomplete
													color="orange lighten-2"
													label="Recette"
													:items="itemRecettes"
													item-text="nom"
													item-value="id_recette"
													return-object
													v-model="comboboxRecetteSelected"
													@change="userActionListeRecette()"
													no-data-text="Aucune recette correspondante"
												></v-autocomplete>
											</v-card-text>
										</v-card>
									</v-col>
									<v-col
										cols="12"
										sm="6"
										md="6"
										lg="6"
										xl="6"
										v-if="stringUpdateModal !== 'updateMenuJourCreate'"
									>
										<v-card   
											elevation="7"
											outlined
											shaped>
											<v-card-title> Suggestion </v-card-title>
											<v-card-text>
												<v-radio-group
													v-model="radioSelectionSuggestion"
													@change="changeChoixPlat()"
												>
												
													<div v-for="(sug, n) in suggestionsListe"
														:key="n"
														class="d-flex flex-row">
														<v-radio
															:label="sug.recette.nom"
															:value="sug"
															return-object
															color="orange lighten-2"
														></v-radio>

														<v-avatar style="margin:25px" color="light-green lighten-1" size="35">
															<span class="white--text text-h5">{{sug.membre.prenom.substring(0, 1)}}</span>
														</v-avatar>
													</div>

												</v-radio-group>
											</v-card-text>
										</v-card>
									</v-col>
								</v-row>
							</v-container>
						</div>
					</v-expand-transition>

					<v-list-item>
						<v-list-item-content>
							<v-list-item-title>tags choisis</v-list-item-title>
							<v-col xl="6" md="6" sm="6" xs="12">
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
						</v-list-item-content>
					</v-list-item>

					<v-list-item>
						<v-list-item-content>
							<v-list-item-title>Nombre de personnes</v-list-item-title>
							<v-col xl="6" md="6" sm="6" xs="12">
								<v-text-field
									type="number"
									step="1"
									min="0"
									ref="input"
									:rules="[numberRule]"
									v-model="numberPersonneNew"
									clearable
								></v-text-field>
							</v-col>
						</v-list-item-content>
					</v-list-item>
				</v-list>
			</v-card>
		</v-dialog>

		<!--Snackbar alert with timeout-->

		<v-snackbar
			v-model="snackbar"
			:timeout="timeout"
			text
			color="orange lighten-2"
		>
			Menu sauvegardé !
		</v-snackbar>
	</v-row>
</template>

<script>
	import { eventBus } from "../main";
	import RecetteDAO from "../services/api.recette"
	import TagDAO from '../services/api.tag';
	import moment from 'moment'
	let DAORecette = new RecetteDAO()
	let DAOTag = new TagDAO()

	export default {
		props: ["stringUpdateModal"],
		data() {
			return {
				dialog: false,
				infoMenu: {},						
				date: null,
				periode: "",
				snackbar: false,
				timeout: 3000,
				selectedRadioMenuOuiNon: "oui",
				recetteChoisie: "",
				showModifMenu: false,
				comboboxRecetteSelected: null,
				itemRecettes: [],
				itemRecettesAll: [],			
				radioSelectionSuggestion: null,
				newRecetteChoix: null,
				tagsListe: [],
				tagsChoix:[],
				tagsListeAll: [],
				suggestionsListe:[],
				numberPersonneNew: null,
				numberPersonneOld: null,
				jourSemaine: null,
			};
		},
		created() {
			eventBus.$on("openDialog", this.openModal); //listening event form CalendarModificationMenu component			
		},
		destroyed() {
			eventBus.$off("openDialog"); //listening event form CalendarModificationMenu component
		},
		watch:{
			tagsChoix(){
												
				let tempTags = this.copyTab(this.tagsChoix)
				this.itemRecettes = this.itemRecettesAll.filter(function(recette){							
					let tagReTemp = []
					recette.tags.forEach(tagRecette => {
						//vérifier que tagtemp est contenu dans tag recette
						tagReTemp.push(tagRecette.nom)
					});

					if(tempTags.every(el => {					
						return tagReTemp.includes(el.nom)
					}))return recette
				})
			},
			newRecetteChoix(){
				if(this.newRecetteChoix === null ) return 
				
				if(this.radioSelectionSuggestion !== null){	
					this.tagsChoix = []			
					this.radioSelectionSuggestion.recette.tags.forEach(el => {
							if(!this.tagsChoix.some(tag => el.id_tag === tag.id_tag)){
								this.tagsChoix.push(el)
							}
					});
				}else{
					this.comboboxRecetteSelected.tags.forEach(el => {
							if(!this.tagsChoix.some(tag => el.id_tag === tag.id_tag)){
								this.tagsChoix.push(el)
							}
					});
				}
			}
		},
		methods: {
			/** evenement modification d'une periode, recupération et affichage des informations du menu sur une période */
			async openModal(itemReceived, dateJour) {
				console.log(itemReceived)
				
				this.suggestionsListe = []
				this.showModifMenu = false; //display les cartes de mofification de la recette
				this.dialog = true;

				this.infoMenu.id_calendrier = itemReceived.id_calendrier
				this.infoMenu.id_periode = itemReceived.id_periode
				this.infoMenu.id_recette = itemReceived.id_recette
				this.infoMenu.is_recette = itemReceived.is_recette
				this.infoMenu.periode = itemReceived.periode
				this.infoMenu.recette = {}		
				if(itemReceived.recette !== null){						
					this.infoMenu.recette.nom = itemReceived.recette.nom;
					this.infoMenu.recette.tags = this.copyTab(itemReceived.recette.tags)
				}else{
					let recette = {}
					recette.nom = "Pas de recette prévue"
					recette.tags = []
					this.infoMenu.recette= recette
				}			

				this.infoMenu.nb_personne = itemReceived.nb_personne;			
				this.date = dateJour;	
				this.jourSemaine = moment(dateJour, 'DD-MM-YYYY').locale('fr').format('dddd')
				this.periode = itemReceived.periode;
				this.infoMenu.tags = this.copyTab(itemReceived.tags)				
				this.infoMenu.suggestions = structuredClone(itemReceived.suggestions)
				
				this.suggestionsListe = structuredClone(itemReceived.suggestions)
				console.log(this.suggestionsListe)
				this.tagsChoix = []

				//charger tous les tags de la bd
				this.tagsListeAll = await DAOTag.getAll()	
				this.tagsListe = this.copyTab(this.tagsListeAll)		
				//charger toutes les recettes et leur tags
				this.itemRecettesAll = await DAORecette.getAll()
				this.itemRecettes = this.copyTab(this.itemRecettesAll)

				//menu prévu ?
				this.selectedRadioMenuOuiNon = this.infoMenu.is_recette === false ? "non" : "oui"
				this.numberPersonneOld = this.infoMenu.nb_personne
				this.recetteChoisie =  this.infoMenu.recette.nom

				//si on a des tags déjà prédéfini dans l'item recu (periode ou recette)
				console.log(this.infoMenu.recette)
				if(this.infoMenu.recette.nom !== "Pas de recette prévue"){				
					this.tagsChoix = this.copyTab(this.infoMenu.recette.tags)
				}
				else if (this.infoMenu.tags.length > 0) {
					console.log('tag defini')
					this.tagsChoix = this.copyTab(this.infoMenu.tags)
					console.log(this.tagsChoix)
					//filtrer les recettes qu'on peut choisir => done avec le watch property		
				}				
				


				//reset
				this.resetNewRecette();

				//set nb perso
				this.numberPersonneNew = this.numberPersonneOld;	
			},
			/**Copier un tableau - superficielle
			 * (uniquement les tab contenant des objets qui ne sont pas destinés à être modifiés) */
			copyTab(source){
				let cible = []
				if(source === null ) return []

				source.forEach(elem => {
					cible.push(elem)
				})
				return cible
			},
			userActionListeRecette(){				
				this.newRecetteChoix = this.comboboxRecetteSelected.nom		
				this.resetSelectedSuggestion()										
			},
			resetSelectedSuggestion() {			
				this.radioSelectionSuggestion = null
			},
			changeChoixPlat() {	
				console.log('change choix plat')
				console.log(this.radioSelectionSuggestion)		
				this.comboboxRecetteSelected = null
				if(this.radioSelectionSuggestion !== undefined ){
					this.newRecetteChoix = this.radioSelectionSuggestion.recette.nom
				}
			},
			resetNewRecette() {					
				this.newRecetteChoix = null				
				this.comboboxRecetteSelected = null
				this.radioSelectionSuggestion = null
				this.resetTag()		
			},
			/** Reset les tags à ceux de la recette prévue */
			resetTag(){				
				this.tagsChoix = []
				if(this.infoMenu.recette.nom !== "Pas de recette prévue"){
					console.log("passage ")				
					console.log(this.radioSelectionSuggestion)
					if(this.radioSelectionSuggestion !== null){						
						this.tagsChoix = this.copyTab(this.radioSelectionSuggestion.recette.tags)						
					}else{
						this.tagsChoix = this.copyTab(this.infoMenu.recette.tags)
					}
				}
				else if (this.infoMenu.tags.length > 0) {
					console.log('tag defini')
					this.tagsChoix = this.copyTab(this.infoMenu.tags)
					console.log(this.tagsChoix)
					//filtrer les recettes qu'on peut choisir => done avec le watch property		
				}
			},
			/**verifie que le nombre de personnes entre dans le textfiel est positif */
			numberRule: (val) => {
				if (val <= 0) return "Entrez un nombre un nombre supérieur à 0";
				return true;
			},

			//update
			sauvegardeMenuJour() {			
				if (this.selectedRadioMenuOuiNon === "non") {									
					this.infoMenu.recette = null
					this.infoMenu.id_recette = null
					this.infoMenu.is_recette = false
					this.infoMenu.tags = []
				}
				//on veut une recette mais on a rien défini
				//ou alors on définit juste des tags
				else if (this.selectedRadioMenuOuiNon === "oui" & (this.newRecetteChoix==="/" | this.newRecetteChoix===null)) {													
					this.infoMenu.id_recette = null			
					this.infoMenu.is_recette = true					
					this.infoMenu.recette = null	
					this.infoMenu.tags = this.copyTab(this.tagsChoix)
				}
				else{				
					let recette = this.itemRecettesAll.find(r => r.nom === this.newRecetteChoix)
					this.infoMenu.tags = this.copyTab(this.tagsChoix)
					this.infoMenu.recette = recette
					this.infoMenu.is_recette = true
					this.infoMenu.id_recette = recette.id_recette					
				}			


				//number personne
				if (this.numberPersonneNew !== this.numberPersonneOld) {
					if (this.numberPersonneNew <= 0) {
						return false;
					}
					this.infoMenu.nb_personne = parseInt(this.numberPersonneNew)
				}

				// envoi uniquement le menu jour modifie		
				eventBus.$emit(this.stringUpdateModal, this.infoMenu)
				this.dialog = false
				if(this.stringUpdateModal !== 'updateMenuJourCreate'){this.snackbar = true}
			},
		},
	};
</script>

<style lang="sass">
.v-application .primary--text
  color: #FFB74D !important
  caret-color: #FFB74D !important
</style>
