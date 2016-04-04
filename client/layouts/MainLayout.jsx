import React from 'react';

// Creting router Layout
export const MainLayout = ({navbar, content, footer}) => (
	<div className="pwsimulator-app">
		{navbar}
		<main className="content">
			{content}
		</main>
		{footer}
	</div>
);