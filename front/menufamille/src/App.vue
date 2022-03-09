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

		<v-app-bar app color="#FFB74D">
			<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

			<v-toolbar-title><div class="divTitle">Forchete & Coûtê </div></v-toolbar-title>
		</v-app-bar>

		<v-main>
			<router-view />
		</v-main>
	</v-app>
</template>

<script>
	export default {
		name: "App",
		data: () => ({ drawer: false }),
	};
</script>

<style lang="sass">
.v-application
  font-family: 'Mansalva', cursive !important
  .title // To pin point specific classes of some components
    font-family: 'Mansalva', cursive !important

.divTitle
  color: black
  font-family: 'Brush Script MT', cursive
  font-size: 30px
</style>


