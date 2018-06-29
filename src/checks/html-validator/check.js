const statsFilter = require('./filters/stats')
const validator = require('html-validator')

exports = module.exports = {}

exports.run = function run (siteName, siteType, url) {

	return validator({
		url: url
	})
	.then((results) => {
		const stats = statsFilter(JSON.parse(results))
		console.log(stats)
		// TODO: saveRawData(results, siteName, siteType) 
		// "saveRawData" might be a globally available Utility/Service
		// TODO: sendStats(siteName, siteType, stats, topIssues, numberOfContrastErrors)
		// ... bzw das nur als Erfüllung der Promise zurückgeben, und die Zentrale soll sehen was sie damit macht.
		// das könnte auch fürs saveRawData gelten.
	})
	.catch((error) => {
		console.error(error)
	})
}