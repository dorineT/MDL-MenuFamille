<template>

    <v-card
      elevation="2"   
        class="cardmargin"
    >
        <v-data-table
            :headers="headers"
            :items="calendrierSemaine"
            :items-per-page="5"
            class="elevation-8"
        ></v-data-table>    
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
          { text: 'Lundi\n14/02', value: 'Lundi' },
          { text: 'Mardi\n15/02', value: 'Mardi' },
          { text: 'Mercredi\n16/02', value: 'Mercredi' },
          { text: 'Jeudi\n17/02', value: 'Jeudi' },
          { text: 'Vendredi\n18/02', value: 'Vendredi' },
          { text: 'Samedi\n19/02', value: 'Samedi' },
          { text: 'Dimanche\n20/02', value: 'Dimanche' }
        ],
        calendrierSemaine: [
          {
            name: 'Matin',
            Lundi: '/',
            Mardi: 'céréale',
            Mercredi: '/',
            Jeudi: 'pain grillé',
            Vendredi: '/',
            Samedi:'/',
            Dimanche:'/'
          },
            {
                name: 'Midi',
                Lundi: 'croque monsieur',
                Mardi: '/',
                Mercredi: 'Pate',
                Jeudi: 'croque monsieur',
                Vendredi: 'saucisse patate',
                Samedi:'Flamekueche',
                Dimanche:'roti\n18 personnes'
              },
              {
                name: 'Soir',
                Lundi: 'canard sauce orange',
                Mardi: 'lapin',
                Mercredi: '/',
                Jeudi: 'crepe',
                Vendredi: 'pancake',
                Samedi:'frites',
                Dimanche:'/'
              }
        ]}
    }}

</script>


<style lang="sass">
.v-card
    margin: 20px

.v-data-table
    white-space: pre-wrap
</style>