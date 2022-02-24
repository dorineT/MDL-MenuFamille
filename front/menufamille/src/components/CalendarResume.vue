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
              <td class="tdplat"> {{ item.jour }} <br> {{item.date}}

              </td>
              <td class="tdplat"> 
                  <v-btn v-if="item.Matin!=='/'" text @click="goToRecette(item.Matin)">{{ item.Matin }} </v-btn>
                  <p v-else style="color: red">X</p>
                  <p v-if="item.MatinNbPers!== ''">{{item.MatinNbPers}} personnes</p> 
              </td>
              <td class="tdplat"> 
                <v-btn v-if="item.Midi!=='/'" text @click="goToRecette(item.Midi)">{{ item.Midi }}</v-btn> 
                <p v-else style="color: red">X</p>
                <p v-if="item.MidiNbPers!== ''">{{item.MidiNbPers}} personnes</p>                  
              </td>
              <td class="tdplat"> 
                  <v-btn v-if="item.Soir!=='/'" text @click="goToRecette(item.Soir)">{{ item.Soir }} </v-btn> 
                  <p v-else style="color: red">X</p>
                  <p v-if="item.SoirNbPers!== ''">{{item.SoirNbPers}} personnes</p> 
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
            id:0,
            jour: 'Lundi',
            date: '14/02',
            Matin: 'céréale',
            MatinNbPers:'',
            Midi: 'croque-monsieur',
            MidiNbPers:'',
            Soir: 'pain',
            SoirNbPers:''
          },
          {
            id:1,
            jour: 'Mardi',
            date: '15/02',
            Matin: 'crepe',
            MatinNbPers: '',
            Midi: 'croque-monsieur',
            MidiNbPers:'',
            Soir: 'lasagne',
            SoirNbPers:'',
          },
          {
            id:2,
            jour: 'Mercredi',
            date: '16/02',
            Matin: '/',
            MatinNbPers:'',
            Midi: 'pain',
            MidiNbPers:'',
            Soir: 'canard',
            SoirNbPers:'',
          },
          {
            id:3,
            jour: 'Jeudi',
            date: '17/02',
            Matin: 'céréale',
            MatinNbPers:'',
            Midi: 'croque-monsieur',
            MidiNbPers:'',
            Soir: 'pain',            
            SoirNbPers:'',
          },
          {
            id:4,
            jour: 'Vendredi',
            date: '18/02',
            Matin: 'flocon d\'avoine',
            MatinNbPers:'',
            Midi: 'croque-monsieur',
            MidiNbPers:'',
            Soir: 'frites',
            SoirNbPers:'',
          },
          {
            id:5,
            jour: 'Samedi',
            date: '19/02',
            Matin: 'céréale',
            MatinNbPers:'',
            Midi: 'spaghetti',
            MidiNbPers:'',
            Soir: 'crepe',
            SoirNbPers:'',
          },
          {
            id:6,
            jour: 'Dimanche',
            date: '20/02',
            Matin: 'céréale',
            MatinNbPers:'',
            Midi: 'rotî sauce moutarde',
            MidiNbPers:'18',
            Soir: '/',
            SoirNbPers:'',
          },
          {
            id:7,
            jour: 'Lundi',
            date: '21/02',
            Matin: 'céréale',
            MatinNbPers:'',
            Midi: 'rotî sauce moutarde',
            MidiNbPers: '18',
            Soir: '/',
            SoirNbPers:'',
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