function shuffleWeigth(names, weight) {
    for (var i = names.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp1 = names[i];
        var temp2 = weight[i];
        names[i] = names[j];
        weight[i] = weight[j];
        names[j] = temp1;
        weight[j] = temp2;
    }
    return names, weight;
}