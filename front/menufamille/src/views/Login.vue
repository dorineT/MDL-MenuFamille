<template>
  <div>
    <v-container fluid style="padding: 3em" class="colorBackCont myFontTitle">
      <v-row style="text-align: center">
        <v-col>
          <h3 style="font-size: 25px">
            Concocter vos repas en deux coups de fourchettes !
          </h3>
        </v-col>
      </v-row>
    </v-container>

    <div style="margin-top: 3em">
      <v-card style="margin: 0 auto; width: 40em" class="elevation-12 noPadding">
        <v-toolbar color="#9CCC65" dark flat>
          <v-toolbar-title>Connexion</v-toolbar-title>
          <v-spacer />
          <v-icon>mdi-account</v-icon>
        </v-toolbar>
        <v-card-text>
          <v-form
          ref="form"
          @submit.prevent="handleLogin"
          >
            <div>
              <v-text-field
                label="Email"
                type="text"
                required
                :rules="emailRules"
                v-model="user.email"
              color="#9CCC65"
              />
            </div>
            <div>
              <v-text-field
                label="Mot de passe"        
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"            
                :type="show1 ? 'text' : 'password'"
                required
                :rules="passwordRules"
                v-model="user.password"
                @click:append="show1 = !show1"
              color="#9CCC65"
              />
            </div>
            <v-btn
              type="submit"
              color="#9CCC65"
              style="color: white; float: right"
              >Connexion</v-btn
            >
            <br /><br />
          </v-form>
        </v-card-text>
        <v-banner
            color="#9CCC65"
            elevation="13"
            single-line
            sticky
            style="color:white"
        >
        Pas encore inscrit? <v-btn text color="primary" @click="$router.push('/register');" >S'enregistrer</v-btn>
        </v-banner>
      </v-card>
    </div>

    <v-container fluid>
      <div
        style="width: 40em; margin: 0 auto; text-align: center"
        v-if="invalid"
      >
        <v-alert border="right" color="#D32F2F">
          <h4 style="color: white; font-size: x-large; font-weight: bold">
            {{message.message}}
          </h4>
        </v-alert>
      </div>
    </v-container>
  </div>
</template>

<script>
import User from "../models/user";
export default {
  name: "Login",
  data() {
    return {
      show1: false,
      user: new User("", ""),
      loading: false,
      invalid: false,
      message: "",
      emailRules: [
        v => !!v || 'E-mail requis',
        v => /.+@.+\..+/.test(v) || 'E-mail non valide',
      ],
      passwordRules: [
        v => !!v || 'Mot de passe requis'
      ],
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      if (!this.$refs.form.validate()) {
          this.loading = false;
          return;
      }
        if (this.user.email && this.user.password) {
          this.$store.dispatch("auth/login", this.user).then(
            () => {
              this.$router.push("/");
            },
            (error) => {           
              this.invalid = true;
              this.loading = false;
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
          );
        }
    },
  },
};
</script>

<style lang="sass">
@import "../style/globalStyle"
.colorBackCont
  background-color: #DCEDC8

.myFontTitle
  font-family: 'Mansalva', cursive
</style>