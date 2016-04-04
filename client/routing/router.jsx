import React from 'react';
import {mount} from 'react-mounter';

// Local imports
import {MainLayout} from '/client/layouts/MainLayout.jsx';
import Navbar from '/client/components/default/Navbar.jsx';
import Footer from '/client/components/default/Footer.jsx';
// Containers
import Home from '/client/containers/homeData.jsx';
import Chests from '/client/containers/chestsData.jsx';

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

FlowRouter.route('/chest', {
	name: 'chest',

	action() {
		mount(MainLayout, {
			navbar: <Navbar />,
			content: <Chests />,
			footer: <Footer />
		});
	}
});