// io.mjs

import { processImage } from "processors";

const readAndDisplay = (input, output, type = "text") => {
    input.addEventListener("change", function () {
        
        // Clearing the preview
        while (output.firstChild) {
            output.removeChild(output.firstChild);
        }

        if (type === "image") {
            processImage(this.files[0], output);
            
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
                        tdIndex = document.createElement("td");
                    tdIndex.innerText = ++index;
                    tdElement.innerHTML = `<a href="${element}" title="${element}" target="_blank">${element}</a>`;
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