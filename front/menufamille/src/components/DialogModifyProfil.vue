<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialogPw"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Modification mot de passe</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Ancien mot de passe"
                  type="password"
                  v-model="password"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Nouveau mot de passe"
                  type="password"
                  v-model="newPassword[0]"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Répéter nouveau mot de passe"
                  type="password"
                  v-model="newPassword[1]"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="$emit('closePass')"
          >
            Annuler
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="modifier"
          >
            Sauvegarder
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import UserDao from '../services/api.user'
let DAOUser = new UserDao();
export default {
  props: ['dialog', 'id'],
  data() {
    return {
      dialogPw: this.dialogProc,
      update: false,
      password: "",
      newPassword: []
    }
  },
  mounted() {
    this.newPassword = [],
    this.password = "";
  },
  methods: {
    modifier() {
      if (!(this.newPassword[0] == this.newPassword[1])) {
        this.$store.dispatch("loading/error", "les nouveaux mot de passes ne sont pas identiques!");
        return;
      }
      DAOUser.updateUserPwd(this.id, {password: this.password, newPassword: this.newPassword[0]}).then(
        () => {
              this.$emit('closePass');
            }
      )
    }
  },
  watch: {
    dialog: function () {
      this.dialogPw = this.dialog
    }
  }
}
</script>