import { rpc, startTimestamp, clientId } from "./rpc";

async function setActivity() {
    rpc.setActivity({
        details: "Installing AvdanOS...",
        state: "Downloading AvdanOS..",
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
