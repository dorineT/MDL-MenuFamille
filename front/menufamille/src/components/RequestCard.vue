<template>
          <v-card
            color="#faa62a"
            dark
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="text-h5"
                  v-text="name"
                ></v-card-title>

                <v-card-subtitle>{{name}} veut rejoindre votre famille!</v-card-subtitle>

                 <v-btn
                    class="ml-2 mt-5"
                    outlined
                    rounded
                    small
                  >
                    Refuser
                  </v-btn>

                  <v-btn
                    class="ml-2 mt-5"
                    outlined
                    rounded
                    small
                  >
                    Accepter
                  </v-btn>

            
                
             </div>
            </div>
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
