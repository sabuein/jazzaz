// processors.mjs

const targets = [
    "https://httpbin.org/post",
    "https://reqres.in/api/users",
    "http://httpstat.us/200"
];

const form = new FormData();
const reader = new FileReader();

const processImage = (img, output) => {
    reader.readAsDataURL(img);
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
            canvas.toBlob((object) => sendBlob(object));
        }
    }
}

const sendBlob = (blob) => {
    form.append("img", blob, "image.jpg");

    const myInit = {
        method: "post",
        body: form
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
}

export {
    processImage
};