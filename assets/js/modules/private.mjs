// private.mjs

const goPrivate = () => {
    let password;
    if (typeof process !== "undefined") {
        // We are running in Node.js; read it from `process.env`
        password = process.env.PASSWORD;
    } else if (typeof window !== "undefined") {
        // We are running in the browser; read it from the input box
        password = document.getElementById("userPassword").value;
        console.log(`Password is: ${password}`);
    }
}

export default goPrivate;