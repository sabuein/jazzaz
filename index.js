const puppeteer = require("puppeteer");

async function run(...links) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    let path = "./assets/images/screenshot/",
        prefix = "website",
        extension = "png",
        suffix = elyoum();

    const yallah = () => {
        links.forEach(link => {
            console.log("Yallah...");
            console.log("link type: " + typeof link);
            console.log("link[0].url: " + link[0].url);
            for (let prop in link) {
                console.log("prop: " + prop);
                console.log("link[prop]: " + link[prop]);
                console.log("link[prop].url: " + link[prop].url);
                page.goto(link[prop].url);
                console.log("Almost there...");
                page.screenshot({ path: `${path}${prefix}-${suffix}.${extension}` });
            }

        })
    };

    yallah();
    await browser.close();
}

const elyoum = () => {
    const d = new Date();
    console.log(d.toLocaleDateString('en-CA')); // YYYY-MM-DD
    console.log(d.toLocaleDateString('de-DE')); // D.M.YYYY
    return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

const extra = (links) => {
    links.forEach(element => {
        console.log(element.url);
    });
}

let data = [
    { name: "abuein", url: "https://abuein.com/" },
    { name: "gulbinovic", url: "https://gulbinovic.com/" }
];

(async () => {
    await run(data);
    extra(data);
})();