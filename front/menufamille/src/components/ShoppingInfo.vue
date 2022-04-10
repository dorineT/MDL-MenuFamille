<template>

<div> 
    <v-select
        class="combobox_class"
        color="orange lighten-2"
        label="Choix du menu"
        no-data-text="Aucun menu disponible"
        v-model="comboboxMenu"
        >               <!--items à ajouter-->
    </v-select>
  
<v-btn class="viderListe" outlined color = "red" to = ""> Supprimer liste de course</v-btn>

<h3>Liste des denrées:</h3>

<v-card
    elevation="16"
    max-width="400"
    class="listeDenree"
    >
    <v-virtual-scroll
        :items="items"
        height="300"
        item-height="64"
        >
        <template v-slot:default="{item}">
            <v-list-item :key="item">
            <v-list-item-content>
                <v-list-item-title>
                 <v-btn> <strong> {{item}}</strong> </v-btn>
                </v-list-item-title>
            </v-list-item-content>

            </v-list-item>
            <v-divider></v-divider>
        </template>
    </v-virtual-scroll>
</v-card>

<div class="mag"> 
<h3>Magasins disponibles:</h3>
</div>
<!--
<v-card
    elevation="16"
    max-width="400"
    class="listeMagasins"
    >

    <v-virtual-scroll
        :items="items"
        height="300"
        item-height="64"
        >
        <template v-slot:default="{item}">
            <v-list-item :key="item">
             <v-list-item-action>
                <v-btn
                fab
                small
                depressed
                color="primary"
                >
                {{item}}
                </v-btn>
            </v-list-item-action>

            <v-list-item-content>
                <v-list-item-title>
                    <strong> {{item}}</strong>
                </v-list-item-title>
            </v-list-item-content>

            </v-list-item>
            <v-divider></v-divider>
        </template>
    </v-virtual-scroll>


</v-card> -->

 </div>
    
</template>

<script>
export default {
    data(){
        return{
            comboboxMenu: null,
            items:[
                "Tomate rouge",
                "boite de lait",
                "tablette de chocolat",
                "fraise",
                "pomme",
                "fromage",
                "poire",
                "beurre",
                "confiture",
                "pain",
                "TV",
                "cola",
            ]
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

.viderListe
    float: right
    margin-top: -70px

.mag
    float: right
    margin-top: -335px


</style>
