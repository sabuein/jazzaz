// corps.mjs

const elyoum = () => {
    const d = new Date();
    console.log(d.toLocaleDateString('en-CA')); // YYYY-MM-DD
    console.log(d.toLocaleDateString('de-DE')); // D.M.YYYY
    return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

export { elyoum };