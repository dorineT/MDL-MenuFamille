<template>

  <div style="margin: 4px">

    <v-combobox
      color="orange lighten-2"
      label="Choix du menu"
      class="combobox-class"
      :items="itemPeriode"      
      v-model="comboboxMenuSelected"></v-combobox>

        <v-data-table
            :headers="headers"
            :items="items"                                          
            class="elevation-8"
            disable-sort
            mobile-breakpoint="0"
            :footer-props="{             
              'disable-items-per-page':true,
              itemsPerPage:7,      
              'items-per-page-options': [7,14],
              'items-per-page-text':'Lignes par page',
            }"
        > 

          <template
            v-if="IscomboboxChange('Aucun menu sélectionné')"
            v-slot:no-data
          >
            Pas de menu sélectionné
          </template>


          <template v-slot:item="{ item }">
            <tr>
              <td class="tdplat"> {{ item.name }} <br> {{item.date}}

              </td>
              <td class="tdplat"> 
                  <v-btn v-if="item.Matin!=='/'" text @click="goToRecette(item.Matin)">{{ item.Matin }} </v-btn>
                  <p v-else style="color: red">X</p>
                  
              </td>
              <td class="tdplat"> 
                <v-btn v-if="item.Midi!=='/'" text @click="goToRecette(item.Midi)">{{ item.Midi }}</v-btn> 
                <p v-else style="color: red">X</p>
                <p>{{item.MidiDesc}}</p>  
              </td>
              <td class="tdplat"> 
                  <v-btn v-if="item.Soir!=='/'" text @click="goToRecette(item.Soir)">{{ item.Soir }} </v-btn> 
                  <p v-else style="color: red">X</p>
              </td>
                  
            </tr>
          </template>

        </v-data-table>    
    </div>

</template>

<script>
  export default {
    data () {
      return {
        headers: [
          {
            text: 'Période',
            align: 'start',            
            value: 'name',
          },
          { text: 'Matin', align: 'center',value: 'Matin' },
          { text: 'Midi',align: 'center', value: 'Midi' },
          { text: 'Soir',align: 'center', value: 'Soir' },
        ],
        items:[],
        plats: [
          {
            name: 'Lundi',
            date: '14/02',
            Matin: 'céréale',
            Midi: 'croque-monsieur',
            Soir: 'pain',
          },
          {
            name: 'Mardi',
            date: '15/02',
            Matin: 'crepe',
            Midi: 'croque-monsieur',
            Soir: 'lasagne',

          },
          {
            name: 'Mercredi',
            date: '16/02',
            Matin: '/',
            Midi: 'pain',
            Soir: 'canard',

          },
          {
            name: 'Jeudi',
            date: '17/02',
            Matin: 'céréale',
            Midi: 'croque-monsieur',
            Soir: 'pain',

          },
          {
            name: 'Vendredi',
            date: '18/02',
            Matin: 'flocon d\'avoine',
            Midi: 'croque-monsieur',
            Soir: 'frites',

          },
          {
            name: 'Samedi',
            date: '19/02',
            Matin: 'céréale',
            Midi: 'spaghetti',
            Soir: 'crepe',

          },
          {
            name: 'Dimanche',
            date: '20/02',
            Matin: 'céréale',
            Midi: 'rotî sauce moutarde',
            MidiDesc:'18 personnes',
            Soir: '/',

          },
          {
            name: 'Lundi',
            date: '21/02',
            Matin: 'céréale',
            Midi: 'rotî sauce moutarde',
            MidiDesc: '18 personnes',
            Soir: '/',

          }
        ],
        itemPeriode: [
          '14/02 - 20/02'
        ],
        comboboxMenuSelected: null        
      }
    },
    mounted () {
      console.log(this.$vuetify.breakpoint.width)
      this.comboboxMenuSelected='Aucun menu sélectionné'
    },
    watch:{
        comboboxMenuSelected(slot){     
        if(slot === 'Aucun menu sélectionné'){        
          this.items = []
        }
        else{ //check période des menus => Call API
          this.items = this.plats
        }
      }
    },
    methods:{
      goToRecette(text){
          alert('click ' + text)
        },
      IscomboboxChange(slot){        
        return this.comboboxMenuSelected === slot
      }
    }
}
</script>


<style lang="sass">

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