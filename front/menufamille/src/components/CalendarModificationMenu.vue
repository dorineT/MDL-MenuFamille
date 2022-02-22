<template>

  <div style="margin: 4px">
      Menu : {{periodeMenu}}
      <br><br>
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
    </div>

</template>

<script>
  export default {
    props:['periodeMenu'],
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
        items: [
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
            Midi: 'rotî sauce moutarde',
            MidiDesc: '18 personnes',
            Soir: '/',

          }
        ]            
      }
    },

    methods:{
      goToRecette(text){
          alert('click ' + text)
        },
    }
}
</script>


<style lang="sass">

.v-data-table
  white-space: pre-wrap

.tdplat
  text-align: center
</style>