const checkTag = tag => tag ? `- ${tag} ` : ' '

const createTitle = (text, tag) => `${text} ${checkTag(tag)}| PW Simulator`

const generateMetatags = ({ title, tag, description, color = '#1b2126', url }) => [
	<title key="title">{createTitle(title, tag)}</title>,
	<link key="canonical" rel="canonical" href={`http://pwsimulator.com/${url}`} />,
	<meta key="og:title" property="og:title" content={createTitle(title, tag)} />,
	<meta key="og:url" property="og:url" content={`http://pwsimulator.com/${url}`} />,
	<meta key="og:description" property="og:description" content={description} />,
	<meta key="description" name="description" content={description} />,
	<meta key="theme-color" name="theme-color" content={color} />
]

export default generateMetatags
