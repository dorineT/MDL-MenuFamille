<template>
    <v-dialog
      v-if="!isLoading"   
      v-model="dialogSup"
      persistent
      max-width="700"
    >
    
    <template v-slot:activator="{ on, attrs }">
    <v-card style="margin: 20px;opacity: 0.85"  outlined>
      <dialog-create-family v-bind:dialog="dialogFm" @closeFam="createFamily" @familyCreated="updateMember"/>
      
      <v-card-title class="mt-2">Mes Familles</v-card-title>
     

        <v-container fluid>
          <v-row align-content="start">
           <v-col cols="12" sm="12" md="3" lg="3" xl="3">
            <v-select
                :items="select"
                v-model="selected"
                no-data-text="Aucune famille"
                label="Liste familles"
                @change="changeFamille()"              
            ></v-select>  
           </v-col>
           <v-col cols="12" sm="12" md="3" lg="3" xl="3">
              <v-btn              
              class="mr-3 colorbtnOrange"
              elevation="2"
              rounded
              small
              @click="createFamily"
              >Créer</v-btn>
              <v-btn
              color="red"
              elevation="2"
              rounded
              small
              v-show="currentRole === 'parent'"
              v-bind="attrs"
              v-on="on"
              >Supprimer</v-btn>
              </v-col>
          </v-row>
          
          <v-row >
            <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6" v-if="famillyExist > 0" >
              <v-card>
                <v-card-title>Membre de la famille</v-card-title>
                <v-card-text>
                  <v-data-table
                    :headers="headers"
                    :items="membresFamily"         
                    class="elevation-1"
                    :footer-props="{                     
                      itemsPerPage: 4,
                      'items-per-page-options': [4,8],
                      'items-per-page-text': 'Membres par page',
                    }"
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
                      
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                      <v-icon
                        class="mr-2"
                        v-on="on"
                        @click="switchRole(item)"
                        color="blue"
                      >
                        mdi-account-convert
                      </v-icon>
                      </template>
                      <span>Changer rôle</span>
                      </v-tooltip>
                      
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                      <v-icon
                        class="mr-2"
                        v-on="on"
                        @click="deleteMember(item)"
                        color="red"
                      >
                        mdi-account-multiple-minus
                      </v-icon>
                        </template>
                      <span>Retirer membre</span>
                      </v-tooltip>
                    </template>
                  </v-data-table>
                </v-card-text>
              </v-card>
              
            </v-col>
            <v-col cols="12"  xs="12" sm="12" md="6" lg="6" xl="6" v-if="famillyExist > 0 && isRequest">
              <v-card height="200px">
                <v-toolbar flat>
                  <v-toolbar-title>Demandes en attente</v-toolbar-title>
                </v-toolbar>
                <v-divider></v-divider>

                <v-list>
                  <v-col v-for="membre in requestFamily" :key="membre.id" cols="12">
                    <requestcard :name="membre.membre" :id="membre.id" @requestStatut="requestStatut" />
                  </v-col>
                </v-list>

              </v-card>
             
            </v-col>
            <v-col cols="12"  xs="12" sm="12" md="6" lg="6" xl="6" v-if="famillyExist > 0">
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
                    <v-row >
                      <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                        <v-btn
                        color="red"
                        elevation="2"
                        rounded
                        small
                        @click="quitFamily"
                        >
                        Quitter la famille
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
              </v-card>

            </v-col>
            <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
              <v-card>
                <v-card-title>Rejoindre une famille</v-card-title>
                <v-card-text>
                  <v-form
                  ref="form"
                  >
                        <v-text-field
                          name="code"
                          append-outer-icon='mdi-send'
                          label="Code d'accès"
                          v-model="joinFamillyInput"
                          :rules="codeRules"
                          id="id"
                          required
                          @click:append-outer="() => {if (!$refs.form.validate()) return; joinFamily(joinFamillyInput)}"
                        ></v-text-field>
                  </v-form>
                  </v-card-text>
              </v-card>
              
            </v-col>
          </v-row>
        </v-container>
    </v-card>
    </template>
    <v-card v-if="famillyExist > 0">
        <v-card-title class="text-h5">
          Suppression de la famille!
        </v-card-title>
        <v-card-text>Voulez-vous vraiment supprimer la famille <strong>{{selected}}</strong> ?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialogSup = false"
          >
            Annuler
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="deleteFamily"
          >
            Supprimer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import FamilyDao from '../services/api.famille';
import Requestcard from '../components/RequestCard.vue';
import DialogCreateFamily from '../components/DialogCreateFamily.vue'
import User from '../models/user';
let DAOfamily = new FamilyDao;
  export default {
    components: { Requestcard, DialogCreateFamily },    
    name: 'family',
    editedIndex: -1,
    data (){
      return{
        user: new User(''),
        dialogFm: false,
        dialogSup: false,
        codeRules: [
        v => !!v || 'Veuillez entrer un code',
        v => v !== null && v.length == 6 || 'Code invalide',
        ],
        select: [],
        selected: "",
        code: "",
        dialogDelete: false,
        message: "",
        editedItem: {
          id: '',
          membre: '',
          role: '',
          actions: ''
        },
        membresFamily:[],
        requestFamily:[],
        joinFamillyInput: null
      }
    },
    watch: {
    '$store.state.auth.user': function () {
      this.updateView();       
    }
    },
    computed: {
      headers() {
        return [
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
          (this.currentRole === 'parent'? {
            text: 'Actions',
            align: '',
            sortable: false,   // des boutons, faire un template slot de la colonne pour custom   
            value:'actions'
          }: ''
          ) 
        ];
      },
      isRequest() {
        return this.requestFamily.length > 0;
      },
      currentFamily() {
        return this.$store.state.info;
      },
      currentRole() {
        return this.$store.state.info.roleActuel;
      },
      accessCode() {
        const host = window.location.protocol + "//" + window.location.host;
        return host+"/family?code="+this.code;
      },
      famillyExist(){
        return this.select.length
      },
      isLoading() {
        return this.$store.state.loading.isLoading;
      },
    },
    mounted() {
        this.updateView();

        if(this.famillyExist === 0) return;
        
        this.updateMember();
        this.generateCode();
        if(this.currentRole === 'parent')  this.updateRequest();
        if(this.$route.query.code) this.joinFamily(this.$route.query.code);
    },
    methods : {
      createFamily() {
        this.dialogFm = !this.dialogFm;
      },
      updateView() {
        this.select = []
        this.$store.state.auth.user.roles.forEach(element => {        
        this.select.push(element[1])
        })
        if(this.currentFamily.nomFamille !== null) {     
          this.selected = this.currentFamily.nomFamille
        } else {       
          this.selected = this.select.length > 0 ? this.select[0] : null
        }
      },
      deleteFamily() {
        DAOfamily.removeFamily(this.currentFamily.idFamilleActuel).then(
          (response) => {
            this.dialogSup = false;
            if(this.select.length > 0) this.selected = this.select[0];
            this.$store.dispatch("info/reset");
            this.changeFamille();
          }
        )
      },
      changeFamille(){ 
        console.log("change famille page famille")
        console.log(this.$store.state.auth.user.roles)       
        if(this.selected !== null){
          let famille = this.$store.state.auth.user.roles.find(el => el[1] === this.selected)
          this.$store.dispatch("info/changeFamille", [famille[0], famille[1], famille[2], famille[3]])
          this.updateMember();
          this.generateCode();
          if(this.currentRole === 'parent')  this.updateRequest();
        }
      },
      updateRequest() {
        this.requestFamily = []
        DAOfamily.getRequest(this.currentFamily.idFamilleActuel).then(
          (response) => {
            response.data.membres.forEach(membre => {
              let value = {
                id: membre.id_membre,
                membre: membre.nom + " " +membre.prenom,
              }
              this.requestFamily.push(value)
            })            
          }
        )
      },
      updateMember() {
        this.membresFamily = []
        DAOfamily.getMembers(this.currentFamily.idFamilleActuel).then(
          (response) => {
            response.data.membres.forEach(membre => {

              let value = {
                id: membre.id_membre,
                membre: membre.nom + " " +membre.prenom,
                role: membre.role.role
              }
              if(this.currentRole === 'parent') value = Object.assign(value, {action: ''});
              this.membresFamily.push(value)
            })
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
            this.closeDelete()
          },
          (error) => {
              this.closeDelete()
            }
        )
        
      },
      quitFamily() {
        DAOfamily.removeMember(this.currentFamily.idFamilleActuel, this.$store.state.auth.user.id_membre).then(
          (response) => {
            this.selected = this.select[0];
            this.changeFamille();
            
          }
        )
      },
      joinFamily(code) {
        DAOfamily.joinFamily(code).then(
          (response) => {
          }
        )
      },
      switchRole(item) {
         let newRole;
         switch(item.role) {
           case 'enfant':
             newRole = 'parent';
             break;
           case 'parent':
             newRole = 'enfant';
             break;
         }
         DAOfamily.switchRole(item.id, this.currentFamily.idFamilleActuel, newRole).then(
          (response) => {
            let index = this.membresFamily.indexOf(item)
            this.membresFamily[index].role = newRole
            if(item.id === this.$store.state.auth.user.id_membre) this.changeFamille();
          }
        )
      },
      requestStatut(type, id_membre) {
        DAOfamily.updateRequest(type, this.currentFamily.idFamilleActuel, id_membre).then(
          (response) => {
            const item = this.requestFamily.find(membre => membre.id == id_membre)
            this.requestFamily.splice(this.requestFamily.indexOf(item), 1)
            if(type === 'accepted') this.updateMember();
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
          },
          (error) => {
              this.closeDelete()
            }
        )
      }
    }
}
</script>


<style lang="sass">
@import "../style/globalStyle"
</style>
