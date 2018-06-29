const main = require('./src/main')
const async = require('async')

const URLS = {
  'berliner-philharmoniker': {
    'homepage': 'https://www.berliner-philharmoniker.de/',
    'centerpage': 'https://www.berliner-philharmoniker.de/konzerte/kalender/',
    'detailpage': 'https://www.berliner-philharmoniker.de/konzerte/kalender/details/51178/'
  },

  'digitalconcerthall': {
    'homepage': 'https://www.digitalconcerthall.com/',
    'centerpage': 'https://www.digitalconcerthall.com/en/concerts',
    'detailpage': 'https://www.digitalconcerthall.com/en/concert/51130'
  },
  'berliner-philharmoniker-recordings': {
    'homepage': 'https://www.berliner-philharmoniker-recordings.com/',
    'centerpage': 'https://www.berliner-philharmoniker-recordings.com/audio.html',
    'detailpage': 'https://www.berliner-philharmoniker-recordings.com/john-adams-edition.html'
  }
}

const queue = async.queue((task, cb) => {
  console.log(`Start ${task.url}`)
  main.run(task.site, task.type, task.url).then(() => {
    cb(task.url)
  })
}, 3)

queue.drain = () => {
  console.log('All tests finished.')
}

console.log('Starting Pa11y tests')

const doneCallback = (url) => {
  console.log(`Tested ${url}`)
}

for (let site in URLS) {
  for (let type in URLS[site]) {
    queue.push({site, type, url: URLS[site][type]}, doneCallback)
  }
}
