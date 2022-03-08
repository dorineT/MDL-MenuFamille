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
									<p v-if="item.Plat === '/'" style="color: red">X</p>
									<p v-else-if="item.Plat === ''" style="color: green">
										<v-icon color="green" large>mdi-plus</v-icon>
									</p>
									<p v-else>{{ item.Plat }}</p>
								</v-btn>
								<p v-if="item.NbPers !== formData.nbPersonnes">
									{{ item.NbPers }} personnes
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
									<p v-if="item.Plat === '/'" style="color: red">X</p>
									<p v-else-if="item.Plat === ''" style="color: green">
										<v-icon color="green" large>mdi-plus</v-icon>
									</p>
									<p v-else>{{ item.Plat }}</p>
								</v-btn>
								<p v-if="item.NbPers !== formData.nbPersonnes">
									{{ item.NbPers }} personnes
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
									<p v-if="item.Plat === '/'" style="color: red">X</p>
									<p v-else-if="item.Plat === ''" style="color: green">
										<v-icon color="green" large>mdi-plus</v-icon>
									</p>
									<p v-else>{{ item.Plat }}</p>
								</v-btn>
								<p v-if="item.NbPers !== formData.nbPersonnes">
									{{ item.NbPers }} personnes
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
			};
		},

		created() {
			console.log("created days days");
			//if(!this.alreadyAbonne){
			console.log("abonnement");
			eventBus.$on("updateMenuJourCreate", this.updateMenuJourCreate);
			eventBus.$on("configurationDD", this.setUpData);

			//}
		},
		methods: {
			goToRecette(item, periode) {
				console.log("recette click" + item + " " + periode);
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
						Plat: jourPlat.Matin,
						NbPers: jourPlat.MatinNbPers,
						Tags: jourPlat.TagsMatin,
					});

					this.platsMidi.push({
						id: jourPlat.id,
						Plat: jourPlat.Midi,
						NbPers: jourPlat.MidiNbPers,
						Tags: jourPlat.TagsMidi,
					});

					this.platsSoir.push({
						id: jourPlat.id,
						Plat: jourPlat.Soir,
						NbPers: jourPlat.SoirNbPers,
						Tags: jourPlat.TagsSoir,
					});

					iStart++;
				}
			},
			fillItems() {
				this.items = []
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
						Matin: this.formData.matinCheck ? "" : "/",
						MatinNbPers: this.formData.nbPersonnes,
						TagsMatin: this.formData.tagsMatin,
						Midi: this.formData.midiCheck ? "" : "/",
						MidiNbPers: this.formData.nbPersonnes,
						TagsMidi: this.formData.tagsMidi,
						Soir: this.formData.soirCheck ? "" : "/",
						SoirNbPers: this.formData.nbPersonnes,
						TagsSoir: this.formData.tagsSoir,
					});
				}

				console.log(this.items);
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
				console.log("update calendrier configuration " + periode);

				let menuJourOld = this.items.find((elem) => elem.id === item.id);			

				let newTags = [];
				item.TagsChoix.forEach((el) => {
					newTags.push(el);
				});

				if (periode === "matin") {
					menuJourOld.Matin = item.Plat;
					menuJourOld.MatinNbPers = item.NbPers;
					menuJourOld.TagsMatin = newTags;
				} else if (periode === "midi") {
					menuJourOld.Midi = item.Plat;
					menuJourOld.MidiNbPers = item.NbPers;
					menuJourOld.TagsMidi = newTags;
				} else if (periode === "soir") {
					menuJourOld.Soir = item.Plat;
					menuJourOld.SoirNbPers = item.NbPers;
					menuJourOld.TagsSoir = newTags;
				}

				let iStart = (this.page - 1) * 7
				let iEnd = this.page * 7
				this.fillPlat(iStart, iEnd)
			},
		},
	};
</script>

<style lang="sass">
.v-data-table
  white-space: pre-wrap

.tdplat
  text-align: center
</style>