 <template>
	<v-row justify="center">
		<v-dialog v-model="dialog" persistent max-width="600px">
			<v-card>
				<v-toolbar dark color="#FFB74D">
					<v-btn icon dark @click="dialog = false">
						<v-icon>mdi-close</v-icon>
					</v-btn>
					<v-toolbar-title>Suggestion de menu</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-toolbar-items>
						<v-btn dark text @click="sauvegardeMenuJour()"> Sauvegarder </v-btn>
					</v-toolbar-items>
				</v-toolbar>

				<h3 style="margin: 10px">
					Menu du {{ jourSemaine }} {{ infoMenu.periode }} : {{ date }}
				</h3>

				<v-divider></v-divider>

				<v-card>
					<v-card-title>
						Choisissez votre plat ! &#128523; &#127789;
					</v-card-title>
					<v-card-text>
						<v-autocomplete
							color="orange lighten-2"
							label="Recette"
							:items="itemRecettes"
							item-text="nom"
							return-object
							v-model="newRecetteChoix"							
							no-data-text="Aucune recette correspondante"
						></v-autocomplete>
					</v-card-text>
				</v-card>

				<div v-if="newRecetteChoix !== null">
					<br />
					Vous avez choisi de suggérer :

					<v-chip
						class="ma-2"
						close
						color="orange"
						label
						outlined
						@click:close="resetNewRecette()"
					>
						{{ newRecetteChoix.nom }}
					</v-chip>
				</div>
			</v-card>
		</v-dialog>

		<!--Snackbar alert with timeout-->

		<v-snackbar
			v-model="snackbar"
			:timeout="timeout"
			text
			color="orange lighten-2"
		>
			Menu suggéré sauvegardé !
		</v-snackbar>
	</v-row>
</template>

<script>
	import { eventBus } from "../main";
	import moment from "moment";
	import RecetteDAO from "../services/api.recette";

	let DAORecette = new RecetteDAO();

	export default {
		data() {
			return {
				dialog: false,
				infoMenu: {},
				snackbar: false,
				timeout: 3000,			
				itemRecettes: [],
				itemRecettesAll: [],
				newRecetteChoix: null,
				jourSemaine: null,
				date: null,
				id_menu: null,
			};
		},
		mounted() {
			eventBus.$on("openDialogSuggestion", this.openModal); //listening event form CalendarSuggestion.vue
		},
		destroyed() {
			eventBus.$off("openDialogSuggestion"); //listening event form CalendarSuggestion.vue
		},
		computed:{
			currentUser() {
			  return this.$store.state.auth.user;
			},
		},
		methods: {
			/** evenement modification d'une periode, recupération et affichage des informations du menu sur une période */
			async openModal(itemReceived, dateJournee, idMenu) {
				this.dialog = true;

				this.id_menu = idMenu
				this.infoMenu = structuredClone(itemReceived);
				this.date = dateJournee;
				this.jourSemaine = moment(dateJournee, "DD-MM-YYYY")
					.locale("fr")
					.format("dddd");

				//get recette si tag defini
				if (this.infoMenu.tags.length > 0) {
					console.log("get recette en fonction des tags");
          			DAORecette.getFromTags(this.infoMenu.tags).then(
						  (response) => {
							  this.itemRecettes = response.data
						  }
					  )    
				} else {
					DAORecette.getAllByCategory(itemReceived.periode).then(
						(response) => {
							this.itemRecettesAll = response.data
							this.itemRecettes = structuredClone(this.itemRecettesAll);
						}
					)
					
				}
				if (this.infoMenu.suggestions.length > 0) {
					//get recette en fonction des suggestions déjà faite
					console.log("delete suggestion");
				}

				//reset
				this.resetNewRecette();
			},
			sauvegardeMenuJour() {
				//mise a jour calendrier
				console.log('sauvegarde')
				console.log(this.infoMenu);
				console.log(this.newRecetteChoix)

				console.log(this.currentUser)

				this.infoMenu.suggestions.push({
					id_periode: this.infoMenu.id_periode,
					id_menu: this.id_menu,
					id_recette: this.newRecetteChoix.id_recette,
					id_membre: this.currentUser.id_membre,
					membre: {
						prenom: this.currentUser.firstname,
						nom: this.currentUser.lastname,
						id_membre: this.currentUser.id_membre
					},
					recette: structuredClone(this.newRecetteChoix)

				})

				this.dialog = false;
				this.snackbar = true;

				// envoi uniquement le menu jour modifie
				eventBus.$emit("updateMenuSuggestionJour", structuredClone(this.infoMenu));
			},

			resetNewRecette() {
				this.newRecetteChoix = null;			
			},
			/**Copier un tableau - superficielle
			 * (uniquement les tab contenant des objets qui ne sont pas destinés à être modifiés) */
			copyTab(source) {
				let cible = [];
				if (source === null) return [];

				source.forEach((elem) => {
					cible.push(elem);
				});
				return cible;
			},
		},
	};
</script>

<style lang="sass">
.v-application .primary--text
  color: #FFB74D !important
  caret-color: #FFB74D !important
</style>