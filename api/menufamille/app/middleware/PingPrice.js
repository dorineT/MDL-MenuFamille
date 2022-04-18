var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


/**
https://api.pingprice.be/products?
    ean=&brand=&text=&promo=&regions=&shops=&lg=&key=

 */

async function  get_comparse_for_product (text,region,brand = ""){

    const lg = "fr"
    const kheys = '625420a27e00cc0197e4d1e1'

    var xhr =  new  XMLHttpRequest();

    if (brand !== "") {
        var url = [`https://api.pingprice.be/products?brand=${brand}&text=${text}&lg=${lg}&key=${kheys}&regions=${region}`]

    }
    console.log(url[0])
    xhr.onreadystatechange = alertContents;
    await xhr.open("GET",url[0],false)//false obligatoire sinon la fonction est non bloquante
    xhr.responseType = 'json'



    async function alertContents() {

        console.log(xhr.readyState)
        console.log(xhr.status)
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var test = await xhr.responseText;
                console.log (test)
            } else if(xhr.status === 403){
                console.log('Forbiden');
            }else if(xhr.status === 404){
                console.log('Not Found');
            }
            else {
                console.log('Il y a eu un problème avec la requête.');
            }
        }else
        {
            console.log("fail")
        }
    }
    xhr.send()



}

get_comparse_for_product("pâte",5,"Boni")