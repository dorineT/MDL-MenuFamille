<template>

  <div style="margin: 4px">
      
      <div  style="margin: 4px">Menu : {{periodeMenu}} </div>
      
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
                  <td class="tdplat"> {{ item.name }} <br> {{item.date}}

                  </td>
                  <td class="tdplat"> 
                      <v-btn text @click="goToRecette(item,item.Matin)">
                        <p v-if="item.Matin!=='/'">{{ item.Matin }} </p>
                        <p v-else style="color: red">X</p>
                      
                      </v-btn>                     
                  </td>
                  <td class="tdplat"> 
                    <v-btn text @click="goToRecette(item,item.Midi)">
                        <p v-if="item.Midi!=='/'">{{ item.Midi }} </p>
                        <p v-else style="color: red">X</p>                                        
                    </v-btn>                     
                    <p>{{item.MidiDesc}}</p>  
                  </td>
                  <td class="tdplat"> 
                      <v-btn  text @click="goToRecette(item,item.Soir)">
                        <p v-if="item.Soir!=='/'">{{ item.Soir }} </p>
                        <p v-else style="color: red">X</p>
                      </v-btn> 
                      
                  </td>
            </tr>
          </template>

        </v-data-table>    
    </div>

</template>

<script>
import {eventBus } from '../main'
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
        ]            
      }
    },
    mounted(){
        console.log('des choses a faire avec l\'api')
        // call api to get the menu
    },
    methods:{
      goToRecette(item,text){
          console.log('click recette calendar ' +text)
          //open dialogue with even bus
          eventBus.$emit('openDialog', item)
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