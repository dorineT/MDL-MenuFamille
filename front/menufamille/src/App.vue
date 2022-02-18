<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      
    >
      <v-list-item>
        <router-link to="/">Accueil</router-link>
      </v-list-item>
        <v-list-item>
        <router-link to="/about">Go to About</router-link>
      </v-list-item>
    </v-navigation-drawer>

    <v-app-bar app color="#B2DFDB" >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Menu famille</v-toolbar-title>
    </v-app-bar>

    <v-main>      
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({ drawer: null }),
};
</script>
