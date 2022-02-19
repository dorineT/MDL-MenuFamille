<template>

    <v-card
      elevation="2"   
        class="cardmargin"
    >

    <v-combobox
      color="orange lighten-2"
      label="Choix des menus définis"
      :items="itemPeriode"></v-combobox>

        <v-data-table
            :headers="headers"
            :items="items"                                          
            class="elevation-8"
            disable-sort
                      
            :footer-props="{             
              //disableItemsPerPage: false,
              itemsPerPage:7,
              itemsPerPageOptions:[7]
            }"
        >   
          <template v-slot:item="{ item }">
            <tr>
              <td class="text-xs-right pa-4" > {{ item.name }} </td>
              <td class="text-xs-right pa-0 " > <v-btn text @click="goToRecette(item.Matin)">{{ item.Matin }} </v-btn></td>
              <td class="text-xs-right pa-0 " > <v-btn text @click="goToRecette(item.Midi)">{{ item.Midi }}</v-btn> </td>
              <td class="text-xs-right pa-0 " > <v-btn text @click="goToRecette(item.Soir)">{{ item.Soir }} </v-btn> </td>
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
          { text: 'Matin', value: 'Matin' },
          { text: 'Midi', value: 'Midi' },
          { text: 'Soir', value: 'Soir' },
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
            Midi: 'rotî sauce moutarde \n18 personnes',
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
        ]
      }
    },
    methods:{
      goToRecette(text){
          alert('click ' + text)
        }
    }
}
</script>


<style lang="sass">
.v-card
    margin: 20px

.v-data-table
    white-space: pre-wrap

.v-combobox
  margin: 20px,
  width: 20cm

</style>