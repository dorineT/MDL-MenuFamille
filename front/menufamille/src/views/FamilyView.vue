<template>
   

    <v-card style="margin: 20px" outlined>
      <v-alert text type="error" border="left"  style="margin: 10px" dismissible v-if="update">
              {{message.message}}
      </v-alert>
      
      <v-card-title>Mes familles</v-card-title>
     

        <v-container fluid>
           <v-row>
            <v-select
                :items="select"
                label="Liste familles"
            ></v-select>  
            </v-row>
          
          <v-row>
            <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6" >
              <v-card>
                <v-card-title>Membre de la famille</v-card-title>
                <v-card-text>
                  <v-data-table
                    :headers="headers"
                    :items="membresFamily"         
                    class="elevation-1"
                  >
                    <template v-slot:top>
                      <v-toolbar
                        flat
                      >
                        <v-toolbar-title>{{currentFamily}}</v-toolbar-title>
                        <v-divider
                          class="mx-4"
                          inset
                          vertical
                        ></v-divider>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialogDelete" max-width="500px">
                          <v-card>
                            <v-card-title class="text-h5">Voulez-vous vraiment retirer ce membre?</v-card-title>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="blue darken-1" text>Annuler</v-btn>
                              <v-btn color="blue darken-1" text>Confirmer</v-btn>
                              <v-spacer></v-spacer>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-toolbar>
                    </template>
                    <template v-slot:item.actions="{ item }">
                      
                      <v-icon
                        small
                        class="mr-2"
                      >
                        mdi-account-convert
                      </v-icon>
                      
                      <v-icon
                        small
                        class="mr-2"
                      >
                        mdi-account-multiple-minus
                      </v-icon>
                    </template>
                  </v-data-table>
                </v-card-text>
              </v-card>
              
            </v-col>
            <v-col cols="12"  xs="12" sm="12" md="6" lg="6" xl="6">
              <v-card>
                 demande adhésion // idem data table
              </v-card>
             
            </v-col>
            <v-col cols="12"  xs="12" sm="12" md="6" lg="6" xl="6">
              <v-card>

                                  <v-container fluid>
                    <v-row>
                      <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                famille actuelle
                + action qu'on peut faire + 
                info de la famille
               
                      </v-col>
                      <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6" align="center">
                         <qr-code :size="150" text="Hello World!"></qr-code>
                      </v-col>
                    </v-row>
                  </v-container>
              </v-card>

            </v-col>
            <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
              <v-card>
                <v-card-title>Rejoindre une famille</v-card-title>
                <v-card-text>
                        <v-text-field
                          name="name"
                          label="Code d'accès"
                          v-model="joinFamillyInput"
                          id="id"
                        ></v-text-field>
                  </v-card-text>
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
        select: [],
        currentFamily: "",
        dialogDelete: false,
        message: "",
        update: false,
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
            text: 'Actions',
            align: '',
            sortable: false,   // des boutons, faire un template slot de la colonne pour custom   
            value:'actions'
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