<template>

    <v-card 
    class="cardShopping">

      <v-container fluid>
        <v-row class="d-flex justify-end ">
          <v-col>
            <v-select
            color="orange lighten-2"
            label="Choix du menu"
            class="combobox-class"
            menu-props="auto"
            no-data-text="Aucun menu disponible"
            :items="itemPeriode"    
            v-model="comboboxMenuSelected">
            
            </v-select>
          </v-col>
          <v-col cols="12" sm="12" md="3" lg="3" xl="3" >          
            <v-select
              v-model="selectedFamille"
              :items="famille"
              menu-props="auto"
              label="Famille"
              hide-details
              prepend-icon="mdi-account-group"
              single-line     
              no-data-text="Aucune famille disponible"
              @change="changeFamille()"
            ></v-select>
          </v-col>
        </v-row>
      </v-container>

      <div v-if="comboboxMenuSelected===null">
        <v-img
           :aspect-ratio="16/9"                  
          contain
          max-height="400"
          src="../assets/selectMenu.png">
        </v-img>
      </div>

      <v-container v-else class="containShop ml-3" fluid >
          <v-row>
              <v-col cols= "12" sm="6" md="6" lg="6" xl="6"> 
                  
                  <v-card
                      elevation="16"
                      max-width="700"
                      class="listeDenree"

                      >
                      <v-card-title>
                        <v-row justify-space-between>
                          <v-col>
                            Liste de courses
 
                          </v-col>
                          <v-col cols="2" sm="2" md="2" lg="2" xl="2">
                             <v-btn
                              fab
                              dark
                              color="#9CCC65"
                              @click="generatePDF"
                            >
                              <v-icon dark>
                                mdi-file-download-outline
                              </v-icon>
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-card-title>

                      <v-card-text>
                        <v-virtual-scroll
                            :items="items"
                            :height="calculatedHeight"
                            item-height="80"
                            v-if="items.length>0"
                            >
      
                            <template v-slot:default="{item}">
                                <v-list-item :key="item.nom">
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            <span> <strong> {{item.nom}}</strong> </span>
                                        </v-list-item-title>
                                    </v-list-item-content> 

                    
                                    <v-list-item-action> 
                                        <p>Quantité : {{item.quantite}}</p>
                                    </v-list-item-action>
                                </v-list-item>
                                <v-divider></v-divider>
                            </template>
                        </v-virtual-scroll>
                        <h2 v-else>Liste de courses vide</h2>
                      </v-card-text>
                  </v-card>
              </v-col>
          </v-row>
      </v-container>
 
    </v-card>


</template>


<script>
import MenuDao from '../services/api.menu'
let DAOMenu = new MenuDao()

export default {
  data(){
    return{
      selectedFamille: null,
      famille: [],
      itemPeriode: [],
      comboboxMenuSelected: null,

      //course
      itemsN: [],
      items:[
          {
          nom:"Tomate rouge",
          quantite:"1",
          image:"https://cdn.pixabay.com/photo/2013/07/12/18/19/tomato-153272_960_720.png"
                
          },
          {
          nom: "lait",
          quantite:"2",
          image:"https://cdn.pixabay.com/photo/2017/01/27/11/54/milk-bottle-2012800_960_720.png"
          },
          {
          nom:"tablette de chocolat",
          quantite:"3",
          image:"https://cdn.pixabay.com/photo/2016/04/01/10/16/bar-1299829_960_720.png"
          },
          {
          nom:"fraise",
          quantite:"4",
          image:"https://thumbs.dreamstime.com/z/fraise-fra%C3%AEche-40742985.jpg"
          },
          {
          nom:"pomme",
          quantite:"5",
          image:"https://cdn.pixabay.com/photo/2015/06/11/13/40/apple-805819_960_720.png"
          },
          {
          nom:"fromage",
          quantite:"6",
          image:"https://cdn.pixabay.com/photo/2016/01/09/07/59/cheese-1129908_960_720.png"
          },
          {
          nom:"poire",
          quantite:"7",
          image:"https://cdn.pixabay.com/photo/2013/07/12/16/56/pear-151526_960_720.png"
          },
          {
          nom:"beurre",
          quantite:"8",
          image:"https://media.istockphoto.com/vectors/brick-of-butter-on-plate-with-knife-milk-based-product-vector-id637120866?s=612x612"
          },
          {
          nom:"confiture",
          quantite:"9",
          image:"https://cdn.pixabay.com/photo/2020/06/24/07/34/strawberries-5335158_960_720.jpg"
          },
          {
          nom:"pain",
          quantite:"10",
          image:"https://cdn.pixabay.com/photo/2016/03/26/18/23/bread-1281053_960_720.jpg"
          },
          {
          nom:"TV",
          quantite:"11",
          image:"https://cdn.pixabay.com/photo/2019/12/10/01/10/vector-4684771_960_720.png"
          },
          {
          nom:"cola",
          quantite:"12",
          image:"https://media.istockphoto.com/photos/image-of-cola-glass-with-ice-cubes-over-white-picture-id482707206"
          },
      ],

    }
  },

  async mounted(){            
    this.$store.state.auth.user.roles.forEach(element => {        
      this.famille.push(element[1])
    });
    if(this.$store.state.info.nomFamille !== null) {
      this.selectedFamille = this.$store.state.info.nomFamille
      this.itemPeriode = []  
      this.i = 0     
      await this.getLockedMenu()                
        
    } else {
      this.selectedFamille = this.famille.length > 0 ? this.famille[0] : null
      this.changeFamille();
    }  
      
  },
  computed:{
    calculatedHeight(){
      let x = 350
      switch (this.$vuetify.breakpoint.nom) {
          case 'xs': return this.$vuetify.breakpoint.height - x
          case 'sm': return this.$vuetify.breakpoint.height - x
          case 'md': return this.$vuetify.breakpoint.height - x
          case 'lg': return this.$vuetify.breakpoint.height - x
          case 'xl': return this.$vuetify.breakpoint.height - x
      }
    }
  },
  watch:{
    comboboxMenuSelected(slot){
      if(this.comboboxMenuSelected === null) return

      DAOMenu.getShopList(slot).then(
        (response)=>{
          this.items = response.data
        }
      )
    }
  },
  methods:{
    async changeFamille(){       
      //select les menus correspondants
      if(this.selectedFamille !== null){
        let famille = this.$store.state.auth.user.roles.find(el => el[1] === this.selectedFamille)
        // change store value
        this.$store.dispatch("info/changeFamille", [famille[0], famille[1], famille[2], famille[3]])   
        this.itemPeriode = []    
        this.i = 0      
        await this.getLockedMenu() 
                          
      }
    },
    getLockedMenu(){   
      this.itemPeriode= [] 
      DAOMenu.getMenuLock(this.$store.state.info.idFamilleActuel).then(
        (response) =>{
          let menus = response.data       
          menus.forEach(menu => {           
              let periode = {
                text:menu.periode_debut+ ' - ' +menu.periode_fin,           
                value: menu.id_menu,                    
            }
            this.i+=1
            this.itemPeriode.push(periode)              
          })
        }
      )
    },
    generatePDF(){
      alert('generate liste')
    }
  }
}
</script>

<style lang="sass">
.cardShopping
  margin: 10px

</style>


