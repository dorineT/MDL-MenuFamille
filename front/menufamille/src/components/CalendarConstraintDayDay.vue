<template>
	<v-card v-if="formData != null">
		<div style="margin: 4px">
			<div style="margin: 4px">
				Menu : du {{ formData.dateDebut }} au {{ formData.dateFin }}
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
							<td
								class="tdplat"
								v-for="(item, i) in platsMatin"
								:key="i + 'matin'"
							>
								<v-btn text @click="goToRecette(item, 'matin')">

									<p
										v-if="(item.plat === '') & (item.tags.length > 0)"
										style="color: green"
									>
										<strong>Tags</strong>
									</p>
									<p v-else-if="item.plat === '/'" style="color: red">X</p>
									<p v-else-if="item.plat === ''" style="color: green">
										<v-icon color="green" large>mdi-plus</v-icon>
									</p>
									<p v-else>{{ item.plat }}</p>
								</v-btn>
								<p v-if="item.nbPers !== formData.nbPersonnes">
									{{ item.nbPers }} personnes
								</p>

							</td>
						</tr>
						<tr>
							<td
								class="tdplat"
								v-for="(item, i) in platsMidi"
								:key="i + 'midi'"
							>
								<v-btn text @click="goToRecette(item, 'midi')">
									<p
										v-if="(item.plat === '') & (item.tags.length > 0)"
										style="color: green"
									>
										<strong>Tags</strong>
									</p>
									<p v-else-if="item.plat === '/'" style="color: red">X</p>
									<p v-else-if="item.plat === ''" style="color: green">
										<v-icon color="green" large>mdi-plus</v-icon>
									</p>
									<p v-else>{{ item.plat }}</p>
								</v-btn>
								<p v-if="item.nbPers !== formData.nbPersonnes">
									{{ item.nbPers }} personnes
								</p>
							</td>
						</tr>
						<tr>
							<td
								class="tdplat"
								v-for="(item, i) in platsSoir"
								:key="i + 'soir'"
							>
								<v-btn text @click="goToRecette(item, 'soir')">
									<p
										v-if="(item.plat === '') & (item.tags.length > 0)"
										style="color: green"
									>
										<strong>Tags</strong>
									</p>
									<p v-else-if="item.plat === '/'" style="color: red">X</p>
									<p v-else-if="item.plat === ''" style="color: green">
										<v-icon color="green" large>mdi-plus</v-icon>
									</p>
									<p v-else>{{ item.plat }}</p>
								</v-btn>
								<p v-if="item.nbPers !== formData.nbPersonnes">
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
		</div>
		<v-snackbar v-model="errorMessage.error" text color="red">
			{{ errorMessage.matin }}
			{{ errorMessage.midi }}
			{{ errorMessage.soir }}
		</v-snackbar>
	</v-card>

</template>

<script>
	import { eventBus } from "../main";
	export default {
		data() {
			return {
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
					matin: "",
					midi: "",
					soir: "",
					error: false,
				},
			};
		},

		created() {
			eventBus.$on("updateMenuJourCreate", this.updateMenuJourCreate);
			eventBus.$on("configurationDD", this.setUpData);
			eventBus.$on('creationMenuDone', this.creationMenuDone)
		},
		destroyed(){
			eventBus.$off("updateMenuJourCreate")
			eventBus.$off("configurationDD")
			eventBus.$off('creationMenuDone')
		},
		methods: {
			goToRecette(item, periode) {
				let menuFind = this.items.find((el) => el.id === item.id);
				eventBus.$emit("openDialog", item, periode, menuFind.jour, menuFind.date);
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
				let fin = new Date(this.formData.dateFin);
				let actuel = new Date(this.formData.dateDebut);
				this.jours = [];

				while (actuel.getTime() <= fin.getTime()) {
					let newDate = new Date(actuel.getTime());
					this.jours.push(newDate);
					actuel.setDate(actuel.getDate() + 1);
				}
			},
			populateHeader(iStart, iEnd) {
				this.headers = [];
				this.nbJourMenu = 0;
				// 7 jour max display dans le cal
				while (
					(this.nbJourMenu < 7) &
					(iStart < this.jours.length) &
					(iStart < iEnd)
				) {
					let newDate = this.jours[iStart];

					let month =
						newDate.getMonth() < 10
							? "0" + (newDate.getMonth() + 1)
							: newDate.getMonth() + 1;
					let day =
						newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate();

					let stringDate =
						this.getNameOfDay(newDate.getDay()) + "\n" + day + "/" + month;
					this.headers.push({
						text: stringDate,
						align: "center",
						value: iStart,
					});
					iStart++;
					this.nbJourMenu++;
				}
			},
			getNameOfDay(day) {
				if (day == 0) return "Dimanche";
				else if (day == 1) return "Lundi";
				else if (day == 2) return "Mardi";
				else if (day == 3) return "Mercredi";
				else if (day == 4) return "Jeudi";
				else if (day == 5) return "Vendredi";
				return "Samedi";
			},
			fillPlat(iStart, iEnd) {
				this.platsMatin = [];
				this.platsMidi = [];
				this.platsSoir = [];

				while ((iStart < iEnd) & (iStart < this.items.length)) {
					let jourPlat = this.items[iStart];

					this.platsMatin.push({
						id: jourPlat.id,
						plat: jourPlat.matin,
						nbPers: jourPlat.matinNbPers,
						tags: jourPlat.tagsMatin,
					});

					this.platsMidi.push({
						id: jourPlat.id,
						plat: jourPlat.midi,
						nbPers: jourPlat.midiNbPers,
						tags: jourPlat.tagsMidi,
					});

					this.platsSoir.push({
						id: jourPlat.id,
						plat: jourPlat.soir,
						nbPers: jourPlat.soirNbPers,
						tags: jourPlat.tagsSoir,
					});

					iStart++;
				}
			},
			fillItems() {
				this.items = [];
				for (let i = 0; i < this.jours.length; i++) {
					let month =
						this.jours[i].getMonth() < 10
							? "0" + (this.jours[i].getMonth() + 1)
							: this.jours[i].getMonth() + 1;
					let day =
						this.jours[i].getDate() < 10
							? "0" + this.jours[i].getDate()
							: this.jours[i].getDate();

					this.items.push({
						id: i,
						jour: this.getNameOfDay(this.jours[i].getDay()),
						date: day + "/" + month,
						matin: this.formData.matinCheck ? "" : "/",
						matinNbPers: this.formData.nbPersonnes,
						tagsMatin: this.formData.tagsMatin,
						midi: this.formData.midiCheck ? "" : "/",
						midiNbPers: this.formData.nbPersonnes,
						tagsMidi: this.formData.tagsMidi,
						soir: this.formData.soirCheck ? "" : "/",
						soirNbPers: this.formData.nbPersonnes,
						tagsSoir: this.formData.tagsSoir,
					});
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
			updateMenuJourCreate(item, periode) {				

				let menuJourOld = this.items.find((elem) => elem.id === item.id);

				let menuJourSave = {
					id: menuJourOld.id,
					jour: menuJourOld.jour,
					date: menuJourOld.date,
					matin: menuJourOld.matin,
					matinNbPers: menuJourOld.matinNbPers,
					tagsMatin: menuJourOld.tagsMatin,
					midi: menuJourOld.matin,
					midiNbPers: menuJourOld.matinNbPers,
					tagsMidi: menuJourOld.tagsMatin,
					soir: menuJourOld.matin,
					soirNbPers: menuJourOld.matinNbPers,
					tagsSoir: menuJourOld.tagsMatin,
				};	

				let newTags = [];
				item.tagsChoix.forEach((el) => {
					newTags.push(el);
				});

				if (periode === "matin") {
					menuJourOld.matin = item.plat;
					menuJourOld.matinNbPers = item.nbPers;
					menuJourOld.tagsMatin = newTags;

					if(this.formData.nbPlatMatin !== null){
						this.errorMessage.matin = this.verifContraintePlatMatin();
					}

				} else if (periode === "midi") {
					menuJourOld.midi = item.plat;
					menuJourOld.midiNbPers = item.nbPers;
					menuJourOld.tagsMidi = newTags;

					if(this.formData.nbPlatMidi !== null){
						this.errorMessage.midi = this.verifContraintePlatMidi();
					}
				} else if (periode === "soir") {
					menuJourOld.soir = item.plat;
					menuJourOld.soirNbPers = item.nbPers;
					menuJourOld.tagsSoir = newTags;

					if(this.formData.nbPlatSoir !== null){
						this.errorMessage.soir = this.verifContraintePlatSoir();
					}
				}

				if (
					(this.errorMessage.matin !== "") |
					(this.errorMessage.midi !== "") |
					(this.errorMessage.soir !== "")
				) {				
					menuJourOld = menuJourSave;
					this.errorMessage.error = true;
				} else {
					let iStart = (this.page - 1) * 7;
					let iEnd = this.page * 7;
					this.fillPlat(iStart, iEnd);
					this.errorMessage.error = false;
				}
			},

			verifContraintePlatMatin() {
				const count = {};

				this.items.forEach((element) => {
					if ((element.midi !== "/") & (element.matin != "")) {
						if (count[element.matin]) {
							count[element.matin] += 1;
						} else {
							count[element.matin] = 1;
						}
					}
				});

				for (const item in count) {
					if (count[item] > this.formData.nbPlatMatin) {
						return "Contrainte de plat identique non respectée pour le matin";
					}
				}
				return "";
			},

			verifContraintePlatMidi() {
				const count = {};

				this.items.forEach((element) => {
					if ((element.midi !== "/") & (element.midi != "")) {
						if (count[element.midi]) {
							count[element.midi] += 1;
						} else {
							count[element.midi] = 1;
						}
					}
				});

				for (const item in count) {					
					if (count[item] > this.formData.nbPlatMidi) {
						return "Contrainte de plat identique non respectée pour le midi";
					}
				}
				return "";
			},
			verifContraintePlatSoir() {
				const count = {};

				this.items.forEach((element) => {
					if ((element.midi !== "/") & (element.soir != "")) {
						if (count[element.soir]) {
							count[element.soir] += 1;
						} else {
							count[element.soir] = 1;
						}
					}
				});

				for (const item in count) {				
					if (count[item] > this.formData.nbPlatSoir) {
						return "Contrainte de plat identique non respectée pour le soir";
					}
				}
				return "";
			},

			creationMenuDone(){
				let menuNew = {
					menu_id: null,
					dateDebut: this.formData.dateDebut,
					dateFin: this.formData.dateFin,
					verrou: false,
					plats: this.items
				}
				this.$router.push('/');
			}
		},
	};
</script>

<style lang="sass">
.v-data-table
  white-space: pre-wrap

.tdplat
  text-align: center
</style>