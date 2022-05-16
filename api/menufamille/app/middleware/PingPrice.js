const axios = require('axios');

/**
https://api.pingprice.be/products?
    ean=&brand=&text=&promo=&regions=&shops=&lg=&key=

 */

async function  get_comparse_for_product (id,region,brand ="",shops =""){

    const lg = "fr"
    const kheys = '625420a27e00cc0197e4d1e1'


    if (brand !== "" && shops !== ""){
        var url = `https://api.pingprice.be/products?brand=${brand}&ean=${id}&lg=${lg}&key=${kheys}&regions=${region}&shops=${shops}`}
    else {
        var url = `https://api.pingprice.be/products?ean=${id}&lg=${lg}&key=${kheys}&regions=${region}`}


    var raw_data =  await axios.get(url);
    return raw_data
}

module.exports = {  get_comparse_for_product};