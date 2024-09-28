import { rpc, startTimestamp, clientId } from "./rpc";

async function setActivity() {
    rpc.setActivity({
        details: "AvdanOS Imager",
        state: "Your PC, but even better!",
        startTimestamp,
        largeImageKey: "defaultProfilePicture",
        largeImageText: "Installing AvdanOS",
        instance: false,
    });
}

rpc.on("ready", () => {
    setActivity();
    setInterval(() => {
        setActivity();
    }, 15000);
});

rpc.login({ clientId }).catch(console.error);
