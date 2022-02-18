<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      color="#F5F5F5"
      elevation="10"
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group          
          active-class="teal lighten-4--text text--accent-4"
        >
          <v-list-item to="/accueil">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Accueil</v-list-item-title>
          </v-list-item>

          <v-list-item to="/about">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="#A7FFEB" >
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


