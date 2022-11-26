const puppeteer = require("puppeteer");

async function run(url) {
    const browser = await puppeteer.launch(),
        page = await browser.newPage();
    await page.goto(url);
    await page.screenshot({ path: "example.png"});
    await browser.close();
}