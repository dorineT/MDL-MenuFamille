<template>
	<v-card>
		<div style="margin: 4px">
			<div style="margin: 4px">Menu : du {{ formData.dateDebut }}  au {{formData.dateFin}}</div>

			<v-data-table
				:headers="headers"
				:items="items"
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
					<tbody v-if="items.length === 0">
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
									<p v-if="item.Plat !== '/'">{{ item.Plat }}</p>
									<p v-else style="color: red">X</p>
								</v-btn>
								<p v-if="item.NbPers !== null">{{ item.NbPers }} personnes</p>
							</td>
						</tr>
						<tr>
							<td
								class="tdplat"
								v-for="(item, i) in platsMidi"
								:key="i + 'midi'"
							>
								<v-btn text @click="goToRecette(item, 'midi')">
									<p v-if="item.Plat !== '/'">{{ item.Plat }}</p>
									<p v-else style="color: red">X</p>
								</v-btn>
								<p v-if="item.NbPers !== null">{{ item.NbPers }} personnes</p>
							</td>
						</tr>
						<tr>
							<td
								class="tdplat"
								v-for="(item, i) in platsSoir"
								:key="i + 'soir'"
							>
								<v-btn text @click="goToRecette(item, 'soir')">
									<p v-if="item.Plat !== '/'">{{ item.Plat }}</p>
									<p v-else style="color: red">X</p>
								</v-btn>
								<p v-if="item.NbPers !== null">{{ item.NbPers }} personnes</p>
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
        items: [],
        pageCount: 0,
        page: 1,
        nbJourMenu: 0,
        platsMatin:[],
        platsMidi: [],
        platsSoir: []   
      };
		},
		created() {
			console.log("created " + this.formData);
		},
		mounted() {
			console.log("mounted");
			console.log(this.formData);
      this.populateHeader()
		},
    methods:{
      goToRecette(item,periode){
        console.log('recette click')
      },
      populateHeader(){
          
        let fin = new Date(this.formData.dateFin)
        let actuel = new Date(this.formData.dateDebut)
        let jours = []

        while(actuel.getTime <= fin.getTime()){
          console.log(actuel)
          jours.push(actuel)
          actuel.setDate(actuel.getDate() + 1)
        }

        console.log(jours)
      },
      fillPlat(menu,iStart, iEnd){
        console.log('test')
      },
      //event quand on clique sur page suivante
      nextPageMenu(){
        let iStart = (this.page-1) * 7
        let iEnd = this.page * 7     
        this.populateHeader(this.items, iStart, iEnd)
        this.fillPlat(this.items,iStart,iEnd)
      },
      //event quand on clique sur page precedente
      previousPageMenu(){   // p1 : 0 -> 7 (6)   , P2 : 7 -> 14 (13) 
        let iStart = (this.page-1) * 7
        let iEnd = this.page * 7     
        this.populateHeader(this.items, iStart, iEnd)
        this.fillPlat(this.items,iStart,iEnd)
      },
      changePageEvent(newPage){
        let iStart = (newPage-1) * 7
        let iEnd = newPage * 7      
        this.populateHeader(this.items, iStart, iEnd)
        this.fillPlat(this.items,iStart,iEnd)
      },
    }
	};
</script>

<style lang="sass">
.v-data-table
  white-space: pre-wrap

.tdplat
  text-align: center
</style>