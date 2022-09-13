const puppeteer = require("puppeteer");
(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    })
    const page = await browser.newPage()
    await page.setViewport({
        width: 392,
        height: 747
    })
    await page.goto('https://h5.cyol.com/special/daxuexi/ck6hfr2g0y/m.html?t=1&z=201', {
        waitUntil: 'load'
    })

    // 选择团员地区
    await page.select('select#province', '18')
    await page.select('select#city', '5')
    await page.click('div.sure')
    await page.click('div.start_btn')

    const title = await page.evaluate(() => {
        return document.querySelector('title').innerText
    })
    console.log('标题', title)

    await new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, 3000)
    })

    await page.evaluate(() => {
        document.querySelector('video').currentTime = 10000
    })

    await new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, 1000)
    })

    await new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, 2000)
    })

    await page.screenshot({path: 'screenshot.png'})
    await browser.close()
})()
