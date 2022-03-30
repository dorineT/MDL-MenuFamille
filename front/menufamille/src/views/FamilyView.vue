<template>
   

    <v-card style="margin: 20px" outlined>
      <v-alert text type="error" border="left"  style="margin: 10px" dismissible v-if="update">
              {{message.message}}
      </v-alert>
      
      <v-card-title>Mes Familles
      </v-card-title>
     

        <v-container fluid>
           <v-col cols="3">
            <v-select
                :items="select"
                v-model="selected"
                label="Liste familles"
                @change="changeFamille()"
            ></v-select>  
            </v-col>
          
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
                        <v-toolbar-title>{{selected}}</v-toolbar-title>
                        <v-divider
                          class="mx-4"
                          inset
                          vertical
                        ></v-divider>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialogDelete" max-width="500px">
                          <v-card>
                            <v-card-title class="text-h5">Voulez-vous vraiment retirer ce membre de la famille?</v-card-title>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="blue darken-1" text @click="closeDelete">Annuler</v-btn>
                              <v-btn color="blue darken-1" text @click="deleteMemberConfirm">Confirmer</v-btn>
                              <v-spacer></v-spacer>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-toolbar>
                    </template>
                    <template v-slot:item.actions = "{ item }">
                      
                      <v-icon
                        small
                        class="mr-2"
                      >
                        mdi-account-convert
                      </v-icon>
                      
                      <v-icon
                        small
                        class="mr-2"
                        @click="deleteMember(item)"
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
                        <v-text-field
                          label="Code d'accès:"
                          outlined
                          shaped
                          :value="code"
                          readonly
                          prepend-inner-icon="mdi-qrcode-scan"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6" align="center">
                         <qr-code :size="150" :text="accessCode" error-level="L"></qr-code>
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
import FamilyDao from '../services/api.famille';
let DAOfamily = new FamilyDao;
  export default {    
    name: 'family',
    editedIndex: -1,
    data (){
      return{
        select: [],
        selected: "",
        code: "",
        dialogDelete: false,
        message: "",
        update: false,
        editedItem: {
          id: '',
          membre: '',
          role: '',
          actions: ''
        },
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
        membresFamily:[],
        joinFamillyInput: null
      }
    },
    computed: {
      currentFamily() {
        return this.$store.state.info;
      },
      accessCode() {
        return "https://localhost:8080/request?code="+this.code;
      }
    },
    created() {
        this.$store.state.auth.user.roles.forEach(element => {        
        this.select.push(element[1])
        })
        if(this.currentFamily.nomFamille !== null) {
          this.selected = this.currentFamily.nomFamille
        } else {
          this.selected = this.select.length > 0 ? this.select[0] : null
        }
        this.updateMember();
        this.generateCode();
    },
    methods : {
      changeFamille(){
        if(this.selected !== null){
          let famille = this.$store.state.auth.user.roles.find(el => el[1] === this.selected)
          this.$store.dispatch("info/changeFamille", [famille[0], famille[1], famille[2], famille[3]])
          this.updateMember();
          this.generateCode();     
        }
      },
      updateMember() {
        this.membresFamily = []
        DAOfamily.getMembers(this.currentFamily.idFamilleActuel).then(
          (response) => {
            response.data.membres.forEach(membre => {
              let value = {
                id: membre.id_membre,
                membre: membre.nom + " " +membre.prenom,
                role: membre.role.role,
                action: ''
              }
              this.membresFamily.push(value)
              this.update = false;
            })
          },
          (error) => {
              this.update = true;
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
        )
      },
      deleteMember(item) {
        this.editedIndex = this.membresFamily.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },
      deleteMemberConfirm () {
        DAOfamily.removeMember(this.currentFamily.idFamilleActuel, this.editedItem.id).then(
          (response) => {
            this.membresFamily.splice(this.editedIndex, 1)
            this.update = false;
            this.closeDelete()
          },
          (error) => {
              this.update = true;
              this.closeDelete()
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
        )
        
      },
      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      generateCode() {
        DAOfamily.getCodeFamily(this.currentFamily.idFamilleActuel).then(
          (response) => {
            this.code = response.data.code;
            this.update = false;
          },
          (error) => {
              this.update = true;
              this.closeDelete()
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
        )
      }
    }
}
</script>