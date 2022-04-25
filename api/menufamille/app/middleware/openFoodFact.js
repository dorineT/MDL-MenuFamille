const axios = require('axios');
var plural = require('rosaenlg-pluralize-fr');

function countWords(str) {
    const arr = str.split(' ');
  
    return arr.filter(word => word !== '').length;
}


function occurrences(string, otherString, search) {
    if(string ===  otherString) return true;
    let count = 0;
    
    for (let i=0; i< countWords(string); i++) {
        for (let a=0; a< countWords(otherString); a++) {
            let word0 = string.split(' ')[i];
            let word1 = otherString.split(' ')[a];
            if( word0 !== search && word1 != search) {
                if( word0 === word1) count++;
            }
        }
    }
    if( count > countWords(search)) return true;
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
    var raw_data =  await axios.get(encodeURI(link + "&page_size=1000&search_simple=1&action=process&json=1"));

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
            let product_name = product.product_name_fr.replace(/[~!@#$%^&*()_|+\-=?;:",.<>\{\}\[\]\\\/]/gi, ' ').trim().replace(product.brands,"").toLowerCase();
            if(product_name.indexOf(request_name) === 0) {
                var good_product =
                {
                    "nom": product_name
                }
                list_return.push(good_product);
            }
        }
    });
    console.log(list_return)
    return list_return.filter((v,i,a)=>a.findIndex(v2=>(occurrences(v2.nom, v.nom, request_name)) && v2.nom !== pluriel && v.nom !== pluriel)===i);
    
}

module.exports = { getProduct };
