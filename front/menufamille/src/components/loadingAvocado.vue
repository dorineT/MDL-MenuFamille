<template>
    <v-card  :max-height="ContainerHeight">
        <v-card-text lazy  align="center">
               <v-img                                                  
              :aspect-ratio="16/9"                  
              contain
              max-width="500"
              src="../assets/tiny_loader.gif"                         
            ></v-img>
            <p style="font-size: 20px; margin-top:40px">Chargement en cours ...</p>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    computed: {
        ContainerHeight () {

            let x = 200
            switch (this.$vuetify.breakpoint.name) {
                case 'xs': return this.$vuetify.breakpoint.height - x
                case 'sm': return this.$vuetify.breakpoint.height - x
                case 'md': return this.$vuetify.breakpoint.height - x
                case 'lg': return this.$vuetify.breakpoint.height - x
                case 'xl': return this.$vuetify.breakpoint.height - x
            }
      },
    },
}
</script>