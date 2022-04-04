<template>
          <v-card
            color="#faa62a"
            dark
          >
          <v-container fluid>
            <v-row>
              <v-col>

                <v-card-subtitle>{{name}} veut rejoindre votre famille!</v-card-subtitle>


              </v-col>
              <v-col class="align-self-center ">
                 <v-btn
                  class="ml-3 mr-3"
                  rounded
                  small
                  color= 'red'
                  @click="$emit('requestStatut', 'refused', id)"
                >
                  Refuser
                </v-btn>

                <v-btn
                  class="ml-3 mr-3"
                  rounded
                  small
                  color= 'green'
                  @click="$emit('requestStatut', 'accepted', id)"
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
