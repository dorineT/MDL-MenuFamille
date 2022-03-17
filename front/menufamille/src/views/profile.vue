<template>
  <v-container  :class="{
        'container pa-4 my-12': $vuetify.breakpoint.smAndDown,
        'container pa-10 my-12': $vuetify.breakpoint.mdAndUp,
      }">
    <!-- alert -->
    <v-row>
      <v-alert text type="success" border="left" width="100%" dismissible v-if="update">
        Thank you, <strong>{{ currentUser.firstname  }} {{ currentUser.lastname }}</strong> Your Profile was created
        successfully !
      </v-alert>
    </v-row>
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
      :value="currentUser.firstname"
    ></v-text-field>
    <v-text-field
      label="Nom"
      outlined
      shaped
      :readonly= !isModified
      prepend-inner-icon="mdi-account"
      :value="currentUser.lastname"
    ></v-text-field>
    <v-text-field
      label="Email"
      outlined
      shaped
      :readonly= !isModified
      prepend-inner-icon="mdi-email"
      :value="currentUser.email"
    ></v-text-field>
    
    <v-row>
      <v-col cols="12" md="6">
        <v-btn
          v-if= !isModified
          color="red"
          block
          tile
          elevation="0"
          class="pa-6 font-weight-bold"
          style="color:white"
        >
          Supprimer
        </v-btn>
      </v-col>
      <v-col cols="12" md="6">
        <v-btn
          color="#faa62a"
          class="pa-6 font-weight-bold"
          block
          tile
          elevation="0"
          style="color:white"
          @click="modification"
        >
          {{(isModified)? "Sauvegarder":"modifier"}}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Profile',
  data() {
    return {
      update: false,
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
    }
  },
  methods: {
    modification() {
      this.isModified = true
    } 
  }
};
</script>