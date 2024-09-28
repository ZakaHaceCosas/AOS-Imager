// The default electron preload config, which I am most likely not gonna touch
window.addEventListener("DOMContentLoaded", () => {
    const replaceText = (selector: string, text: string | undefined) => {
        const element = document.getElementById(selector);
        if (element && text) element.innerText = text;
    };

    for (const type of ["chrome", "node", "electron"]) {
        replaceText(`${type}-version`, process.versions[type]);
    }
});
