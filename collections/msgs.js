Msgs = new Mongo.Collection('msgs');

Msgs.attachSchema(new SimpleSchema({
	name: {
		type: String,
		label: "Nome"
	},
	msg: {
		type: String,
		label: "Mensagem"
	}
}));