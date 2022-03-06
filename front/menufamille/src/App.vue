<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app color="#F5F5F5" elevation="10">
      <v-list nav dense>
        <v-list-item-group active-class="orange lighten-2--text text--accent-4">
          <v-list-item to="/">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Accueil</v-list-item-title>
          </v-list-item>

          <v-list-item to="/creationMenu">
            <v-list-item-icon>
              <v-icon>mdi-pencil</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Création Menu</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="#FFB74D" v-if="loggedIn">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Menu famille</v-toolbar-title>
      <v-btn @click="logOut">Déconnexion</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import EventBus from "./common/EventBus";

export default {
  name: "App",
  data: () => ({
    drawer: false,
    loggedIn: true,
  }),
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
    mounted() {
    EventBus.on("logout", () => {
      this.logOut();
    });
  },
    beforeDestroy() {
      EventBus.remove("logout");
  },
};
</script>


