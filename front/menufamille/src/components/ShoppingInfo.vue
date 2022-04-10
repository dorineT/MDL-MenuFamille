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
    max-width="500"
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
                 <v-btn> <strong> {{item.name}}</strong> </v-btn>
                </v-list-item-title>
             </v-list-item-content>  

             <div>
                  <v-img
                  max-height="50"
                  max-width="50"
                  :src="item.image"
                  >
                  </v-img>
              </div>

                <v-list-item-action> 
                   
                        <p>Quantité : {{item.quantité}}</p>
                 
                </v-list-item-action>
              
              
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
                {
                name:"Tomate rouge",
                quantité:"1",
                image:"https://cdn.pixabay.com/photo/2013/07/12/18/19/tomato-153272_960_720.png"
                
                },
                {
                name: "lait",
                quantité:"2",
                image:"https://cdn.pixabay.com/photo/2017/01/27/11/54/milk-bottle-2012800_960_720.png"
                },
                {
                name:"tablette de chocolat",
                quantité:"3",
                image:"https://cdn.pixabay.com/photo/2016/04/01/10/16/bar-1299829_960_720.png"
                },
                {
                name:"fraise",
                quantité:"4",
                image:"https://thumbs.dreamstime.com/z/fraise-fra%C3%AEche-40742985.jpg"
                },
                {
                name:"pomme",
                quantité:"5",
                image:"https://cdn.pixabay.com/photo/2015/06/11/13/40/apple-805819_960_720.png"
                },
                {
                name:"fromage",
                quantité:"6",
                image:"https://cdn.pixabay.com/photo/2016/01/09/07/59/cheese-1129908_960_720.png"
                },
                {
                name:"poire",
                quantité:"7",
                image:"https://cdn.pixabay.com/photo/2013/07/12/16/56/pear-151526_960_720.png"
                },
                {
                name:"beurre",
                quantité:"8",
                image:"https://media.istockphoto.com/vectors/brick-of-butter-on-plate-with-knife-milk-based-product-vector-id637120866?s=612x612"
                },
                {
                name:"confiture",
                quantité:"9",
                image:"https://cdn.pixabay.com/photo/2020/06/24/07/34/strawberries-5335158_960_720.jpg"
                },
                {
                name:"pain",
                quantité:"10",
                image:"https://cdn.pixabay.com/photo/2016/03/26/18/23/bread-1281053_960_720.jpg"
                },
                {
                name:"TV",
                quantité:"11",
                image:"https://cdn.pixabay.com/photo/2019/12/10/01/10/vector-4684771_960_720.png"
                },
                {
                name:"cola",
                quantité:"12",
                image:"https://media.istockphoto.com/photos/image-of-cola-glass-with-ice-cubes-over-white-picture-id482707206"
                },
            ],
           
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
