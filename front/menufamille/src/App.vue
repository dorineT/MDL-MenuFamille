<template>
	<v-app>
		
		<v-navigation-drawer v-model="drawer" app color="#F5F5F5" elevation="10" v-if="loggedIn">
      <v-img        
        height="100%"
        class="image"
        src="./assets/verticalImage.jpg">
			<v-list nav dense>
				<v-list-item-group active-class="orange lighten-2--text text--accent-4">
					<v-list-item to="/" @click="drawer = ! drawer; notification">
						<v-list-item-icon>
							<v-icon>mdi-home</v-icon>
						</v-list-item-icon>
						<v-list-item-title>Accueil</v-list-item-title>
					</v-list-item>

					<v-list-item to="/creationMenu" v-if="this.$store.state.info.roleActuel==='parent'"  @click="() => {this.notification(); return drawer = ! drawer}">
						<v-list-item-icon>
							<v-icon>mdi-pencil</v-icon>
						</v-list-item-icon>
						<v-list-item-title>Nouveau menu</v-list-item-title>
					</v-list-item>
					<v-list-item to="/recipe"  @click="() => {this.notification(); return drawer = ! drawer}">
						<v-list-item-icon>
							<v-icon>mdi-food-turkey</v-icon>
						</v-list-item-icon>
						<v-list-item-title>Recettes</v-list-item-title>
					</v-list-item>
					<v-list-item to="/shoppingList"  @click="() => {this.notification(); return drawer = ! drawer}">
						<v-list-item-icon>
							<v-icon>mdi-format-list-text</v-icon>
						</v-list-item-icon>
						<v-list-item-title>Liste de courses</v-list-item-title>
					</v-list-item>
          <v-list-item to="/history" @click="drawer = ! drawer; notification">
            <v-list-item-icon>
              <v-icon>mdi-history</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Historique</v-list-item-title>
          </v-list-item>
					<v-list-item to="/family"  @click="() => {this.notification(); return drawer = ! drawer}">
						<v-list-item-icon>
							<v-icon>mdi-account-group</v-icon>
						</v-list-item-icon>
						<v-list-item-title>Famille</v-list-item-title>
					</v-list-item>
					<v-list-item to="/profile"  @click="() => {this.notification(); return drawer = ! drawer}">
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
      </v-img>
		</v-navigation-drawer>

    <v-app-bar app color="#FFB74D" v-if="loggedIn">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-container fluid>
        <v-toolbar-title style="align-content: center"
          ><div class="divTitle">
			  <v-icon dark color="black" large>mdi-silverware-fork</v-icon>
			  Menu Famille
			  <v-icon dark color="black" large class="rotate">mdi-silverware-fork</v-icon>
			</div></v-toolbar-title
        >
      </v-container>
      <div style="align-content: right">
        <v-menu open-on-hover bottom offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-badge
              color="red"
              overlap
              :content="nb_notif"
			  v-show="isNotif"
            >
              <v-icon 
			  color="black"
			  v-bind="attrs"
          	  v-on="on"> mdi-bell-ring </v-icon>
            </v-badge>
            <v-icon color="black" v-show="!isNotif"> mdi-bell-ring </v-icon>
          </template>
		  <v-card>
          <v-list>
			<v-subheader>Notifications</v-subheader>
            <v-divider></v-divider>
            <v-col v-for="famille in listNotif" :key="famille.famille">
                <notif-card :name="famille.famille" :id="famille.id" @deleteNotif="removeNotif"/>
            </v-col>
          </v-list>
		  </v-card>
        </v-menu>
      </div>
    </v-app-bar>

    <v-main :style="image" class="image">
      <div class="ma-10" v-if="isError">
      <v-alert  
                type="error"
                border="left"
                width="100%"
                elevation="2"
                dismissible 
              >
                {{ errorMessage }}
      </v-alert>
      </div>
      <!--<error-screen style="opacity: 0.85" class="ma-10" v-if="isError" /> -->
      <loading-avocado style="opacity: 0.85" class="ma-10" v-if="isLoading"/>
      <router-view style="opacity: 0.85" v-show="!isLoading" />
    </v-main>
  </v-app>
</template>

<script>
import EventBus from "./common/EventBus";
import FamilyDao from "./services/api.famille";
import UserDAO from "./services/api.user";
import NotifCard from "./components/NotifCard.vue";
import LoadingAvocado from './components/loadingAvocado.vue';
import ErrorScreen from './components/errorScreen.vue';
let DAOfamily = new FamilyDao();
let DAOuser = new UserDAO();

export default {
  name: "App",
  components: { NotifCard, LoadingAvocado, ErrorScreen},  
  metaInfo: {
    meta: [{ "http-equiv": "refresh", content: "900" }],
  },
  data: () => ({
    listNotif: [],
    drawer: false,
    image: {
      backgroundImage:
        "url(https://img.wallpapersafari.com/desktop/1680/1050/26/92/0KH5pV.jpg)",
    },
    //loggedIn: true,
  }),
  computed: {
    errorMessage() {
      return this.$store.state.loading.message;
    },
    isError() {
      console.log(this.loggedIn)
      return this.$store.state.loading.isError && this.loggedIn;
    },
    isLoading() {
      return this.$store.state.loading.isLoading;
    },
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentFamily() {
      return this.$store.state.info;
    },
    nb_notif() {
      return this.listNotif.length;
    },
	isNotif() {
		return this.nb_notif > 0;
	}
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$store.dispatch("info/reset");
      this.$store.dispatch("loading/reset");
      this.$router.push("/login");
    },

    notification() {
      this.listNotif = [];
      DAOfamily.getNotif().then((response) => {
        response.data.forEach((notif) => {
          let value = {
            famille: notif.nom,
			id: notif.id_famille
          };
          this.listNotif.push(value);
        });
      });
    },
	removeNotif(id) {
      DAOuser.removeNotif(id).then((response) => {
        const item = this.listNotif.find(notif => notif.id == id)
        this.listNotif.splice(this.listNotif.indexOf(item), 1)
      });
    }
  },
  mounted() {
    EventBus.on("logout", () => {
      this.logOut();
    });
    if(this.loggedIn) this.notification();    
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

.rotate 
    transform: rotate(-90deg)
</style>


