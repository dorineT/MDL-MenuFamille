<template>
          <v-card
            color="#faa62a"
            dark
          >
          <v-container fluid>
            <v-row>
              <v-col cols="10" xs="10" sm="10" md="10" lg="10" xl="10">

                <v-card-subtitle>Votre adhésion à la famille {{name}} a été refusé !</v-card-subtitle>


              </v-col>
              <v-col class="align-self-center " cols="1" xs="1" sm="1" md="1" lg="1" xl="1">
                 <v-btn
                  rounded
                  small
                  color= 'red'
                  @click="$emit('deleteNotif', id )"
                >
                  OK
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
