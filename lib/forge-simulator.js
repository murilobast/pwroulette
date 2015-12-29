Forge = {
	roulette: function (weigth, name) {
		var random = Math.random();
		for (var i = 0; i < weigth.length; i++) {
			if (random < weigth[i]) {
				var attr = name[i];
				break;
			}
		}

		return attr;
	},

	fillAdds: function () {
		var self = this;
		var attrs = [];
		var modif = [];
		for (var i = 0; i < 4; i++) {
			modif[i] = 18 + Math.floor(Math.random() * 2);
		}

		var mainWeigth = [.465, .490, .955, .975, 1];

		var mainName = [
			'Crítico +3%',
			'Crítico +4%',
			'<strong>Insanidade:</strong> Tem a chance de causar dano duplo ao custo de 5% de HP máximo.',
			'<strong>Deus do Frenesi:</strong> Faz com o que portador sinta uma fúria divina!<br>Tem uma chance maior de causar dano duplo. Custa 5% de HP Máx',
			'Nível de Ataque +20'
		];

		var extraWeigth = [
			.05,
			.1, 
			.15,
			.24,
			.34,
			.44,
			.54,
			.64,
			.74,
			.835,
			.840,
			.88,
			.97,
			.98,
			.99,
			1
		];

		var extraName = [
			'Ataque Máx +106',
			'Ataque Máx +130',
			'Intervalo de Ataque -0.05 segundos',
			'Alcance +1',
			'HP +350 ',
			'Força +' + modif[0],
			'Destreza +' + modif[1],
			'Inteligência +' + modif[2],
			'Constituição +' + modif[3], 
			'Crítico +1%',
			'Crítico +2%',
			'Acerto +30%',
			'Nível de Ataque +1',
			'Nível de Ataque +2',
			'Nível de Ataque +3',
			'Nível de Defesa +2'
		];
		
		attrs[0] = self.roulette(mainWeigth, mainName);

		for (var i = 1; i < 3; i++) {
			attrs[i] = self.roulette(extraWeigth, extraName);
		}

		return attrs;
	}
}