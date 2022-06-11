const fs = require('fs')

const base = require('./base.json')
const themes = [
	{
		name: 'Lunar Pink',
		type: 'dark',
		palette: require('./Lunar.palette'),
	},
	{
		name: 'Lunar Pink Satellite',
		type: 'dark',
		palette: require('./Satellite.palette'),
	},
]

const build = (obj, palette) => {
	for (let k in obj) {
		if (typeof obj[k] === 'object') {
			if (obj[k].length === undefined) build(obj[k], palette)
			else obj[k].forEach((i) => build(i, palette))
		} else if (typeof obj[k] === 'string' && obj[k].startsWith('LUNAR_')) {
			const s = obj[k].substring('LUNAR_'.length).split('%')
			const color = palette[s[0]]
			const alpha = s[1] ? s[1] : ''
			obj[k] = `${color}${alpha}`
		}
	}
}

themes.forEach((theme) => {
	const out = JSON.parse(JSON.stringify(base))
	build(out, theme.palette)

	out.name = theme.name
	out.type = theme.type

	fs.writeFileSync(
		`../themes/${theme.name.split(' ').join('')}.json`,
		JSON.stringify(out, null, 2)
	)
})
