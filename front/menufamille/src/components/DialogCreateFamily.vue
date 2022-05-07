<template>
  <v-row justify="center">
    <v-dialog v-model="dialogPw" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Création d'une famille</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                  <v-form
                  ref="form"
                  >
                <v-text-field
                  label="Nom de la famille"
                  type="string"
                  v-model="name"
                  required
                  :rules="nameRules"
                  color="#9CCC65"
                ></v-text-field>
                  </v-form>
              </v-col>
            </v-row>
            <v-row class="mb-4" justify="space-between">
              <v-col class="text-left">
                <h4>Nombre de personnes dans la famille:</h4>
                <span class="text-h2 font-weight-light" v-text="count"></span>
                <span class="subheading font-weight-light mr-1">Personnes</span>
              </v-col>
            </v-row>
            <v-row>
              <v-slider
                v-model="count"
                track-color="grey"
                always-dirty
                min="1"
                max="50"
                color="#9CCC65"
              >
                <template v-slot:prepend>
                  <v-icon @click="decrement"> mdi-minus </v-icon>
                </template>

                <template v-slot:append>
                  <v-icon @click="increment"> mdi-plus </v-icon>
                </template>
              </v-slider>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn rounded class="grey" text @click="$emit('closeFam')">
            Annuler
          </v-btn>
          <v-btn rounded class="colorbtnGreen" @click="create"> Créer </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import FamilyDao from "../services/api.famille";
let DAOfamily = new FamilyDao();
export default {
  props: ["dialog"],
  data() {
    return {
      dialogPw: this.dialogProc,
      message: "",
      name: "",
      count: 1,
      nameRules: [
        v => !!v || 'Veuillez entrer un nom',
        v => v !== null && v.length > 0 || 'nom invalide',
      ],
    };
  },
  mounted() {
    this.name = "";
    this.count = 0;
    this.message = "";
  },
  methods: {
    decrement() {
      this.count--;
    },
    increment() {
      this.count++;
    },
    create() {
        if (!this.$refs.form.validate()) return;
        DAOfamily.createFamily(this.$store.state.auth.user.id_membre, {nom: this.name, count: this.count}).then(
          (response) => {
            this.$emit('closeFam');
          }
        )
    }
  },
  watch: {
    dialog: function () {
      this.dialogPw = this.dialog;
    },
  },
};
</script>