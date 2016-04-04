import React from 'react';
import {mount} from 'react-mounter';

// Local imports
import {MainLayout} from '/client/layouts/MainLayout.jsx';
import Navbar from '/client/components/default/Navbar.jsx';
import Footer from '/client/components/default/Footer.jsx';
// import Home from '/client/containers/Home.jsx';
import Home from '/client/containers/homeData.jsx';

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