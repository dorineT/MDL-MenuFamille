<template>
	<v-app>
		
		<v-navigation-drawer v-model="drawer" app color="#F5F5F5" elevation="10" v-if="loggedIn">
			<v-list nav dense>
				<v-list-item-group active-class="orange lighten-2--text text--accent-4">
					<v-list-item to="/" @click="drawer = ! drawer">
						<v-list-item-icon>
							<v-icon>mdi-home</v-icon>
						</v-list-item-icon>
						<v-list-item-title>Accueil</v-list-item-title>
					</v-list-item>

					<v-list-item to="/creationMenu" v-if="this.$store.state.info.roleActuel==='parent'"  @click="drawer = ! drawer">
						<v-list-item-icon>
							<v-icon>mdi-pencil</v-icon>
						</v-list-item-icon>
						<v-list-item-title>Création Menu</v-list-item-title>
					</v-list-item>
					<v-list-item to="/recipe"  @click="drawer = ! drawer">
						<v-list-item-icon>
							<v-icon>mdi-food-turkey</v-icon>
						</v-list-item-icon>
						<v-list-item-title>Recettes</v-list-item-title>
					</v-list-item>
					<v-list-item to="/"  @click="drawer = ! drawer">
						<v-list-item-icon>
							<v-icon>mdi-format-list-text</v-icon>
						</v-list-item-icon>
						<v-list-item-title>Liste de courses</v-list-item-title>
					</v-list-item>
					<v-list-item to="/family"  @click="drawer = ! drawer">
						<v-list-item-icon>
							<v-icon>mdi-account-group</v-icon>
						</v-list-item-icon>
						<v-list-item-title>Famille</v-list-item-title>
					</v-list-item>
					<v-list-item to="/profile"  @click="drawer = ! drawer">
						<v-list-item-icon>
							<v-icon>mdi-account</v-icon>
						</v-list-item-icon>
						<v-list-item-title>Profil Utilisateur</v-list-item-title>
					</v-list-item>
					<v-list-item @click="logOut">
						<v-list-item-icon>
							<v-icon>mdi-logout</v-icon>
						</v-list-item-icon>
						<v-list-item-title>Déconnexion</v-list-item-title>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-navigation-drawer>

		<v-app-bar app color="#FFB74D" v-if="loggedIn">
			<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>	
			<v-container fluid>
				<v-toolbar-title style="align-content: center"><div class="divTitle">Menu Famille</div></v-toolbar-title>				
			</v-container>		
		</v-app-bar>

		<v-main :style="image" class="image">
			<router-view class="opacity-define" />
		</v-main>
		
	</v-app>
</template>

<script>
import EventBus from "./common/EventBus";


export default {
  name: "App",
  data: () => ({
    drawer: false,
	image: {backgroundImage: "url(https://img.wallpapersafari.com/desktop/1680/1050/26/92/0KH5pV.jpg)"}
    //loggedIn: true,
  }),
  computed:{
	loggedIn(){		
		return this.$store.state.auth.status.loggedIn;	
	}
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
	  this.$store.dispatch("info/reset")
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

<style lang="sass">
@import "./style/globalStyle"

.v-application
  font-family: 'Mansalva', cursive !important
  .title // To pin point specific classes of some components
    font-family: 'Mansalva', cursive !important

.image
 background-repeat: no-repeat
 -webkit-background-size: cover
 -moz-background-size: cover
 -o-background-size: cover
 background-size: cover

.divTitle
  color: black
  font-family: 'Brush Script MT', cursive
  font-size: 30px  
  text-align: center
</style>


