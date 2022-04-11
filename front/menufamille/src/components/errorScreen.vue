<template>
  <v-card :max-height="ContainerHeight">
    <v-card-text lazy align="center">
          <v-img
            :aspect-ratio="16 / 9"
            contain
            max-width="1500"
            src="../assets/error.gif"
          ></v-img>
          <h1 style="font-size: 20px; margin-top: 40px">
            Une erreur est survenue :( 
          </h1>
          <h3>
              <strong color="red"> {{ errorMessage }} </strong>
          </h3>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  computed: {
    errorMessage() {
      return this.$store.state.loading.message;
    },
    ContainerHeight() {
      let x = 200;
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return this.$vuetify.breakpoint.height - x;
        case "sm":
          return this.$vuetify.breakpoint.height - x;
        case "md":
          return this.$vuetify.breakpoint.height - x;
        case "lg":
          return this.$vuetify.breakpoint.height - x;
        case "xl":
          return this.$vuetify.breakpoint.height - x;
      }
    },
  },
};
</script>