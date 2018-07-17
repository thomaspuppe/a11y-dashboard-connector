const statsFilter = require('./filters/stats')
const webcoach = require('webcoach')

exports = module.exports = {}

exports.run = function run (siteName, siteType, url) {
	// TODO: options like mobile:true (https://github.com/sitespeedio/coach/blob/e3119801c2fca28803a8de484b75aa267f0f5f34/lib/cli.js)
	return webcoach.run(
		url
	)
	.then((results) => {
		const stats = statsFilter(results)
		console.log(stats)
	}).catch((error) => {
		console.error(error)
	})
}
