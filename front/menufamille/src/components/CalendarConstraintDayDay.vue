<template>
	<v-card v-if="formData != null">

		<dialog-modification-jour-plat :stringUpdateModal="'updateMenuJourCreate'" :dialogShow="showDialog" :itemReceived="itemSend" :dateJour="periodeSend" @closeDialog="closeDialogModification" @updatePeriode="updateMenuJour"></dialog-modification-jour-plat>
		

		<div style="margin: 4px">
			<div style="margin: 20px">
				Menu : du {{ formData.periode_debut }} au {{ formData.periode_fin }}
			</div>

			<v-data-table
				:headers="headers"
				:items="jours"
				class="elevation-8"
				disable-sort
				mobile-breakpoint="0"
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
					<tbody v-if="jours.length === 0">
						<td class="nodata" colspan="0">Auncun menu sélectionné</td>
					</tbody>
					<tbody v-else>
						<tr>
							<td class="tdplat"> <strong>Matin</strong> </td>
							<td
								class="tdplat"
								v-for="(item, i) in platsMatin"
								:key="i + 'matin'"
							>
								<v-btn text @click="goToRecette(item)">
									<p
										v-if="(item.plat === '') & (item.tags.length > 0)"
										style="color: green"
									>
										<strong>Tags</strong>
									</p>
									<p v-else-if="item.plat === '/'" style="color: red">
										<v-icon color="red">mdi-close-thick</v-icon>
									</p>
									<p v-else-if="item.plat === ''" style="color: green">
										<v-icon color="green" large>mdi-plus</v-icon>
									</p>
									<p v-else>{{ item.plat }}</p>
								</v-btn>
								<p v-if="item.nbPers !== formData.nb_personne">
									{{ item.nbPers }} personnes
								</p>
							</td>
						</tr>
						<tr>
							<td class="tdplat"> <strong>Midi</strong> </td>
							<td
								class="tdplat"
								v-for="(item, i) in platsMidi"
								:key="i + 'midi'"
							>
								<v-btn text @click="goToRecette(item)">
									<p
										v-if="(item.plat === '') & (item.tags.length > 0)"
										style="color: green"
									>
										<strong>Tags</strong>
									</p>
									<p v-else-if="item.plat === '/'" style="color: red">
										<v-icon color="red">mdi-close-thick</v-icon>
									</p>
									<p v-else-if="item.plat === ''" style="color: green">
										<v-icon color="green" large>mdi-plus</v-icon>
									</p>
									<p v-else>{{ item.plat }}</p>
								</v-btn>
								<p v-if="item.nbPers !== formData.nb_personne">
									{{ item.nbPers }} personnes
								</p>
							</td>
						</tr>
						<tr>
							<td class="tdplat"> <strong>Soir</strong> </td>
							<td
								class="tdplat"
								v-for="(item, i) in platsSoir"
								:key="i + 'soir'"
							>
								<v-btn text @click="goToRecette(item)">
									<p
										v-if="(item.plat === '') & (item.tags.length > 0)"
										style="color: green"
									>
										<strong>Tags</strong>
									</p>
									<p v-else-if="item.plat === '/'" style="color: red">
										<v-icon color="red">mdi-close-thick</v-icon>
									</p>
									<p v-else-if="item.plat === ''" style="color: green">
										<v-icon color="green" large>mdi-plus</v-icon>
									</p>
									<p v-else>{{ item.plat }}</p>
								</v-btn>
								<p v-if="item.nbPers !== formData.nb_personne">
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
				class="marginClass"
			></v-pagination>
		</div>
		<v-snackbar v-model="errorMessage.error" text color="red">
			{{ errorMessage.message }}
		</v-snackbar>
	</v-card>
</template>

<script>
	import { eventBus } from "../main";
	import moment from "moment";
	moment.locale('fr')
	import checkContrainte from "./../services/checkContrainteMenu";
	import DialogModificationJourPlat from '../components/DialogModificationJourPlat.vue'
	import MenuDao from "./../services/api.menu";
	let DAOMenu = new MenuDao();

	export default {
	components: { DialogModificationJourPlat },
		data() {
			return {
				i: 0,
				//dialog
				showDialog: false,
				itemSend: null,
				periodeSend: null,
				//cal
				headers: [],
				pageCount: 0,
				page: 1,
				nbJourMenu: 0,
				platsMatin: [],
				platsMidi: [],
				platsSoir: [],
				jours: [],
				items: [],
				formData: {},
				errorMessage: {
					message: "",
					error: false,
				},
			};
		},

		mounted() {					
			eventBus.$on("configurationDD", this.setUpData);
			eventBus.$on("creationMenuDone", this.creationMenuDone);
		},
		destroyed() {					
			eventBus.$off("configurationDD");
			eventBus.$off("creationMenuDone");
		},
		methods: {
			goToRecette(item) {
				let menuFind = this.items.find(el => el.id_calendrier === item.id_jour)// le jour         
				let periodeFind = menuFind.calendrier_recettes.find(el => el.id_periode === item.id_periode)      

				//open dialogue with even bus
				this.itemSend = periodeFind
				this.periodeSend = menuFind.date
				this.showDialog = true         				
			},
			setUpData(form) {				
				if (form != null) {
					this.formData = form;
					this.populateTabJours();

					let indiceEnd = this.jours.length < 7 ? this.jours.length : 7;
					this.fillItems();
					this.populateHeader(0, indiceEnd);
					this.fillPlat(0, indiceEnd);
				}
			},
			//rempli un tableau contenant des dates en fonction de la periode définie
			populateTabJours() {
				let fin = moment(this.formData.periode_fin);
				let actuel = moment(this.formData.periode_debut);
				this.jours = [];

				while (actuel <= fin) {
					let newDate = moment(actuel).format("DD/MM/YYYY");
					this.jours.push(newDate);
					actuel = moment(actuel, "DD/MM/YYYY").add(1, "d");
				}
			},
			populateHeader(iStart, iEnd) {
				this.headers = [{text: 'Période', align:'center'}];
				this.nbJourMenu = 0;
				// 7 jour max display dans le cal
				while (
					(this.nbJourMenu < 7) &
					(iStart < this.jours.length) &
					(iStart < iEnd)
				) {
					
					this.headers.push({
						text: moment(this.jours[iStart],"DD/MM/YYYY").locale('fr').format('dddd') + '\n'+ this.jours[iStart],
						align: "center",
						value: iStart,
					});
					iStart++;
					this.nbJourMenu++;
				}
			},
			fillPlat(iStart, iEnd) {
				this.platsMatin = [];
				this.platsMidi = [];
				this.platsSoir = [];
			

				while ((iStart < iEnd) & (iStart < this.items.length)) {

					let jourPlat = this.items[iStart];					
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
					});

					iStart++;
				}
			},
			fillItems() {
				this.items = [];
				let id = 1;
				for (let i = 0; i < this.jours.length; i++) {
					let idPer = (id - 1) * 3;
					let periode_recette = [
						{
							id_periode: idPer + 1, //to calcule 1,2,3, vont par paire de 3
							id_calendrier: id,
							is_recette: this.formData.matinCheck,
							periode: "matin",
							nb_personne: this.formData.nb_personne,
							recette: null,
							id_recette: null,
							tags: this.formData.tagsMatin,
							suggestion: null,
						},
						{
							id_periode: idPer + 2,
							id_calendrier: id,
							is_recette: this.formData.midiCheck,
							periode: "midi",
							nb_personne: this.formData.nb_personne,
							recette: null,
							id_recette: null,
							tags: this.formData.tagsMidi,
							suggestion: null,
						},
						{
							id_periode: idPer + 3,
							id_calendrier: id,
							is_recette: this.formData.soirCheck,
							periode: "soir",
							nb_personne: this.formData.nb_personne,
							recette: null,
							id_recette: null,
							tags: this.formData.tagsSoir,
							suggestion: null,
						},
					];

					this.items.push({
						id_calendrier: id,
						date: this.jours[i],
						calendrier_recettes: periode_recette,
					});

					id += 1;
				}
				
			},
			//event quand on clique sur page suivante
			nextPageMenu() {
				let iStart = (this.page - 1) * 7;
				let iEnd = this.page * 7;
				this.populateHeader(iStart, iEnd);
				this.fillPlat(iStart, iEnd);
			},
			//event quand on clique sur page precedente
			previousPageMenu() {
				// p1 : 0 -> 7 (6)   , P2 : 7 -> 14 (13)
				let iStart = (this.page - 1) * 7;
				let iEnd = this.page * 7;
				this.populateHeader(iStart, iEnd);
				this.fillPlat(iStart, iEnd);
			},
			changePageEvent(newPage) {
				let iStart = (newPage - 1) * 7;
				let iEnd = newPage * 7;
				this.populateHeader(iStart, iEnd);
				this.fillPlat(iStart, iEnd);
			},

			/// UPDATE
			updateMenuJour(item) {				
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
					if (this.formData.nbPlatMatin !== null) {
						this.errorMessage.message = checkContrainte.verifContraintePlat(
							this.items,
							this.formData.nbPlatMatin,
							0
						);
					}
				} else if (item.periode === "midi") {
					menuJourOld.calendrier_recettes[1] = structuredClone(item);
					if (this.formData.nbPlatMidi !== null) {
						this.errorMessage.message = checkContrainte.verifContraintePlat(
							this.items,
							this.formData.nbPlatMidi,
							1
						);
					}
				} else if (item.periode === "soir") {
					menuJourOld.calendrier_recettes[2] = structuredClone(item);
					if (this.formData.nbPlatSoir !== null) {
						this.errorMessage.message = checkContrainte.verifContraintePlat(
							this.items,
							this.formData.nbPlatSoir,
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
					this.fillPlat(iStart, iEnd);
					this.errorMessage.error = false;
				}
			},

			closeDialogModification(){			
				this.showDialog = false
			},

			creationMenuDone() {
				let menuNew = {
					id_menu: null,
					id_famille: this.$store.state.info.idFamilleActuel,
					periode_debut: moment(this.formData.periode_debut).format("DD/MM/YYYY"),
					periode_fin: moment(this.formData.periode_fin).format("DD/MM/YYYY"),
					plat_identique_matin: this.formData.nbPlatMatin === null ? -1 : this.formData.nbPlatMatin ,
					plat_identique_midi: this.formData.nbPlatMidi === null ? -1 : this.formData.nbPlatMidi,
					plat_identique_soir: this.formData.nbPlatSoir === null ? -1 : this.formData.nbPlatSoir,
					type: this.formData.choixTypeMenu,
					verrou: false,
					days_until_suggestion: this.formData.daysUntilSuggestion,
					calendriers: structuredClone(this.items),
				};							
				
				if(this.i===0) DAOMenu.sendMenuCreate(menuNew); // prevent to send multiple times to api
				this.i+=1
			
				this.$router.push("/");
			},
		},
	};
</script>

<style lang="sass">
.v-data-table
  white-space: pre-wrap

.tdplat
  text-align: center

.marginClass
  margin-top: 20px
  margin-bottom: 20px
</style>