<template>
	<div>
		<v-card>
			<v-form
				ref="form"
				v-model="valid"
				lazy-validation
			>
				<h3>Période :</h3>
				<v-container class="px-0" fluid>
					<v-radio-group
						v-model="form.choixPeriode"
						row
						@change="
							() => {
								textFieldDisabled = false;
								textFieldFinDisabled = false;								
							}
						"					
						required
						:rules="ruleRadioButton"
					>
						<v-radio
							label="semaine"
							value="semaine"
							@click="changeValueSemaine"
						></v-radio>
						<v-radio
							label="personnalisé"
							value="personalise"
							@click="textFieldFinDisabled = false"
						></v-radio>
					</v-radio-group>
				</v-container>

				<v-row>
					<v-col cols="12" sm="6" md="4">
						<v-menu
							ref="menu"
							v-model="menu"
							:close-on-content-click="false"						
							transition="scale-transition"
							offset-y
							min-width="auto"
							:disabled="textFieldDisabled"
						>
							<template v-slot:activator="{ on, attrs }">
								<v-text-field
									v-model="computedDateFormattedDebut"
									label="Début"
									prepend-icon="mdi-calendar"
									readonly
									v-bind="attrs"
									v-on="on"
									required
									:rules="[checkDateDebut]"
								></v-text-field>
							</template>
							<v-date-picker
								v-model="form.dateDebut"
								no-title
								scrollable
								locale="fr"
								:first-day-of-week="1"
								:min="minDateToday"
							>
								<v-spacer></v-spacer>
								<v-btn text color="green" @click="menu = false">
									Annuler
								</v-btn>
								<v-btn text color="green" @click="$refs.menu.save(form.dateDebut)">
									OK
								</v-btn>
							</v-date-picker>
						</v-menu>
					</v-col>
					<v-spacer></v-spacer>
					<v-col cols="12" sm="6" md="4">
						<v-menu
							ref="menu2"
							v-model="menu2"
							:close-on-content-click="false"
							transition="scale-transition"
							offset-y
							min-width="auto"
							:disabled="textFieldFinDisabled"
						>
							<template v-slot:activator="{ on, attrs }">
								<v-text-field
									v-model="computedDateFormattedFin"
									label="Fin"
									prepend-icon="mdi-calendar"
									readonly
									v-bind="attrs"
									v-on="on"
									required
									:rules="[checkDateFin]"
								></v-text-field>
							</template>
							<v-date-picker
								v-model="form.dateFin"
								no-title
								scrollabe
								locale="fr"
								:first-day-of-week="1"
								:min="minDateToday"
							>
								<v-spacer></v-spacer>
								<v-btn text color="green" @click="menu2 = false">
									Annuler
								</v-btn>
								<v-btn text color="green" @click="$refs.menu2.save(form.dateFin)">
									OK
								</v-btn>
							</v-date-picker>
						</v-menu>
					</v-col>
					<v-spacer></v-spacer>
				</v-row>

				<br />
				<v-checkbox v-model="form.matinCheck" label="Matin"></v-checkbox>

				<v-checkbox v-model="form.midiCheck" label="Midi"></v-checkbox>

				<v-checkbox v-model="form.soirCheck" label=" Soir"></v-checkbox>
				<br />

				<v-container grid-list-xl fluid>
					<v-row wrap>
						<v-col xs12 sm6 md3>
							<h3>Nombre de personnes :</h3>
							<v-text-field
								type="number"
								step="any"
								min="0"
								ref="input"
								:rules="nbPlatRule"
								v-model.number="form.nbPersonnes"
								required
							></v-text-field>
						</v-col>
					</v-row>
				</v-container>

				<v-container fluid>
					<v-row>
						<v-col cols="12" sm="4" md="4" lg="4" xl="4">
							<v-card>
								<v-card-title> Matin </v-card-title>
								<v-card-subtitle>
									Plats identiques autorisés :
								</v-card-subtitle>
								<v-card-text>
									<v-text-field
										type="number"
										step="any"
										min="0"
										ref="input"
										:rules="nbPlatRule"
										v-model.number="form.nbPlatMatin"
										required
									></v-text-field>
								</v-card-text>
								<v-divider></v-divider>
								<v-card-subtitle> Tags </v-card-subtitle>
								<v-card-text>
									<v-autocomplete
										chips
										clearable
										deletable-chips
										multiple
										:items="tagsListe"
										v-model="form.tagsMatin"
										color="orange lighten-2"
										no-data-text="Aucun tag correspondant"
									></v-autocomplete>
								</v-card-text>
							</v-card>
						</v-col>
						<v-col cols="12" sm="4" md="4" lg="4" xl="4">
							<v-card>
								<v-card-title> Midi </v-card-title>
								<v-card-subtitle>
									Plats identiques autorisés :
								</v-card-subtitle>
								<v-card-text>
									<v-text-field
										type="number"
										step="any"
										min="0"
										ref="input"
										:rules="nbPlatRule"
										v-model.number="form.nbPlatMidi"
										required
									></v-text-field>
								</v-card-text>
								<v-divider></v-divider>
								<v-card-subtitle> Tags </v-card-subtitle>
								<v-card-text>
									<v-autocomplete
										chips
										clearable
										deletable-chips
										multiple
										:items="tagsListe"
										v-model="form.tagsMidi"
										color="orange lighten-2"
										no-data-text="Aucun tag correspondant"
									></v-autocomplete>
								</v-card-text>
							</v-card>
						</v-col>

						<v-col cols="12" sm="4" md="4" lg="4" xl="4">
							<v-card>
								<v-card-title> Soir </v-card-title>
								<v-card-subtitle>
									Plats identiques autorisés :
								</v-card-subtitle>
								<v-card-text>
									<v-text-field
										type="number"
										step="any"
										min="0"
										ref="input"
										:rules="nbPlatRule"
										v-model.number="form.nbPlatSoir"
										required
									></v-text-field>
								</v-card-text>
								<v-divider></v-divider>
								<v-card-subtitle> Tags </v-card-subtitle>
								<v-card-text>
									<v-autocomplete
										chips
										clearable
										deletable-chips
										multiple
										:items="tagsListe"
										v-model="form.tagsSoir"
										color="orange lighten-2"
										no-data-text="Aucun tag correspondant"
									></v-autocomplete>
								</v-card-text>
							</v-card>
						</v-col>
					</v-row>
				</v-container>

				<v-container class="px-0" fluid>
					<h3>Type de menu :</h3>
					<v-radio-group
						v-model="form.choixTypeMenu"
						row
						@change="disabledChoixAutomatique"
						required
						:rules="ruleRadioButton"
					>
						<v-radio label="Manuel (mode suggestion)" value="manuel"></v-radio>
						<v-radio label="Automatique" value="automatique"></v-radio>
					</v-radio-group>
					<br />
					<v-radio-group
						v-model="form.choixMenuAutomatique"
						row
						:disabled="disabledChoixMenuAutomatique"
					>
						<v-radio label="Favoris" value="favoris"></v-radio>
						<v-radio label="Historique" value="historique"></v-radio>
					</v-radio-group>
				</v-container>
			</v-form>
		</v-card>
	</div>
</template>

<script>
	import { eventBus } from "../main";
	export default {
		name: "ConstraintCalendar",
		data() {
			return {
				form:{
					matinCheck: false,
					midiCheck: false,
					soirCheck: false,		
					nbPersonnes: null,
					nbPlatMatin: null,
					nbPlatMidi: null,
					nbPlatSoir: null,
					choixPeriode: null,
					choixTypeMenu: "manuel",
					choixMenuAutomatique: null,
					dateDebut: null,
					dateFin: null,
					tagsMatin: null,
					tagsMidi: null,
					tagsSoir: null,
				},

				valid: true,
				textFieldDisabled: true,
				textFieldFinDisabled: false,
				menu: false,
				menu2: false,
				disabledChoixMenuAutomatique: true,
				tagsListe: ["sel", "sucre", "lunch"],			

				nbPlatRule: [
					v => !!v || 'Champ requis',
					v => (v && v > 0) || 'Chiffre supérieur à 0',
				],
				ruleRadioButton: [
					v => !!v || 'Champ requis'
				],

			};
		},
		mounted() {
			//
		},
		created() {
			eventBus.$on('validateFormContrainte', this.validateForm);
		},
		watch: {
			computedDateFormattedDebut() {
				if ((this.form.choixPeriode === "semaine") & (this.form.dateDebut != null)) {
					let date = new Date(this.form.dateDebut);
					// add 7 days
					let newDate = new Date();
					newDate = this.addDays(date, 6);

					let month = newDate.getMonth() < 10 ? '0'+(newDate.getMonth()+ 1):(newDate.getMonth()+ 1)
					let day = newDate.getDate() < 10 ? '0'+newDate.getDate() : newDate.getDate()
					let year = newDate.getFullYear();
					this.form.dateFin = year + "-" + month + "-" + day;
				}
			}
		},
		methods: {
			formatDate(date) {
				if (!date) return null;
				const [year, month, day] = date.split("-");
				return `${day}/${month}/${year}`;
			},
			disabledChoixAutomatique() {
				if (!this.disabledChoixMenuAutomatique) {
					this.form.choixMenuAutomatique = "null";
				}
				this.disabledChoixMenuAutomatique = !this.disabledChoixMenuAutomatique;
			},
			addDays(date, days) {
				var result = new Date(date);
				result.setDate(result.getDate() + days);
				return result;
			},
			checkDateDebut(){
				if(this.form.dateDebut === null) return 'Champs requis'
				return this.checkDate()
			},
			checkDateFin(){
				if(this.form.dateFin === null) return 'Champs requis'
				return this.checkDate()
			},
			checkDate() {						
				if (
					(this.form.dateDebut != null & this.form.dateFin != null &
					this.form.choixPeriode === "personalise")
				) {
					console.log("check date")
					let debut = new Date(this.form.dateDebut);
					let fin = new Date(this.form.dateFin);
					if(debut > fin) return 'Date de fin inférieure à la date de début'
					console.log(debut.getTime())
					console.log(fin.getTime())
					if(debut.getTime() === fin.getTime()) return 'Veuillez entrez une période de plus d\'un jour'
				}
				return true
			},
			changeValueSemaine(){			
				if(this.form.dateDebut != null){
					let date = new Date(this.form.dateDebut);
					// add 7 days
					let newDate = new Date();
					newDate = this.addDays(date, 6);

					let month = newDate.getMonth() < 10 ? '0'+(newDate.getMonth()+ 1):(newDate.getMonth()+ 1)
					let day = newDate.getDate() < 10 ? '0'+newDate.getDate() : newDate.getDate()
					let year = newDate.getFullYear();
					this.form.dateFin = year + "-" + month + "-" + day;
				}

				this.textFieldFinDisabled = true
			},
			validateForm() {
				console.log("validate");		
				if(this.$refs.form.validate()){
					eventBus.$emit('formValideOK')
				}

			},
		},
		computed: {
			computedDateFormattedDebut() {
				return this.formatDate(this.form.dateDebut);
			},
			computedDateFormattedFin() {
				return this.formatDate(this.form.dateFin);
			},
			minDateToday(){
				let newDate = new Date();			
				let month = newDate.getMonth() < 10 ? '0'+(newDate.getMonth()+ 1):(newDate.getMonth()+ 1)
				let day = newDate.getDate() < 10 ? '0'+newDate.getDate() : newDate.getDate()
				let year = newDate.getFullYear();
				console.log(year + "-" + month + "-" + day)
				return year + "-" + month + "-" + day;
			}
		},
	};
</script>

<style lang="sass">
.v-input--selection-controls.v-input
  display: inline-block
  margin: 10px

.v-application .primary--text
  color: #9CCC65 /*#FFB74D*/ !important
  caret-color: #9CCC65 /*#FFB74D*/ !important

.v-application .accent
  background-color: #9CCC65 !important
  border-color: #9CCC65 !important

.v-application .accent--text
  color: #9CCC65 /*#FFB74D*/ !important
  caret-color: #9CCC65 /*#FFB74D*/ !important

.v-card
  padding: 5px
</style>
.
