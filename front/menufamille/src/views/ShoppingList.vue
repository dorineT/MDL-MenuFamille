<template>
	<v-card class="cardShopping">
		<v-container fluid>
			<v-row class="d-flex justify-end">
				<v-col>
					<v-select
						color="orange lighten-2"
						label="Choix du menu"
						class="combobox-class"
						menu-props="auto"
						no-data-text="Aucun menu disponible"
						:items="itemPeriode"
						return-object
						v-model="comboboxMenuSelected"
					>
					</v-select>
				</v-col>
				<v-col cols="12" sm="12" md="3" lg="3" xl="3">
					<v-select
						v-model="selectedFamille"
						:items="famille"
						menu-props="auto"
						label="Famille"
						hide-details
						prepend-icon="mdi-account-group"
						single-line
						no-data-text="Aucune famille disponible"
						@change="changeFamille()"
					></v-select>
				</v-col>
			</v-row>
		</v-container>

		<div v-if="comboboxMenuSelected === null">
			<v-img
				:aspect-ratio="16 / 9"
				contain
				max-height="400"
				src="../assets/selectMenu.png"
			>
			</v-img>
		</div>

		<v-container v-else class="containShop ml-3" fluid>
			<v-row>
				<v-col cols="12" sm="6" md="6" lg="6" xl="6">
					<v-card elevation="16" max-width="700" class="listeDenree">
						<v-card-title>
							<v-row justify-space-between>
								<v-col> Liste de courses </v-col>
								<v-col cols="2" sm="2" md="2" lg="2" xl="2">
									<v-btn fab dark color="#9CCC65" @click="generatePDF">
										<v-icon dark> mdi-file-download-outline </v-icon>
									</v-btn>
								</v-col>
							</v-row>
						</v-card-title>

						<v-card-text>
							<v-virtual-scroll
								:items="items"
								:height="calculatedHeight"
								item-height="70"
								v-if="items.length > 0"
							>
								<template v-slot:default="{ item }">
									<v-list-item :key="item.nom">
										<v-list-item-content>
											<v-list-item-title>
												<span>
													<strong> {{ item.nom }}</strong>
												</span>
											</v-list-item-title>
										</v-list-item-content>

										<v-list-item-action>
											<p>Quantité : {{ item.quantite }}</p>
										</v-list-item-action>
									</v-list-item>
									<v-divider></v-divider>
								</template>
							</v-virtual-scroll>
							<h2 v-else>Liste de courses vide</h2>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</v-card>
</template>


<script>
	import jsPDF from "jspdf";
	import MenuDao from "../services/api.menu";
	let DAOMenu = new MenuDao();

	export default {
		data() {
			return {
				selectedFamille: null,
				famille: [],
				itemPeriode: [],
				comboboxMenuSelected: null,

				//course
				items: [],
			};
		},

		async mounted() {
			this.$store.state.auth.user.roles.forEach((element) => {
				this.famille.push(element[1]);
			});
			if (this.$store.state.info.nomFamille !== null) {
				this.selectedFamille = this.$store.state.info.nomFamille;
				this.itemPeriode = [];
				this.i = 0;
				await this.getLockedMenu();
			} else {
				this.selectedFamille = this.famille.length > 0 ? this.famille[0] : null;
				this.changeFamille();
			}
		},
		computed: {
			calculatedHeight() {
				let x = 350;
				switch (this.$vuetify.breakpoint.name) {
					case "xs":
						return this.$vuetify.breakpoint.height - x;
					case "sm":
						return this.$vuetify.breakpoint.height - x;
					case "md":
						return this.$vuetify.breakpoint.height - x;
					case "lg":
						return this.$vuetify.breakpoint.height - x;
					case "xl":
						return this.$vuetify.breakpoint.height - x;
				}
			},
		},
		watch: {
			comboboxMenuSelected(slot) {
				if (this.comboboxMenuSelected === null) return;

				DAOMenu.getShopList(slot.value).then((response) => {
					this.items = response.data;
				});
			},
		},
		methods: {
			async changeFamille() {
				//select les menus correspondants
				if (this.selectedFamille !== null) {
					let famille = this.$store.state.auth.user.roles.find(
						(el) => el[1] === this.selectedFamille
					);
					// change store value
					this.$store.dispatch("info/changeFamille", [
						famille[0],
						famille[1],
						famille[2],
						famille[3],
					]);
					this.itemPeriode = [];
					this.i = 0;
					await this.getLockedMenu();
				}
			},
			getLockedMenu() {
				this.itemPeriode = [];
				DAOMenu.getMenuLock(this.$store.state.info.idFamilleActuel).then(
					(response) => {
						let menus = response.data;
						menus.forEach((menu) => {
							let periode = {
								text: menu.periode_debut + " - " + menu.periode_fin,
								value: menu.id_menu,
							};
							this.i += 1;
							this.itemPeriode.push(periode);
						});
					}
				);
			},
			generatePDF() {
				console.log(this.comboboxMenuSelected);
				let pdfName = "Liste"+this.comboboxMenuSelected.text;
				var doc = new jsPDF("p", "mm", "a4");

				let normalSize = 16;
				let subTitle = 18;
				let lMargin = 20; //left margin in mm
				let rMargin = 20; //right margin in mm
				let pdfInMM = 210;


				//config
				doc.setFont("times");
				//doc.setFontType("bolditalic");
				doc.setLineWidth(0.5);

				//text
				doc.setFontSize(18);

				doc.text(20, 25, "Liste de la période: "+this.comboboxMenuSelected.text);
				doc.line(20, 35, 190, 35);

				doc.setFontSize(14);
        let y = 50
        this.items.forEach( el => {
          let mesurePlu = el.mesure === "unité" ? (el.quantite > 1 ? "unités" : "unité") : el.mesure
          doc.text(30, y, "- "+ el.nom + ", quantité: " + el.quantite + " " + mesurePlu);
          y+=10
        })
				

				doc.save(pdfName + ".pdf");
			},
		},
	};
</script>

<style lang="sass">
.cardShopping
  margin: 10px
</style>


