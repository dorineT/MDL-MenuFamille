const axios = require('axios');
var plural = require('rosaenlg-pluralize-fr');

function countWords(str) {
    const arr = str.split(' ');

    return arr.filter(word => word !== '').length;
}


function occurrences(string, otherString, search) {
    if (string === otherString) return true;
    let count = 0;

    for (let i = 0; i < countWords(string); i++) {
        for (let a = 0; a < countWords(otherString); a++) {
            let word0 = string.split(' ')[i];
            let word1 = otherString.split(' ')[a];
            if (word0 !== search && word1 != search) {
                if (word0 === word1) count++;
            }
        }
    }
    if (count > countWords(search)) return true;
    return false;
}

function occurrencesTypes(string, otherString) {
    if (string === otherString) return true;
    let count = 0;

    for (let i = 0; i < countWords(string); i++) {
        for (let a = 0; a < countWords(otherString); a++) {
            let word0 = string.split(' ')[i];
            let word1 = otherString.split(' ')[a];
            if (word0 === word1) count++;
        }
    }
    if (count > 2) return true;
    return false;
}

String.prototype.replaceNumber = function (obj, replace) {
    if (obj === null) return this;
    let finalString = '';
    let word = this;
    for (let each of word) {
        for (const o of obj) {
            for (const a of o) {
                if (each == a) {
                    each = replace;
                }
            }
        }
        finalString += each;
    }

    return finalString;
};

String.prototype.replaceWord = function (obj, replace) {
    if (obj === null) return this;
    let finalString = '';
    let word = this.split(' ');
    for (let each of word) {
        for (const o of obj) {
            if (each == o) {
                each = replace;
            }
        }
        finalString += " " + each;
    }

    return finalString;
};

/**
 *
 * @param product
 * @returns {Promise<AxiosResponse<any>>}
 */
async function getProduct(product) {

    let link = "https://fr.openfoodfacts.org/cgi/search.pl?search_terms2=" + product.nom.toLowerCase()
    for (let i = 0; i < product.types.length; i++) {
        link += "&tagtype_" + i + "=categories&tag_contains_" + i + "=contains&tag_" + i + "=" + product.types[i]

    }
    var raw_data = await axios.get(encodeURI(link + "&page_size=1000&search_simple=1&action=process&json=1"));

    let request_name = product.nom.toLowerCase();
    let pluriel;
    let list_return = [];
    let unity = ["kg", "gr", "g"]
    if (request_name.trim().indexOf(" ") != -1) {
        pluriel = plural(request_name[0])
    } else {
        pluriel = plural(request_name)
    }


    raw_data.data.products.forEach(product => {
        if (product.product_name_fr !== undefined) {
            console.log(product.product_name_fr)
            let product_name = product.product_name_fr.replace(/[~!@#$%^&*()_|+\-=?;:",.<>\{\}\[\]\\\/]/gi, ' ').replace(product.brands, "").trim().toLowerCase();
            if (product_name.replaceNumber(product.product_name_fr.match(/\d+/g), "").split(' ').some(element => unity.includes(element))) {
                product_name = product_name.replaceNumber(product.product_name_fr.match(/\d+/g), "").replaceWord(unity, "").trim();
            }
            let nutriscore = product.nutrition_grade_fr;
            let calorie = product.nutriments.energy_value;
            if (product_name.indexOf(request_name) === 0 && nutriscore !== undefined && calorie !== undefined) {
                var good_product =
                {
                    "nom": product_name,
                    "nutriscore": nutriscore.toUpperCase(),
                    "calorie": calorie
                }
                list_return.push(good_product);
            }
        }
    });
    return list_return.filter((v, i, a) => a.findIndex(v2 => (occurrences(v2.nom, v.nom, request_name)) && v2.nom !== pluriel && v.nom !== pluriel) === i);

}

async function getTypes() {
    var raw_data = await axios.get(encodeURI("https://fr.openfoodfacts.org/categories.json"));
    let types = ['bouteille']
    raw_data.data.tags.forEach(type => {
        if (type.products > 10 &&!type.name.includes('-') && !type.name.includes(':') && type.name.length > 1 && !types.some(function (item) {
            return occurrencesTypes(item, type.name)
        })) {
            types.push(type.name)
        }
    })
    return types
}

module.exports = { getProduct, getTypes };

