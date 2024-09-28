const DiscordRPC = require("discord-rpc");

export const clientId = "1012098922652631062";
export const rpc = new DiscordRPC.Client({ transport: "ipc" });
export const startTimestamp = new Date();