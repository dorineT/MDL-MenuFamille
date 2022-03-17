exports.verifContraintePlatMatin = () => {
    const count = {};

    this.items.forEach((element) => {
        if ((element.matin !== "/") & (element.matin != "")) {
            if (count[element.matin]) {
                count[element.matin] += 1;
            } else {
                count[element.matin] = 1;
            }
        }
    });

    for (const item in count) {
        if (count[item] > this.formData.nbPlatMatin) {
            return "Contrainte de plat identique non respectée pour le matin";
        }
    }
    return "";
}

exports.verifContraintePlatMidi = () => {
    const count = {};

    this.items.forEach((element) => {
        if ((element.midi !== "/") & (element.midi != "")) {
            if (count[element.midi]) {
                count[element.midi] += 1;
            } else {
                count[element.midi] = 1;
            }
        }
    });

    for (const item in count) {					
        if (count[item] > this.formData.nbPlatMidi) {
            return "Contrainte de plat identique non respectée pour le midi";
        }
    }
    return "";
}

exports.verifContraintePlatSoir = () => {
    const count = {};

    this.items.forEach((element) => {
        if ((element.soir !== "/") & (element.soir != "")) {
            if (count[element.soir]) {
                count[element.soir] += 1;
            } else {
                count[element.soir] = 1;
            }
        }
    });

    for (const item in count) {				
        if (count[item] > this.formData.nbPlatSoir) {
            return "Contrainte de plat identique non respectée pour le soir";
        }
    }
    return "";
}