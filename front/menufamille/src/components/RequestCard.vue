<template>
          <v-card
            color="#faa62a"
            dark
          >
          <v-container fluid>
            <v-row>
              <v-col>
                 <v-card-title
                  class="text-h5"
                  v-text="name"
                ></v-card-title>

                <v-card-subtitle>{{name}} veut rejoindre votre famille!</v-card-subtitle>


              </v-col>
              <v-col class="align-self-center ">
                 <v-btn
                  class="ml-3 mr-3"
                  outlined
                  rounded
                  small
                >
                  Refuser
                </v-btn>

                <v-btn
                  class="ml-3 mr-3"
                  outlined
                  rounded
                  small
                >
                  Accepter
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
          </v-card>
</template>

<script>
export default {
  props: ['name', 'id'],
  data() {
    return {
    }
  }
}
</script>
