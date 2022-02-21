<template>

    <v-card
      elevation="2"   
        class="cardmargin"
    >

    <v-combobox
      color="orange lighten-2"
      label="Choix du menu"
      class="combobox-class"
      :items="itemPeriode"
      v-model="comboboxChange"></v-combobox>

        <v-data-table
            :headers="headers"
            :items="items"                                          
            class="elevation-8"
            disable-sort
            mobile-breakpoint="0"
            :footer-props="{             
              //disableItemsPerPage: false,
              itemsPerPage:7,      
              'items-per-page-options': [7,14]
            }"
        > 

          <template
            v-if="IscomboboxChange('no-data')"
            v-slot:no-data
          >
            Pas de menu sélectionné
          </template>


          <template v-slot:item="{ item }">
            <tr>
              <td class="tdplat"> {{ item.name }} </td>
              <td class="tdplat"> <v-btn text @click="goToRecette(item.Matin)">{{ item.Matin }} </v-btn></td>
              <td class="tdplat"> 
                <v-btn text @click="goToRecette(item.Midi)">{{ item.Midi }}</v-btn> 
                <p>{{item.MidiDesc}}</p>  
              </td>
              <td class="tdplat"> <v-btn text @click="goToRecette(item.Soir)">{{ item.Soir }} </v-btn> </td>
            </tr>
          </template>

        </v-data-table>    
    </v-card>

</template>

<script>
  export default {
    data () {
      return {
        headers: [
          {
            text: 'Période',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Matin', align: 'center',value: 'Matin' },
          { text: 'Midi',align: 'center', value: 'Midi' },
          { text: 'Soir',align: 'center', value: 'Soir' },
        ],
        items:[],
        plats: [
          {
            name: 'Lundi \n14/02',
            Matin: 'céréale',
            Midi: 'croque-monsieur',
            Soir: 'pain',
          },
          {
            name: 'Mardi \n15/02',
            Matin: 'crepe',
            Midi: 'croque-monsieur',
            Soir: 'lasagne',

          },
          {
            name: 'Mercredi \n16/02',
            Matin: '/',
            Midi: 'pain',
            Soir: 'canard',

          },
          {
            name: 'Jeudi \n17/02',
            Matin: 'céréale',
            Midi: 'croque-monsieur',
            Soir: 'pain',

          },
          {
            name: 'Vendredi \n18/02',
            Matin: 'flocon d\'avoine',
            Midi: 'croque-monsieur',
            Soir: 'frites',

          },
          {
            name: 'Samedi \n19/02',
            Matin: 'céréale',
            Midi: 'spaghetti',
            Soir: 'crepe',

          },
          {
            name: 'Dimanche \n20/02',
            Matin: 'céréale',
            Midi: 'rotî sauce moutarde',
            MidiDesc:'18 personnes',
            Soir: '/',

          },
          {
            name: 'Lundi \n21/02',
            Matin: 'céréale',
            Midi: 'rotî sauce moutarde \n18 personnes',
            Soir: '/',

          }
        ],
        itemPeriode: [
        '14/02 - 20/02'
        ],
        comboboxMenuSelected: '',
        comboboxChange: null
      }
    },
    mounted () {
      console.log(this.$vuetify.breakpoint.width)
    },
    methods:{
      goToRecette(text){
          alert('click ' + text)
        },
      IscomboboxChange(slot){
        console.log("hekkk " + slot)
        return this.comboboxChange === slot
      }
    },
    watch:{
      comboboxChange(slot){
        console.log("hekkk")
        if(slot === 'no-data'){
          console.log("hello")
          this.items = []
        }
        else{
          this.items = this.plats
        }
      }
    }
}
</script>


<style lang="sass">
.v-card
  margin: 20px

.v-data-table
  white-space: pre-wrap

@media (min-width: 601px)
  .combobox-class
    margin: 20px,
    width: 7cm

@media (max-width: 600px)
  .combobox-class
    margin: 10px

.tdplat
  text-align: center
</style>