// scraping.mjs

const domains = [
    { title: "abuein", url: "https://abuein.com/" },
    { title: "gulbinovic", url: "https://gulbinovic.com/" }
];

async function curl(path) {
    if (typeof fetch === "undefined") {
        console.log("We are running in Node.js; use node-fetch");
        globalThis.fetch = (import("node-fetch")).default;
    } else if (window.fetch) {
        let result;
        try {
            const run = await fetch(path)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    result = data;
                    return result;
                })
                .catch(error => console.error(error));
            return run;
        } catch {
            console.log("Game over!");
        }

    } else { /* Maybe do something with XMLHttpRequest? */ }
}

const getLinkTitle = (target) => {
    // return target;
    const myHeaders = new Headers();
    myHeaders.append("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
    myHeaders.append("Access-Control-Allow-Credentials", "true");
    const myInit = {
        method: "GET",
        headers: myHeaders,
        mode: "no-cors",
        cache: "default"
    };

    fetch(new Request(target, myInit))
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not OK");
            }
            // return response.blob();
            return response.text();
        })
        .then((responseText) => {
            // let myImage = {};
            // myImage.src = URL.createObjectURL(myBlob);
            let parsedResponse = (new window.DOMParser()).parseFromString(responseText, "text/html");
            return parsedResponse.title;
        })
        .catch((error) => {
            let node = `There has been a problem with the fetch operation: ${error.message}`,
                p = document.createElement("p");
            p.appendChild(document.createTextNode(node));
            // document.body.insertBefore(p, target);
            console.log(node);
        });
}

export {
    curl,
    getLinkTitle
};