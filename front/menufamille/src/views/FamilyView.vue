<template>
    <v-card style="margin: 20px" outlined>
      <v-card-title>Mes familles</v-card-title>  

        <v-container fluid>
          <v-row>
            <v-col xs="12" sm="12" md="6" lg="6" xl="6" >
              <v-card>
                <v-card-title>Membre de la famille</v-card-title>
                <v-card-text>
                  <v-data-table
                    :headers="headers"
                    :items="membresFamily"         
                    class="elevation-1"
                  > </v-data-table>
                </v-card-text>
              </v-card>
              
            </v-col>
            <v-col  xs="12" sm="12" md="6" lg="6" xl="6">
              <v-card>
                 demande adhésion // idem data table
              </v-card>
             
            </v-col>
            <v-col  xs="12" sm="12" md="6" lg="6" xl="6">
              <v-card>
                famille actuelle
                + action qu'on peut faire + 
                info de la famille
              </v-card>

            </v-col>
            <v-col  xs="12" sm="12" md="6" lg="6" xl="6">
              <v-card>
                <v-card-title>Rejoindre une famille</v-card-title>
                <v-card-text>                <v-text-field
                  name="name"
                  label="Code d'accès"
                  v-model="joinFamillyInput"
                  id="id"
                ></v-text-field></v-card-text>
              </v-card>
              
            </v-col>
          </v-row>
        </v-container>
    </v-card>  
</template>

<script>
  export default {    
    data (){
      return{
        headers:[
          {
            text: 'Membre',
            align: 'start',
            sortable: false,
            value: 'membre'          
          },
          {
            text: 'Role',
            align: 'start',
            sortable: false,  
            value: 'role'               
          },
          {
            text: 'Action',
            align: '',
            sortable: false,   // des boutons, faire un template slot de la colonne pour custom   
            value:'action'
          },
        ],
        membresFamily:[
          {
            membre:'jean',
            role: 'parent',
            action: ''
          },
          {
            membre:'jinette',
            role: 'enfant',
            action: ''
          }
        ],
        joinFamillyInput: null
      }
    }
}
</script>