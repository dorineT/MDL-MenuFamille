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


async function getProduct(product) {
    let link = "https://be-fr.openfoodfacts.org/cgi/search.pl?search_terms2=" + product.nom
    for (let i = 0; i < product.types.length; i++) {
        link += "&tagtype_" + i + "=categories&tag_contains_" + i + "=contains&tag_" + i + "=" + product.types[i]
    }

        if (this.readyState == 4 && this.status == 200) {

            myArr = JSON.parse(this.responseText);

            var temp = []
            for (let row of myArr["products"]) {
                temp = []
                temp.push(row["_id"])// id
                temp.push(row["product_name_fr"])// nom
                temp.push(row["nutrition_grade_fr"])//score
                temp.push(row["nutriments"]["energy_value"])// Kcal
                list_for_return.push(temp)
        }
        };
    };

    xhr.send();

    return axios.get(link + "&page=1&search_simple=1&action=process&json=1");
}

module.exports = { get_stats_from_barreCode, getProduct };
