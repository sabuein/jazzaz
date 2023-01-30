// io.mjs

import { getLinkTitle } from "scraping";

const readAndDisplay = (input, output, type = "text") => {
    input.addEventListener("change", function () {
        let child = output.lastElementChild,
            reader = new FileReader();
        while (child) {
            output.removeChild(child);
            child = output.lastElementChild;
        }

        if (type === "image") {
            reader.readAsDataURL(this.files[0]);
            reader.onload = function () {
                const img = new Image();
                img.src = this.result;
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    const context = canvas.getContext("2d");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    // Applying some filters before drawing the image
                    context.filter = "grayscale(.85)";
                    context.filter = "saturate(1.5)";
                    context.filter = "blur(1px)";
                    context.drawImage(img, 0, 0);
                    // Setting font and adding text to the image
                    context.font = "36px serif";
                    context.fillText("Yallah!", 25, 50);
                    output.appendChild(canvas);
                    // Saving the image
                    canvas.toBlob((file) => {
                        let targets = [
                            "https://httpbin.org/post",
                            "https://reqres.in/api/users",
                            "http://httpstat.us/200"
                        ];
                        const daForm = new FormData();
                        daForm.append("img", file, "image.jpg");

                        const myInit = {
                            method: "post",
                            body: daForm
                        };

                        fetch(targets[0], myInit)
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error("Network response was not OK");
                                } else {
                                    console.log(response);
                                    return response.json();
                                }
                            })
                            .then(payload => console.log(payload))
                            .catch(error => console.error(error));
                    });
                }
            }
        } else if (type === "text") {
            reader.readAsText(this.files[0]);
            reader.onload = function (progressEvent) {
                // output.textContent = this.result;
                // Some manipulation
                const content = this.result;
                const txt = content.split("\n");
                const csv = content.split("\n").map((line) => {
                    return line.split(",");
                });
                console.log(txt);

                // Creating a table
                let index = 0,
                    table = document.createElement("table");
                csv.forEach(element => {
                    let tr = document.createElement("tr"),
                        tdElement = document.createElement("td"),
                        tdIndex = document.createElement("td"),
                        aTitle = getLinkTitle(element);
                    tdIndex.innerText = ++index;
                    tdElement.innerHTML = `<a href="${element}" title="${aTitle}" target="_blank">${aTitle}</a>`;
                    tr.appendChild(tdIndex);
                    tr.appendChild(tdElement);
                    table.appendChild(tr);
                });
                output.appendChild(table);
            };
        }
    });
}

export {
    readAndDisplay
};
 /*
export default randomSquare;
export default function (ctx) {
// …
}
*/