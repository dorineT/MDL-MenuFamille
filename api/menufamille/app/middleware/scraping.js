const axios = require('axios'); 
const cheerio = require('cheerio');
const config = require('../config/scraping.config.js')

const shop = [config.colruyt,config.carrefour];

const sample = array => array[Math.floor(Math.random() * array.length)];


const processColruyt = ($) => [
        ... new Set(
            $('.product-item[data-product-brand="BONI"]')
                .map((_, product) => {
                    return { 
                        image: $(product).find('img').attr('src'), 
                        titre: $(product).attr('data-product-name'), 
                        prix: $(product).attr('data-product-unitprice') +'€/'+ $(product).attr('data-product-measurement'),
                    };
                })
                .toArray()
        )
];

const processCarrefour = ($) => [
    ...new Set(
        $(".wrapper")
            .map((_, product) => {
                if($(product).find("a[data-item_brand='Carrefour']").attr('data-item_brand')) {
                    return { 
                        image: $(product).find('img').attr('src'), 
                        titre: $(product).find("a[data-item_name]").attr('data-item_name'),
                        prix: $(product).find('span.bigprice').text() +  $(product).find('span.type').text(),
                    };
                }
            })
            .toArray()          
    )
];


    
    




const getProduct = async (req, res) => {
    const result = [];
    
    for (let i=0 ; i< shop.length; i++) {
        var requete = "";
        if (shop[i].name == "colruyt") {
            requete = req.params.product.replace(/\s/g, '+')
        } else {
            requete = encodeURI(req.params.product)
        }
        
        await axios.get(shop[i].link + requete, { headers: sample(config.headers) }).then(({ data }) => { 
            const $ = cheerio.load(data); // Initialize cheerio

            let product;
            if(shop[i].name == "colruyt") {
                product = processColruyt($);
            }

            if(shop[i].name == "carrefour") {
                product = processCarrefour($);
            }

            

            

            result.push(product[0])
        });
    }
    res.send({ 
        colruyt: result[0], 
        carrefour: result[1]
    });
}

const scraping = {
    getProduct: getProduct
};

module.exports = scraping;