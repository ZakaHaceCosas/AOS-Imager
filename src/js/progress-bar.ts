const progressBar = document.getElementById("bar");

// Just a function for the bar to be set to the passed width. ¯\_(ツ)_/¯
function setBar(percentage: number) {
    if (progressBar) {
        progressBar.style.width = percentage + "%";
    } else {
        throw new Error("No progressBar")
    }
}
