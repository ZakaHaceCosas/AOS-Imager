const flashButton: HTMLElement | null = document.getElementById("flashbtn");
const toolButtons: NodeListOf<HTMLElement> = document.querySelectorAll(".pg3btn");

if (flashButton && toolButtons) {
    const actualToolButtons: HTMLElement = toolButtons as unknown as HTMLElement
    actualToolButtons.addEventListener("focus", () => {
        flashButton.style.display = "block";
    });

    actualToolButtons.addEventListener("blur", () => {
        flashButton.style.display = "none";
    });
}