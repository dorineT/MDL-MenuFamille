<template>
  <div>
    <v-container fluid style="padding: 3em" class="colorBackCont myFontTitle">
      <v-row style="text-align: center; ">
        <v-col>   
          <h3 style="font-size: 25px">Concocter vos repas en deux coups de fourchettes !</h3>
        </v-col>
      </v-row>
    </v-container>

    <div style="margin-top: 3em">
      <v-card  style="margin: 0 auto;width: 40em" class="elevation-12">
        <v-toolbar color="#9CCC65" dark flat >
          <v-toolbar-title>Connexion</v-toolbar-title>
          <v-spacer />
          <v-icon>mdi-account</v-icon>
        </v-toolbar>
        <v-card-text>
          <v-form @submit.prevent="login">
            <div>
              <v-text-field label="Username" type="text" required v-model="username"/>
            </div>
            <div>
              <v-text-field label="Mot de passe" type="password" required v-model="password"/>
            </div>
            <v-btn type="submit" color="#9CCC65" style="color: white; float: right">Connexion</v-btn>
            <br><br>
          </v-form>
        </v-card-text>
      </v-card>
    </div>
      
    <v-container fluid>
      <div style="width:40em; margin: 0 auto; text-align: center" v-if="invalid">
        <v-alert border="right" color="#D32F2F" >
          <h4 style="color: white; font-size: x-large; font-weight: bold;">Identifiants invalides</h4>
        </v-alert>
      </div>
    </v-container> 
  </div>
</template>

<script>

  export default {
    
    data(){
      return {
        username : "",
        password : "",
        invalid : false
      }
    },
    methods: {
      /*login: function () {
        let username = this.username
        let password = this.password

        this.$store.dispatch('login', { username, password })
       .then(() => this.$router.push('/'))
       .catch(err => this.invalid = true)
      }*/
    }
  }
</script>

<style lang="sass">
.colorBackCont
    background-color: #DCEDC8

.myFontTitle
    font-family: 'Mansalva', cursive    
</style>