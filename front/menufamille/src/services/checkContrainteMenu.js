exports.verifContraintePlat = (items, nbPlat, periode) => {
    const count = {};

    items.forEach((jour) => {

        let periodeDefinie = jour.calendrier_recettes[periode]

        if ((periodeDefinie.recette !== null)) {
            if (count[periodeDefinie.recette.nom]) {
                count[periodeDefinie.recette.nom] += 1;
            } else {
                count[periodeDefinie.recette.nom] = 1;
            }
        }
    });

    for (const item in count) {
        if (count[item] > nbPlat) {
            if(periode === 0) return "Contrainte de plat identique non respectée pour le matin";
            else if(periode === 1) return "Contrainte de plat identique non respectée pour le midi";
            else return "Contrainte de plat identique non respectée pour le soir";
        }
    }
    return "";
}