const chrome = require('chrome-aws-lambda')
const puppeteer = require('puppeteer-core')

const URL = 'http://mnwildadultleague.org/Schedule/mid/493643/dnnprintmode/false#division-493643-1296548#team-493643-T-1266895#session-493643-315545'

module.exports = async function (req, res) {
  try {
    const browser = await puppeteer.launch({
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
    })
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 960 })
    page.goto(URL, { waitUntil: 'networkidle2' })
    await page.waitForSelector('.DnnModule-SiPlayCmsSchedule')
    await page.click('.current-cal-view')
    await page.click('[data-calendar-view="year"]')
    const games = await page.evaluate(() => {
      const events = Array.from(document.querySelectorAll('.events-by-date'))
      return events.map(event => {
        return {
          date: event.querySelector('.event-date').textContent.trim(),
          time: event.querySelector('.event-time').textContent.trim(),
          rink: event.querySelector('.location-link').textContent.trim(),
          home: event.querySelector('.title a').textContent.trim(),
          away: event.querySelector('.sub-title a').textContent.trim()
        }
      })
    })
    await browser.close()
    res.writeHeader(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(games))
  } catch (e) {
    res.statusCode = 500
    res.end('Something went wrong.')
    console.error(e.message)
  }
}
