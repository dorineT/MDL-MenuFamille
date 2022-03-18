exports.verifContraintePlat = (items, nbPlat, periode) => {
    const count = {};

    items.forEach((element) => {
        if ((element[periode] !== "/") & (element[periode] != "")) {
            if (count[element[periode]]) {
                count[element[periode]] += 1;
            } else {
                count[element[periode]] = 1;
            }
        }
    });

    console.log(count)

    for (const item in count) {
        if (count[item] > nbPlat) {
            if(periode === 'matin') return "Contrainte de plat identique non respectée pour le matin";
            else if(periode === 'midi') return "Contrainte de plat identique non respectée pour le midi";
            else return "Contrainte de plat identique non respectée pour le soir";
        }
    }
    return "";
}