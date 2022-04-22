const axios = require('axios');
/**
* @overview : fonction donnant le nutriscore et les Kcal pour 100g, a besoin du code barre.
* @requires : npm install xmlhttprequest
* @param int bar_code : le numéro du code barre exemple : 737628064502
* @return : [nutrisocre::type(String),kcal_pour_100g::type(int)] => exemple [ 'c', 385 ]
 */
function get_stats_from_barreCode(bar_code) {
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

    var url = 'http://world.openfoodfacts.org/api/v0/product/' + bar_code.toString() + '.json'
    var xhr = new XMLHttpRequest();

    var nutriscore;
    var kalorie;

    xhr.open("GET", url, false)//false obligatoire sinon la fonction est non bloquante
    xhr.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);

            nutriscore = myArr["product"]["nutrition_grade_fr"];
            kalorie = myArr["product"]["nutriments"]["energy_value"];

        };
    };

    xhr.send();

    return ([nutriscore, kalorie])
}

/**
 *
 * @param product
 * @returns {Promise<AxiosResponse<any>>}
 */
async function getProduct(product) {

    let link = "https://be-fr.openfoodfacts.org/cgi/search.pl?search_terms2=" + product.nom
    for (let i = 0; i < product.types.length; i++) {
        link += "&tagtype_" + i + "=categories&tag_contains_" + i + "=contains&tag_" + i + "=" + product.types[i]

    }
    var raw_data =  await axios.get(link + "&page=1&search_simple=1&action=process&json=1");


    // ---beginning of treatment---
    let n_word = ["jus"] // liste pour ban tout les mots imposible


    let list_for_return = []
    let name_of_product = product.nom.toLowerCase()
    let is_ok = false

    raw_data.data.products.forEach( product => {

        try{

            is_ok = product.known_ingredients_n <= 3 || product.known_ingredients_n === undefined
            is_ok = is_ok && product.product_name_fr !== undefined
            is_ok = is_ok && (((product.product_name_fr.toLowerCase()).includes(name_of_product.toLowerCase()) || product.product_name_fr.toLowerCase() === name_of_product))
            n_word.forEach(ban_word => {
                is_ok = is_ok && !(product.product_name_fr.toLowerCase()).includes(ban_word.toLowerCase())
            })
            is_ok = is_ok && !(list_for_return.includes((product.product_name_fr.replace(product.brands,"").replace("-","")).toLowerCase())) //normal

            is_ok = is_ok && !(list_for_return.includes(((product.product_name_fr.replace(product.brands,"").replace("-","")).toLowerCase())-"s")) //pluriel
            is_ok = is_ok && !(list_for_return.includes(((product.product_name_fr.replace(product.brands,"").replace("-","")).toLowerCase())+"s")) //pluriel
           
        }catch (e){
            is_ok = false
        }

        if (is_ok){

            var good_product = (product.product_name_fr.replace(product.brands,"").replace("-","")).toLowerCase()
            /**
                {
                    "code":product._id,
                    "nom": (product.product_name_fr.replace(product.brands,"").replace("-","")),
                    "nutriscore":product.nutrition_grade_fr,
                    "calorie":product.nutriments.energy_value
            }*/



            list_for_return.push(good_product)


        }

    })
    // supression des doublons






    return list_for_return
}

module.exports = { get_stats_from_barreCode, getProduct };
