<template>
  <div>
    <dialog-modify-profil v-bind:dialog="dialogPw" v-bind:id="currentUser.id_membre" @closePass="changePassword"/>
    <v-dialog
    
      v-model="dialogSup"
      persistent
      max-width="700"
    >
  
  <template v-slot:activator="{ on, attrs }">
    <v-container fluid  :class="{
          'container pa-4 my-12': $vuetify.breakpoint.smAndDown,
          'container pa-10 my-12': $vuetify.breakpoint.mdAndUp,
        }">
      <v-card style="padding: 10px">

      <!-- avatar -->
      <v-row class="justify-center">
        <v-avatar size="150px">
          <v-icon size="150px">mdi-account-circle</v-icon>
        </v-avatar>
      </v-row>
      <!-- name -->
      <v-row class="justify-center pb-5">
        <span class="title text-secondary py-2 font-weight-bold">{{ currentUser.firstname  }} {{ currentUser.lastname }}</span>
      </v-row>
      <v-text-field
        label="Prénom"
        outlined
        shaped
        :readonly= !isModified
        prepend-inner-icon="mdi-account"
        v-model="user.firstname"
      ></v-text-field>
      <v-text-field
        label="Nom"
        outlined
        shaped
        :readonly= !isModified
        prepend-inner-icon="mdi-account"
        v-model="user.lastname"
      ></v-text-field>
      <v-text-field
        label="Email"
        outlined
        shaped
        readonly
        prepend-inner-icon="mdi-email"
        v-model="user.email"
      ></v-text-field>
      
      <v-row>
        <v-col cols="12" md="6">
          <v-btn
            v-if= !isModified
            color="red"
            rounded
            block
            elevation="0"
            class="pa-6 font-weight-bold"
            style="color:white"
            v-bind="attrs"
            v-on="on"
          >
            Supprimer
          </v-btn>
        </v-col>
        <v-col cols="12" md="6">
          <v-btn
            color="#faa62a"
            class="pa-6 font-weight-bold"
            block
            rounded
            elevation="0"
            style="color:white"
            @click="modification"
          >
            {{(isModified)? "Sauvegarder":"modifier"}}
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
        <v-btn
            color="#faa62a"
            class="pa-6 font-weight-bold"
            v-if= !isModified
            block
            rounded
            elevation="0"
            style="color:white"
            @click="changePassword"
          >
            Changer mot de passe
          </v-btn>
        </v-col>
      </v-row>
      </v-card>
    </v-container>
  
  </template>
  
  <v-card>
        <v-card-title class="text-h5">
          Suppression du compte!
        </v-card-title>
        <v-card-text>Voulez-vous vraiment supprimer votre compte ?</v-card-text>
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
            @click="suppresion"
          >
            Supprimer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import User from '../models/user';
import UserDao from '../services/api.user'
import DialogModifyProfil from '../components/DialogModifyProfil.vue';
let DAOUser = new UserDao();

export default {
  components: { DialogModifyProfil },
  name: 'Profile',
  data() {
    return {
      user: new User('', '', ''),
      
      dialogPw: false,
      dialogSup: false,
      message: "",
      isModified: false
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    } else {
      this.user.firstname = this.currentUser.firstname
      this.user.lastname = this.currentUser.lastname
      this.user.email = this.currentUser.email
      this.user.id = this.currentUser.id_membre
    }
  },
  methods: {
    changePassword() {
      this.dialogPw = !this.dialogPw;
    },
    modification() {
      if (this.isModified) {
        this.$store.dispatch("auth/update", this.user).then(
          () => {
            this.isModified = false;
          }
        )
      } else {
        this.isModified = true
      }
      
    },
    suppresion() {
      this.dialogSup = false;
      DAOUser.removeUser(this.currentUser.id_membre).then(
        () => {
              this.$store.dispatch("auth/logout");
              this.$store.dispatch("info/reset");
              this.$store.dispatch("loading/reset");
              this.$router.push("/login");
            }
      )
    } 
  }
};
</script>