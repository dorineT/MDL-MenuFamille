<template>
	<div style="margin: 4px">
		<dialog-suggestion
			:dialogShow="showDialog"
			:itemReceived="itemSend"
			:dateJour="periodeSend"
			:idMenu="idMenu"
			@closeDialog="closeDialogSuggestion"
			@updateSugg="updateMenuSuggestion"
		></dialog-suggestion>
		<div style="margin: 4px">Mode suggestion</div>

		<v-data-table
			:headers="headers"
			:items="items"
			class="elevation-8"
			disable-sort
			mobile-breakpoint="0"
			:loading="loading"
			loading-text="Loading... Please wait"
			:footer-props="{
				'disable-items-per-page': true,
				itemsPerPage: 7,
				'items-per-page-options': [7, 14],
				'items-per-page-text': 'Lignes par page',
			}"
			hide-default-footer
			@page-count="pageCount = $event"
			:page.sync="page"
		>
			<template v-slot:body>
				<tbody v-if="items.length === 0">
					<td class="nodata" colspan="0">Auncun menu sélectionné</td>
				</tbody>
				<tbody v-else>
					<tr>
						<td class="tdplat"><strong>Matin</strong></td>
						<td
							class="tdplat"
							v-for="(item, i) in platsMatin"
							:key="i + 'matin'"
						>
							<p class="sizeP" v-if="(item.plat !== '') & (item.plat !== '/')">
								{{ item.plat }}
							</p>
							<p v-else-if="item.plat === '/'" style="color: red">
								<v-icon color="red">mdi-close-thick</v-icon>
							</p>
							<div
								v-else-if="item.suggestions.length > 0"
								class="d-inline-flex flex-column"
							>
								<div
									class="d-inline-flex flex-row"
									v-for="(sugg, i) in item.suggestions"
									:key="i + 'sugg'"
								>
									<p>{{ sugg.recette.nom }}</p>
                  <span class="white--text ml-2">
									<v-avatar color="indigo" size="30">
										{{
											sugg.membre.prenom.slice(0, 1) +
											sugg.membre.nom.slice(0, 1)
										}}
									</v-avatar>
                  </span>
								</div>
							</div>
              <v-btn v-if="item.suggestions.length > 0 && canSuggest(item.suggestions)" text @click="goToRecette(item)">               
                  <v-icon color="green" large>mdi-plus</v-icon>            
              </v-btn>
              <v-btn v-else-if="item.plat === '' & item.suggestions.length === 0" text @click="goToRecette(item)">
                  <p
                    v-if="(item.tags.length > 0) & (item.suggestions.length === 0)"
                    style="color: green"
                  >
                    <strong>Tags</strong>
                  </p>						
                    <v-icon v-else color="green" large>mdi-plus</v-icon>					
                </v-btn>	
							<p
								v-if="
									(item.nbPers !== null) &
									(item.nbPers !== nbPersonneFamille) &
									(item.plat !== '/')
								"
							>
								{{ item.nbPers }} personnes
							</p>
						</td>
					</tr>
					<tr>
						<td class="tdplat"><strong>Midi</strong></td>
						<td class="tdplat" v-for="(item, i) in platsMidi" :key="i + 'midi'">
							<p class="sizeP" v-if="(item.plat !== '') & (item.plat !== '/')">
								{{ item.plat }}
							</p>
							<p v-else-if="item.plat === '/'" style="color: red">
								<v-icon color="red">mdi-close-thick</v-icon>
							</p>
							<div
								v-else-if="item.suggestions.length > 0"
								class="d-inline-flex flex-column"
							>
								<div
									class="d-inline-flex flex-row"
									v-for="(sugg, i) in item.suggestions"
									:key="i + 'sugg'"
								>
									<p>{{ sugg.recette.nom }}</p>
                  <span class="white--text ml-2">
									<v-avatar color="indigo" size="30">
										{{
											sugg.membre.prenom.slice(0, 1) +
											sugg.membre.nom.slice(0, 1)
										}}
									</v-avatar>
                  </span>
								</div>
							</div>
              <v-btn v-if="item.suggestions.length > 0 && canSuggest(item.suggestions)" text @click="goToRecette(item)">               
                  <v-icon color="green" large>mdi-plus</v-icon>            
              </v-btn>
              <v-btn v-else-if="item.plat === '' & item.suggestions.length === 0" text @click="goToRecette(item)">
                  <p
                    v-if="(item.tags.length > 0) & (item.suggestions.length === 0)"
                    style="color: green"
                  >
                    <strong>Tags</strong>
                  </p>						
                    <v-icon v-else color="green" large>mdi-plus</v-icon>					
                </v-btn>	
							<p
								v-if="
									(item.nbPers !== null) &
									(item.nbPers !== nbPersonneFamille) &
									(item.plat !== '/')
								"
							>
								{{ item.nbPers }} personnes
							</p>
						</td>
					</tr>
					<tr>
						<td class="tdplat"><strong>Soir</strong></td>
						<td class="tdplat" v-for="(item, i) in platsSoir" :key="i + 'soir'">
							<p class="sizeP" v-if="(item.plat !== '') & (item.plat !== '/')">
								{{ item.plat }}
							</p>
							<p v-else-if="item.plat === '/'" style="color: red">
								<v-icon color="red">mdi-close-thick</v-icon>
							</p>
							<div
								v-else-if="item.suggestions.length > 0"
								class="d-inline-flex flex-column"
							>
								<div
									class="d-inline-flex flex-row"
									v-for="(sugg, i) in item.suggestions"
									:key="i + 'sugg'"
								>
									<p>{{ sugg.recette.nom }}</p>
                  <span class="white--text ml-2">
									<v-avatar color="indigo" size="30">
										{{
											sugg.membre.prenom.slice(0, 1) +
											sugg.membre.nom.slice(0, 1)
										}}
									</v-avatar>
                  </span>
								</div>
							</div>

              <v-btn v-if="item.suggestions.length > 0 && canSuggest(item.suggestions)" text @click="goToRecette(item)">               
                  <v-icon color="green" large>mdi-plus</v-icon>            
              </v-btn>
							<v-btn v-else-if="item.plat === '' & item.suggestions.length === 0" text @click="goToRecette(item)">
									<p
										v-if="(item.tags.length > 0) & (item.suggestions.length === 0)"
										style="color: green"
									>
										<strong>Tags</strong>
									</p>						
										<v-icon v-else color="green" large>mdi-plus</v-icon>					
								</v-btn>							
							<p
								v-if="
									item.nbPers !== null &&
									(item.nbPers !== nbPersonneFamille) & (item.plat !== '/')
								"
							>
								{{ item.nbPers }} personnes
							</p>
						</td>
					</tr>
				</tbody>
			</template>
		</v-data-table>

		<v-pagination
			v-model="page"
			:length="pageCount"
			color="green"
			@next="nextPageMenu"
			@previous="previousPageMenu"
			@input="changePageEvent"
		></v-pagination>

		<v-snackbar v-model="errorMessage.error" text color="red">
			{{ errorMessage.message }}
		</v-snackbar>
	</div>
</template>

<script>
	import MenuDao from "../services/api.menu";
	import checkContrainte from "../services/checkContrainteMenu";
	import moment from "moment";
	moment.locale("fr");
	import DialogSuggestion from "./DialogSuggestion.vue";
	let menuSuggest = new MenuDao();

	export default {
		components: { DialogSuggestion },
		props: ["periodeMenu", "idMenu"],
		data() {
			return {
				// dialogue
				showDialog: false,
				itemSend: null,
				periodeSend: null,
				//cal
				nbPersonneFamille: null,
				headers: [],
				menu: {},
				items: [],
				pageCount: 0,
				page: 1,
				nbJourMenu: 0,
				platsMatin: [],
				platsMidi: [],
				platsSoir: [],
				errorMessage: {
					message: "",
					error: false,
				},
				loading: true,
			};
		},
		computed: {
			currentUser() {
				return this.$store.state.auth.user;
			},
      canSuggest() {
        return (suggestions) => {
          let ok = true
          suggestions.forEach(sug => {
            if(sug.id_membre === this.currentUser.id_membre) {                         
              ok = false
            }
          });              
          return ok
        }
      },
		},
		// call api to get the menu
		mounted() {
			this.fetchMenu();
		},
		watch: {
			idMenu() {
				this.fetchMenu();
			},
		},
		methods: {
			//// Affichage calendrier ///

			goToRecette(item) {
				let menuFind = this.items.find((el) => el.id_calendrier === item.id_jour); // le jour
				let periodeFind = menuFind.calendrier_recettes.find(
					(el) => el.id_periode === item.id_periode
				);

				//open dialogue with even bus
				this.periodeSend = menuFind.date;
				this.itemSend = periodeFind;
				this.showDialog = true;
			},
			fetchMenu() {
				menuSuggest.getMenuById(this.idMenu).then((response) => {
					this.menu = response.data;
					this.menu.plat_identique_matin =
						this.menu.plat_identique_matin === -1
							? null
							: this.menu.plat_identique_matin;
					this.menu.plat_identique_midi =
						this.menu.plat_identique_midi === -1
							? null
							: this.menu.plat_identique_midi;
					this.menu.plat_identique_soir =
						this.menu.plat_identique_soir === -1
							? null
							: this.menu.plat_identique_soir;

					this.loading = false;
					this.nbPersonneFamille = this.$store.state.info.nbMembreActuel;

					this.items = this.menu.calendriers;
					let indiceEnd = this.items.length < 7 ? this.items.length : 7;

					this.populateHeader(this.items, 0, indiceEnd);
					this.fillPlat(this.items, 0, indiceEnd);
				});
			},
			populateHeader(menu, iStart, iEnd) {
				this.headers = [{ text: "Période", align: "center" }];
				this.nbJourMenu = 0;
				// 7 jour max display dans le cal
				while ((this.nbJourMenu < 7) & (iStart < menu.length) & (iStart < iEnd)) {
					let jourPlat = menu[iStart];
					this.headers.push({
						text:
							moment(jourPlat.date, "DD-MM-YYYY").locale("fr").format("dddd") +
							"\n" +
							jourPlat.date,
						align: "center",
						value: jourPlat.id_calendrier,
					});
					iStart++;
					this.nbJourMenu++;
				}
			},
			/* remplir les différents tableaux avec les repas par separation, matin - midi -soir*/
			fillPlat(menu, iStart, iEnd) {
				this.platsMatin = [];
				this.platsMidi = [];
				this.platsSoir = [];

				while ((iStart < iEnd) & (iStart < menu.length)) {
					let jourPlat = menu[iStart];
					let periode = jourPlat.calendrier_recettes[0];
					this.platsMatin.push({
						id_jour: jourPlat.id_calendrier,
						id_periode: periode.id_periode,
						plat:
							periode.recette !== null
								? periode.recette.nom
								: periode.is_recette
								? ""
								: "/", // can be null
						nbPers: periode.nb_personne,
						tags: periode.tags,
						suggestions: periode.suggestions,
					});

					periode = jourPlat.calendrier_recettes[1];
					this.platsMidi.push({
						id_jour: jourPlat.id_calendrier,
						id_periode: periode.id_periode,
						plat:
							periode.recette !== null
								? periode.recette.nom
								: periode.is_recette
								? ""
								: "/",
						nbPers: periode.nb_personne,
						tags: periode.tags,
						suggestions: periode.suggestions,
					});

					periode = jourPlat.calendrier_recettes[2];
					this.platsSoir.push({
						id_jour: jourPlat.id_calendrier,
						id_periode: periode.id_periode,
						plat:
							periode.recette !== null
								? periode.recette.nom
								: periode.is_recette
								? ""
								: "/",
						nbPers: periode.nb_personne,
						tags: periode.tags,
						suggestions: periode.suggestions,
					});

					iStart++;
				}
			},
			//event quand on clique sur page suivante
			nextPageMenu() {
				let iStart = (this.page - 1) * 7;
				let iEnd = this.page * 7;
				this.populateHeader(this.items, iStart, iEnd);
				this.fillPlat(this.items, iStart, iEnd);
			},
			//event quand on clique sur page precedente
			previousPageMenu() {
				// p1 : 0 -> 7 (6)   , P2 : 7 -> 14 (13)
				let iStart = (this.page - 1) * 7;
				let iEnd = this.page * 7;
				this.populateHeader(this.items, iStart, iEnd);
				this.fillPlat(this.items, iStart, iEnd);
			},
			changePageEvent(newPage) {
				let iStart = (newPage - 1) * 7;
				let iEnd = newPage * 7;
				this.populateHeader(this.items, iStart, iEnd);
				this.fillPlat(this.items, iStart, iEnd);
			},
			closeDialogSuggestion() {
				this.showDialog = false;
			},

			/// UPDATE CALENDRIER////

			updateMenuSuggestion(item) {
				let menuJourOld = this.items.find(
					(elem) => elem.id_calendrier === item.id_calendrier
				);
				let menuPeriodeOld = menuJourOld.calendrier_recettes.find(
					(elem) => elem.id_periode === item.id_periode
				);
				this.errorMessage.message = "";

				//copy all attribute from menuPeriodeOld to periodeSave
				//let periodeSave = JSON.parse(JSON.stringify(menuPeriodeOld))
				//or (new)
				let periodeSave = structuredClone(menuPeriodeOld);

				if (item.periode === "matin") {
					menuJourOld.calendrier_recettes[0] = structuredClone(item);
					if (this.menu.plat_identique_matin !== null) {
						this.errorMessage.message = checkContrainte.verifContraintePlat(
							this.items,
							this.menu.plat_identique_matin,
							0
						);
					}
				} else if (item.periode === "midi") {
					menuJourOld.calendrier_recettes[1] = structuredClone(item);
					if (this.menu.plat_identique_midi !== null) {
						this.errorMessage.message = checkContrainte.verifContraintePlat(
							this.items,
							this.menu.plat_identique_midi,
							1
						);
					}
				} else if (item.periode === "soir") {
					menuJourOld.calendrier_recettes[2] = structuredClone(item);
					if (this.menu.plat_identique_soir !== null) {
						this.errorMessage.message = checkContrainte.verifContraintePlat(
							this.items,
							this.menu.plat_identique_soir,
							2
						);
					}
				}

				if (this.errorMessage.message !== "") {
					this.errorMessage.error = true;
					menuPeriodeOld = periodeSave;
				} else {
					let iStart = (this.page - 1) * 7;
					let iEnd = this.page * 7;
					this.fillPlat(this.items, iStart, iEnd);
					this.errorMessage.error = false;

					//call api
					let sugg = item.suggestions.find(
						(el) => el.id_membre === this.currentUser.id_membre
					);
					menuSuggest.sendMenuAddSuggestion(sugg);
				}
			},
		},
	};
</script>


<style lang="sass">
.v-data-table
  white-space: pre-wrap

.tdplat
  text-align: center

.sizeP
  font-size: large
</style>