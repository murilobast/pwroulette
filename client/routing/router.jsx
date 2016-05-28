import React from 'react';
import {mount} from 'react-mounter';

// Local imports
import {MainLayout} from '/client/layouts/MainLayout.jsx';
import Navbar from '/client/components/default/Navbar.jsx';
import Footer from '/client/components/default/Footer.jsx';

// Containers
import Home from '/client/containers/HomeComposer.jsx';
import ChestsWrapper from '/client/containers/ChestsComposer.jsx';
import ForgeWrapper from '/client/containers/ForgeComposer.jsx';
import FullChest from '/client/containers/FullChestComposer.jsx';
import Login from '/client/components/Login.jsx';
import Dice from '/client/components/Dice.jsx';

// Defining routes
FlowRouter.route('/', {
	name: 'home',

	action() {
		mount(MainLayout, {
			navbar: <Navbar />,
			content: <Home />,
			footer: <Footer />
		});
	}
});

FlowRouter.route('/forge', {
	name: 'forge',

	action() {
		mount(MainLayout, {
			navbar: <Navbar />,
			content: <ForgeWrapper />,
			footer: <Footer />
		});
	}
});

FlowRouter.route('/chest', {
	name: 'chest',

	action() {
		mount(MainLayout, {
			navbar: <Navbar />,
			content: <ChestsWrapper />,
			footer: <Footer />
		});
	}
});

FlowRouter.route('/chest/:id', {
	name: 'chest',
	triggersEnter: [updateCount],

	action(param) {
		mount(MainLayout, {
			navbar: <Navbar />,
			content: <FullChest chestId={param.id} />,
			footer: <Footer />
		});
	}
});

FlowRouter.route('/user', {
	name: 'login',

	action() {
		mount(MainLayout, {
			navbar: <Navbar />,
			content: <Login />,
			footer: <Footer />
		});
	}
});

FlowRouter.route('/diceroll', {
	name: 'dices',
	
	subscriptions(params) {
		this.register('dices', Meteor.subscribe('dices'));
	},

	action() {
		mount(MainLayout, {
			navbar: <Navbar />,
			content: <Dice />,
			footer: <Footer />
		});
	}
});

function updateCount(context) {
	Meteor.call('updateCount', ~~context.params.id);
}