<template>
    <b-navbar toggleable="lg" type="dark" style="background-color: #00b300" sticky>
        <b-navbar-brand href="#">Menu</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <router-link to="/" class="nav-item nav-link">Accueil</router-link>
                <router-link to="/about" class="nav-item nav-link">Création de menu</router-link>
                <router-link to="/" class="nav-item nav-link">Historique</router-link>
                <router-link to="/" class="nav-item nav-link">Recettes</router-link>
                <router-link to="/" class="nav-item nav-link">Famille</router-link>
                <router-link to="/" class="nav-item nav-link">Compte</router-link>               
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>
<script>
export default {
  name: 'Navbar'
}
</script>