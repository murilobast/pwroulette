import React, {Component} from 'react';
import {HTTP} from 'meteor/http';

export default class ChestAddModal extends Component {
	constructor() {
		super();
		
		this.insertChest = this.insertChest.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.crossGet = this.crossGet.bind(this);
	}

	insertChest(e) {
		e.preventDefault();
		let url = this.refs.url.value;

		this.crossGet(url);
	}

	closeModal(e) {
		this.props.updateState(false);
	}

	render() {
		return (
			<div className="modal">
				<button className="modal-mask show" onClick={this.closeModal}></button>
				<form className="modal-window show" onSubmit={this.insertChest}>
					<div className="modal-window__top"></div>
					<div className="modal-window__container">
						<div className="modal-window__container__header">
							<h3>Adicionar Baú</h3>
						</div>
						<div className="modal-window__container__content">
							<div className="modal-window__container__content__url">
								<label>Url do pwdatabase</label>
								<input type="text" name="url" ref="url"/>
								<p>Enviar url da página de drops do báu.</p>
								<p>Ex: http://www.pwdatabase.com/br/quest/27109</p>
							</div>
						</div>

						<div className="modal-window__container__footer">
							<button 
								className="modal-window__container__footer__cancel cancel button"
								type="button"
								onClick={this.closeModal}
							>
								Cancelar
							</button>
							<button
								className="modal-window__container__footer__submit button" id="addChest_submit"
								type="submit"
							>
								Add
							</button>
						</div>
					</div>
					<div className="modal-window__bottom"></div>
				</form>
			</div>
		)
	}

	crossGet(url) {
		let urlReg = /(?:pwdatabase\.com\/br\/quest\/)([0-9]*)$/;

		if (urlReg.test(url)) {
			let chest = {
				active: false,
				items: []
			};

			Meteor.call('returnData', url, (err, result) => {
				if (!err) {
					let htmlString = result.content;
					let parser = new DOMParser();
					let doc = parser.parseFromString(htmlString, 'text/html');
					let content = doc.querySelectorAll('#content > table:first-of-type tbody tr:last-of-type td:first-of-type p');
					let last = doc.querySelector('#content > table:first-of-type tbody tr:last-of-type td:last-of-type p');
					let href = last.querySelector('a').href;
					let totalWeight = 0;
					let reg  = /(?:\s-\s([0-9]+)\s)?\(([0-9]+\.?[0-9]*)%\)/;
					let replace  = /(\([0-9]+\.?[0-9]*%\))/g;
					let hrefReg = /(:?\/)([0-9]+)/;
					let start = (reg.test(content[6].textContent)) ? 6 : 7;
					
					// Caching loop variables
					let i = 0;
					let obj = {};
					let item = {};
					let name = '';
					let itemHref = '';
					let id = 0;
					let weight = 0;
					let amount = 0;
					let percent = 0;

					chest.name = last.textContent;
					chest.id = parseInt(href.match(hrefReg)[2]);
					
					for (i = start; i < content.length; i++) {
						item = content[i];
						name = item.textContent;
						console.log(item.querySelector('a'))
						return
						itemHref = item.querySelector('a').href;
						id = parseInt(itemHref.match(hrefReg)[2]); 
						weight = Number(name.match(reg)[2])
						amount = name.match(reg)[1] || 1;

						name = name.replace(reg, '');
						name = name.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
						totalWeight += weight;
						
						percent += weight
						console.log(percent)

						obj = {
							id,
							name,
							weight,
							amount
						}

						chest.items.push(obj);
					}

					Meteor.call('createChest', chest);
					this.props.updateState(false);
				}
			});

		} else {
			alert('ERRO: URL invalida.')
			this.props.updateState(false);
		}
	}
}