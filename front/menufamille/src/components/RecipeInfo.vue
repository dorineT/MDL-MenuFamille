<template>
    <v-row>
        <v-dialog
            v-model="dialogInfoRecipe"
            scrollable          
            persistent :overlay="false"
            :max-width="width"
            transition="dialog-transition"
        >
        <v-card>
            <v-toolbar dark color="#FFB74D">
                <v-btn icon dark @click="$emit('closeDialog', false, message)">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                
            </v-toolbar>
            <v-card-title primary-title>
                <div>
                    <h3 class="headline mb-0">{{recipe.nom}}</h3>                    
                </div>
            </v-card-title>
            <v-card-text>
                {{ recipe.preparation}}
            </v-card-text>
        </v-card>
            
        </v-dialog>
    </v-row>
</template>

<script>
import RecetteDAO from '../services/api.recette'
let DAORecette = new RecetteDAO()

export default {
    props:['id_recette', 'dialogInfoRecipe'],
    data(){
        return{
            error: false,
            message: "",
            recipe: {}
        }
    },
    created(){
        //get recette info
        DAORecette.getById(this.id_recette).then(
          (response) => {            
            this.recipe = response         
            this.error = false
          },
          (error) => {
            
            this.error = true;
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();

            $emit('closeDialog', error, message)
          }
        )
    },
    computed:{
        width(){
            let x = 100
            switch (this.$vuetify.breakpoint.name) {
                case 'xs': return this.$vuetify.breakpoint.width - x
                case 'sm': return this.$vuetify.breakpoint.width - x
                case 'md': return this.$vuetify.breakpoint.width - x
                case 'lg': return this.$vuetify.breakpoint.width - x*2
                case 'xl': return this.$vuetify.breakpoint.width - x*3
            }
        }
    }
}
</script>