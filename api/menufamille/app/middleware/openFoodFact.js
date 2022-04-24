const axios = require('axios');
var plural = require('rosaenlg-pluralize-fr');

function countWords(str) {
    const arr = str.split(' ');
  
    return arr.filter(word => word !== '').length;
}


function occurrences(string, otherString, limit) {
    if(string ===  otherString) return true;
    let count = 0;
    
    for (let i=0; i< countWords(string); i++) {
        for (let a=0; a< countWords(otherString); a++) {
            if(string.split(' ')[i] === otherString.split(' ')[a]) count++;
        }
    }
    if( count > limit) return true;
    return false;
}

/**
 *
 * @param product
 * @returns {Promise<AxiosResponse<any>>}
 */
async function getProduct(product) {

    let link = "https://be-fr.openfoodfacts.org/cgi/search.pl?search_terms2=" + product.nom.toLowerCase()
    for (let i = 0; i < product.types.length; i++) {
        link += "&tagtype_" + i + "=categories&tag_contains_" + i + "=contains&tag_" + i + "=" + product.types[i]

    }
    var raw_data =  await axios.get(link + "&page=1&search_simple=1&action=process&json=1");

    //product.brands
    //product.nom
    //product.known_ingredients_n

    let request_name = product.nom.toLowerCase();
    let pluriel;
    let list_return = [];
    if(request_name.trim().indexOf( " " ) != -1) {
        pluriel = plural(request_name[0])
    } else {
        pluriel = plural(request_name)
    }

    raw_data.data.products.forEach( product => {
        if(product.product_name_fr !== undefined) {
            let product_name = product.product_name_fr.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ' ').trim().replace(product.brands,"").toLowerCase();
            if(product_name.indexOf(request_name) === 0) {
                var good_product =
                {
                    "nom": product_name
                }
                list_return.push(good_product);
            }
        }
    });
    return list_return.filter((v,i,a)=>a.findIndex(v2=>(occurrences(v2.nom, v.nom, countWords(request_name))) && v2.nom !== pluriel && v.nom !== pluriel)===i);
    
}

module.exports = { getProduct };
