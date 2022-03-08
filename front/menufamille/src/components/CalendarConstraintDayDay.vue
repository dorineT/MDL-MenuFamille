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
									<p v-else-if="item.Plat === null" style="color: green">
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
									<p v-else-if="item.Plat === null" style="color: green">
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
									<p v-else-if="item.Plat === null" style="color: green">
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
	export default {
		props: ["formData"],
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
			};
		},
		mounted() {
			if (this.formData != null) {
				this.populateTabJours();

				let indiceEnd = this.jours.length < 7 ? this.jours.length : 7;
				this.populateHeader(0, indiceEnd);
				this.fillPlat(0, indiceEnd);
			}
		},
		methods: {
			goToRecette(item, periode) {
				console.log("recette click" + item + " " + periode);
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

				let i = iStart + iEnd;
				let j = iEnd + iEnd;

				while ((iStart < iEnd) & (iStart < this.jours.length)) {
					this.platsMatin.push({
						id: iStart,
						Plat: this.formData.matinCheck ? null : "/",
						NbPers: this.formData.nbPersonnes,
						Tags: this.formData.tagsMatin,
					});

					this.platsMidi.push({
						id: i,
						Plat: this.formData.midiCheck ? null : "/",
						NbPers: this.formData.nbPersonnes,
						Tags: this.formData.tagsMidi,
					});

					this.platsSoir.push({
						id: j,
						Plat: this.formData.soirCheck ? null : "/",
						NbPers: this.formData.nbPersonnes,
						Tags: this.formData.tagsSoir,
					});

					iStart++;
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
		},
	};
</script>

<style lang="sass">
.v-data-table
  white-space: pre-wrap

.tdplat
  text-align: center
</style>