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
              >Connexion</v-btn
            >
            <br /><br />
          </v-form>
        </v-card-text>
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
      user: new User("", ""),
      loading: false,
      invalid: false,
      message: "",
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        v => !!v || 'Name is required'
      ],
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
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
              console.log(error)
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
.colorBackCont
  background-color: #DCEDC8

.myFontTitle
  font-family: 'Mansalva', cursive
</style>