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
      <v-card style="margin: 0 auto; width: 40em" class="elevation-12">
        <v-toolbar color="#9CCC65" dark flat>
          <v-toolbar-title>Inscription</v-toolbar-title>
          <v-spacer />
          <v-icon>mdi-account</v-icon>
        </v-toolbar>
        <v-card-text>
          <v-form
          ref="form"
          @submit.prevent="handleRegister"
          >
          <div>
              <v-text-field
                label="Prénom"
                type="text"
                required
                :rules="firstnameRules"
                v-model="user.firstname"
              />
            </div>
            <div>
              <v-text-field
                label="Nom"
                type="text"
                required
                :rules="lastnameRules"
                v-model="user.lastname"
              />
            </div>
            <div>
              <v-text-field
                label="Email"
                type="text"
                required
                :rules="emailRules"
                v-model="user.email"
              />
            </div>
            <div>
              <v-text-field
                label="Mot de passe"
                type="password"
                required
                :rules="passwordRules"
                v-model="user.password"
              />
            </div>
            <v-btn
              type="submit"
              color="#9CCC65"
              style="color: white; float: right"
              >Inscription</v-btn
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
        Déjà inscrit? <v-btn text color="primary" @click="$router.push('/login');" >Se connecter</v-btn>
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
import User from '../models/user';
export default {
  name: 'Register',
  data() {
    return {
      user: new User('', '', '', ''),
      submitted: false,
      invalid: false,
      message: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        v => !!v || 'Password is required'
      ],
      lastnameRules: [
        v => !!v || 'Lastname is required'
      ],
      firstnameRules: [
        v => !!v || 'Fisrtname is required'
      ]
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/');
    }
  },
  methods: {
    handleRegister() {
      this.message = '';
      this.submitted = true;
        if (this.$refs.form.validate()) {
          this.$store.dispatch('auth/register', this.user).then(
            data => {
              this.message = data.message;
              this.invalid = false;
              this.$router.push("/login");
            
            },
            error => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              this.invalid = true;
            }
          );
        }
    }
  }
};
</script>

<style lang="sass">
.colorBackCont
  background-color: #DCEDC8

.myFontTitle
  font-family: 'Mansalva', cursive
</style>