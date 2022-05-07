 <template>
	<v-row justify="center">
		<v-dialog v-model="dialogShow" persistent max-width="600px">
			<v-card class="noPadding">
				<v-toolbar dark color="#FFB74D">
					<v-btn icon dark @click="$emit('closeDialog')">
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
			rounded
			color="orange lighten-2"
		>
			Menu suggéré sauvegardé !
		</v-snackbar>
	</v-row>
</template>

<script>
	import { eventBus } from "../main";
	import moment from "moment";
	moment.locale('fr')
	import RecetteDAO from "../services/api.recette";

	let DAORecette = new RecetteDAO();

	export default {
		props: ["dialogShow", "itemReceived", "dateJour", "idMenu"],
		data() {
			return {				
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
		watch: {
			/** evenement modification d'une periode, recupération et affichage des informations du menu sur une période */
			dialogShow() {			

				this.id_menu = this.idMenu
				this.infoMenu = structuredClone(this.itemReceived);
				this.date = this.dateJour;
				this.jourSemaine = moment(this.dateJour, "DD-MM-YYYY")
					.locale("fr")
					.format("dddd");

				//get recette si tag defini
				if (this.infoMenu.tags.length > 0) {
				
					DAORecette.getFromTags(this.infoMenu.tags,this.itemReceived.periode).then(
						  (response) => {
							  this.itemRecettes = response.data
						  }
					  )    
				} else {
					DAORecette.getAllByCategory(this.itemReceived.periode).then(
						(response) => {
							this.itemRecettesAll = response.data
							this.itemRecettes = structuredClone(this.itemRecettesAll);
						}
					)
					
				}

				//reset
				this.resetNewRecette();
			},
		},
		methods: {
			sauvegardeMenuJour() {
				//mise a jour calendrier	

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
		
				this.snackbar = true;

				// envoi uniquement le menu jour modifie
				this.$emit("updateSugg",  structuredClone(this.infoMenu))
				this.$emit("closeDialog")
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
@import '../style/globalStyle'
.v-application .primary--text
  color: #FFB74D !important
  caret-color: #FFB74D !important
</style>