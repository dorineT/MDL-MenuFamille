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
					<v-subheader
						>Menu du : {{ jourSemaine }} {{ periode }} : {{ date }}
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
										<v-card>
											<v-card-title>
												Choix parmis la liste de recettes
											</v-card-title>
											<v-card-text>
												<v-autocomplete
													color="orange lighten-2"
													label="Recette"
													:items="itemRecettes"
													v-model="comboboxRecetteSelected"
													@change="resetSelectedSuggestion()"
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
										<v-card>
											<v-card-title> Suggestion </v-card-title>
											<v-card-text>
												<v-radio-group
													v-model="radioSelectionSuggestion"
													@change="changeChoixPlat()"
												>
													<v-radio
														v-for="(sugg, n) in suggestions"
														:key="n"
														:label="sugg"
														:value="sugg"
														color="orange lighten-2"
													></v-radio>
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
									v-model="infoMenu.tagsChoix"
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
	export default {
		props: ["stringUpdateModal"],
		data() {
			return {
				dialog: false,
				infoMenu: {},
				jourSemaine: null,
				date: null,
				periode: "",
				snackbar: false,
				timeout: 3000,
				selectedRadioMenuOuiNon: "oui",
				recetteChoisie: "",
				showModifMenu: false,
				comboboxRecetteSelected: null,
				itemRecettes: ["lasagne", "pate carbo", "flammekueche"],
				suggestions: ["petite saucisse - pdt", "risotto"],
				radioSelectionSuggestion: null,
				newRecetteChoix: null,
				tagsListe: [
					"soupe",
					"lunch-box",
					"light",
					"épicé",
					"gaterie",
					"sucre",
					"sel",
					"calorie hight",
				],
				numberPersonneNew: null,
				numberPersonneOld: null,
			};
		},
		created() {
			eventBus.$on("openDialog", this.openModal); //listening event form CalendarModificationMenu component
		},
		watch:{
			
		},
		methods: {
			/** evenement modification d'une periode, recupération et affichage des informations du menu sur une période */
			openModal(itemReceived, periode, jourSemaine, date) {
				console.log('boite dialogue: ')
				console.log(itemReceived)
				
				this.showModifMenu = false;
				this.dialog = true;

				this.infoMenu.id = itemReceived.id;
				this.infoMenu.plat = itemReceived.plat;
				this.infoMenu.nbPers = itemReceived.nbPers;
				this.jourSemaine = jourSemaine;
				this.date = date;

				this.infoMenu.tagsChoix = [];

				if (itemReceived.tags != null) {
					itemReceived.tags.forEach((el) => {						
						if (el != null) {
							this.infoMenu.tagsChoix.push(el);
						}
					});
				}

						
				this.periode = periode;
	
				//menu prévu ?
				this.selectedRadioMenuOuiNon = "oui";
				this.numberPersonneOld = this.infoMenu.nbPers;
				this.recetteChoisie = this.infoMenu.plat;
				if (
					(this.infoMenu.plat === "/") &
					(this.infoMenu.tagsChoix.length === 0)
				) {		
					this.selectedRadioMenuOuiNon = "non";
				}


				//reset
				this.resetNewRecette();


				//set nb perso
				this.numberPersonneNew = this.numberPersonneOld;
			},
			sauvegardeMenuJour() {
				//mise a jour calendrier
				console.log("new recette choix " + this.newRecetteChoix)
				console.log('select radio oui / non : ' + this.selectedRadioMenuOuiNon)
				
				console.log('' === "" )
				if (this.selectedRadioMenuOuiNon === "non") {
					this.newRecetteChoix = "/";
				}
				else if (this.selectedRadioMenuOuiNon === "oui" & (this.recetteChoisie==="/" | this.recetteChoisie===null)) {
					console.log("hello")
					this.newRecetteChoix = "";
				}
				//recette			
				this.infoMenu.plat = this.newRecetteChoix;
				

				//number
				if (this.numberPersonneNew !== this.numberPersonneOld) {
					if (this.numberPersonneNew <= 0) {
						return false;
					}
					this.infoMenu.nbPers = this.numberPersonneNew;
				}

				this.dialog = false;


				if(this.stringUpdateModal !== 'updateMenuJourCreate'){this.snackbar = true}

				// envoi uniquement le menu jour modifie
				console.log('Update boite de dialogue')	
				console.log(this.infoMenu)			
				eventBus.$emit(this.stringUpdateModal, this.infoMenu, this.periode);
			},
			resetSelectedSuggestion() {
				this.radioSelectionSuggestion = null;
				this.newRecetteChoix = this.comboboxRecetteSelected;
			},
			changeChoixPlat() {
				this.comboboxRecetteSelected = null;
				this.newRecetteChoix = this.radioSelectionSuggestion;
			},
			resetNewRecette() {
				this.newRecetteChoix = null;
				this.comboboxRecetteSelected = null;
				this.radioSelectionSuggestion = null;
			},
			/**verifie que le nombre de personnes entre dans le textfiel est positif */
			numberRule: (val) => {
				if (val <= 0) return "Entrez un nombre un nombre supérieur à 0";
				return true;
			},
		},
	};
</script>

<style lang="sass">
.v-application .primary--text
  color: #FFB74D !important
  caret-color: #FFB74D !important
</style>
