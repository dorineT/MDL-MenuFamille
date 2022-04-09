<template>
    <v-select
        class="combobox_class"
        color="orange lighten-2"
        label="Choix du menu"
        no-data-text="Aucun menu disponible"
        v-model="comboboxMenu"
        >               <!--items-->
    </v-select>
</template>

<script>
export default {
    data(){
        return{
            comboboxMenu: null,
        }
    },

mounted (){
    this.comboboxMenu = 'Aucun menu sélectionné'
},
/*
watch:{
    async comboboxMenu(slot){
        if(slot === 'Aucun menu sélectionné'){
            this.items = []

            }
        }
    }*/
} 


</script>

<style lang="sass">
.combobox_class
    margin: 20px
    width: 250px
</style>
