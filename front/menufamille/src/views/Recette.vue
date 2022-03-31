<template>
    <div class="cardmargin">
        <v-container fluid>
            <v-row>
                <v-col cols="12" sm="10" md="10" lg="10" xl="10">
                    <v-card>
                        <h2>Carnet de recette</h2>
                    </v-card>
                </v-col>
                <v-col cols="12" sm="4" md="4" lg="4" xl="4">
                    <v-card>
                        <!-- nom de recette -->
                        <v-virtual-scroll
                          :height="scrollHeight"
                          item-height="50"
                          :items="recipe"
                        >
                            <template v-slot:default="{ item }">
                              <v-list-item :key="item">
                                <v-list-item-content>
                                  <v-list-item-title>
                                    {{item}}
                                  </v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>

                              <v-divider></v-divider>
                            </template>
                
                        </v-virtual-scroll>
                    </v-card>
                </v-col>
                <v-col  cols="12" sm="8" md="8" lg="8" xl="8">
                    <v-card>
                        info recette 
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default{
    data(){
        return{
            recipe: ['frite','frite','lasagne','frite','frite','frite','frite','frite','frite','frite','frite','frite','frite',]
        }
    },
    computed: {
        scrollHeight () {
            //return (this.$vuetify.breakpoint.height - 100)
            console.log(this.$vuetify.breakpoint.name)
            console.log((this.$vuetify.breakpoint.height - 100))
            console.log(this.$vuetify.breakpoint.height)
            switch (this.$vuetify.breakpoint.name) {
                case 'xs': return 220
                case 'sm': return this.$vuetify.breakpoint.height - 220
                case 'md': return this.$vuetify.breakpoint.height - 220
                case 'lg': return this.$vuetify.breakpoint.height - 220
                case 'xl': return this.$vuetify.breakpoint.height - 220
            }
      },
    },
}
</script>

<style lang="sass">
.cardmargin
  margin: 10px
  padding: 10px
  //opacity: 85%
</style>