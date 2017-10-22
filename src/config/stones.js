const stones = [
	{
		key: 'imortal',
		name: 'Pedra Imortal',
		image: 'http://www.pwdatabase.com/images/icons/generalm/11208.png',
		description: 'O carregador com o mais forte poder celestial da Terra Perfeita. A Pedra Imortal resume todo o valor do espírito das pedras por todos os seres celestiais e absorveu a essência do sol e da lua.',
		resetOnFailure: true,
		dontChange: false,
		chances: [0.5, 0.3, 0.3, 0.3, 0.3, .3, 0.3, 0.3, 0.25, 0.2, 0.12, 0.05]
	},
	{
		key: 'ceu',
		name: 'Pedra do Céu',
		image: 'http://www.pwdatabase.com/images/icons/generalm/15692.png',
		description: 'Pode ser usado como um componente para Refinar. Grande aumento na chance de sucesso.',
		resetOnFailure: true,
		dontChange: false,
		chances: [0.65, 0.45, 0.45, 0.45, 0.45, 0.45, 0.45, 0.45, 0.40, 0.35, 0.27, 0.20]
	},
	{
		key: 'maligna',
		name: 'Pedra Maligna',
		image: 'http://www.pwdatabase.com/images/icons/generalm/12751.png',
		description: 'Útil para refinar. Aumenta a chance de refinamento. O nível de refinamento cairá em 1 se o refinamento fracassar.',
		resetOnFailure: false,
		dontChange: false,
		chances: [0.535, 0.335, 0.335, 0.335, 0.335, 0.335, 0.335, 0.335, 0.285, 0.235, 0.155, 0.085]
	},
	{
		key: 'ceuTerra',
		name: 'Pedra do Céu e da Terra',
		image: 'http://www.pwdatabase.com/images/icons/generalm/12980.png',
		description: 'Usado para equipamento de refino e Transferências de Refino.',
		resetOnFailure: false,
		dontChange: true,
		chances: [1, 0.25, 0.1, 0.04, 1/60, 1/130, 1/215, 1/405, 1/750, 1/1370, 1/2525, 1/4645]
	}
]

export default stones
