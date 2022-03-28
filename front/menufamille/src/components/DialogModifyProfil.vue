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
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Nouveau mot de passe"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Répéter nouveau mot de passe"
                  type="password"
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
            @click="$emit('closePass')"
          >
            Sauvegarder
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ['dialog'],
  data() {
    return {
      dialogPw: this.dialogProc
    }
  },
  watch: {
    dialog: function () {
      this.dialogPw = this.dialog
    }
  }
}
</script>