/**
* @overview : fonction donnant le nutriscore et les Kcal pour 100g, a besoin du code barre.
* @requires : npm install xmlhttprequest
* @param int bar_code : le numéro du code barre exemple : 737628064502
* @return : [nutrisocre::type(String),kcal_pour_100g::type(int)] => exemple [ 'c', 385 ]
 */
function get_stats_from_barreCode(bar_code) {
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

    var url = 'http://world.openfoodfacts.org/api/v0/product/'+bar_code.toString()+'.json'
    var xhr = new XMLHttpRequest();

    var nutriscore;
    var kalorie;

    xhr.open("GET",url,false)//false obligatoire sinon la fonction est non bloquante
    xhr.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);

            nutriscore = myArr["product"]["nutrition_grade_fr"];
            kalorie = myArr["product"]["nutriments"]["energy_value"];

        };
    };

    xhr.send();

    return ([nutriscore,kalorie])
}

/**
 * @overview : fonction donnant la liste d'éléments correspondant au nom proposé.
 * Veiller à bien écrire le mot recherché par exemple oeuf ne fonctionnera pas,
 * il faut taper oeufs. Il y a plus de résultats si la recherche est en anglais
 * @requires : npm install xmlhttprequest
 * @param name String : nom du plats : exemple pizzas
 * @param page int : numéro de la page par défaut 1
 * @return : une liste de liste exemple [[ '7613034405302', "FRAICH'UP  Pizza Reine Blanche", 'b', 949 ],[....]]
 */
function get_stats_from_name(name,page = 1){
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhr = new XMLHttpRequest();
    var url = 'https://fr-en.openfoodfacts.org/category/'+name.toString()+'/'+page.toString()+'.json'

    var myArr;
    var list_for_return = [];

    xhr.open("GET",url,false)//false obligatoire sinon la fonction est non bloquante
    xhr.responseType = 'json'
    xhr.onreadystatechange = function() {

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

    return list_for_return
}

module.exports =  {get_stats_from_barreCode,get_stats_from_name};