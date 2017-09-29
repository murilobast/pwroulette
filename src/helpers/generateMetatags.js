const generateMetatags = ({ title, tag, description, color = '#1b2126', url }) => [
	<title key="title">{`${title} | PW Simulator`}</title>,
	<link key="canonical" rel="canonical" href={`http://pwsimulator.com/${url}`} />,
	<meta key="og:title" property="og:title" content={`${title} | PW Simulator`} />,
	<meta key="og:url" property="og:url" content={`http://pwsimulator.com/${url}`} />,
	<meta key="og:type" property="og:type" content="website" />,
	<meta key="og:description" property="og:description" content={description} />,
	<meta key="description" name="description" content={description} />,
	<meta key="theme-color" name="theme-color" content={color} />
]

export default generateMetatags
