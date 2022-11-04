import SwitchBot from "..";
import SwitchBotBot from "../devices/SwitchBotBot";
import SwitchBotPlug from "../devices/SwitchBotPlug";
const BASE_URL = "https://api.switch-bot.com";

const nock = require("nock");

const switchBot = new SwitchBot({
  openToken: "openToken",
  secretKey: "secretKey",
});
const deviceId = "deviceId";

describe("requests", () => {
  test("get status", async () => {
    nock(BASE_URL)
      .get(`/v1.1/devices/${deviceId}/status`)
      .reply(200, {
        statusCode: 100,
        body: {
          deviceId,
          deviceType: "Bot",
          power: "on",
          hubDeviceId: deviceId,
        },
        message: "success",
      });

    await switchBot.bot(deviceId).getStatus();
  });

  test("press", async () => {
    nock(BASE_URL)
      .post(`/v1.1/devices/${deviceId}/commands`, {
        command: "press",
        parameter: "default",
        commandType: "command",
      })
      .reply(200, {
        statusCode: 100,
        body: {},
        message: "success",
      });

    await switchBot.bot(deviceId).press();
  });
});

describe("instantiate devices", () => {
  test("bot", () => {
    expect(switchBot.bot(deviceId)).toBeInstanceOf(SwitchBotBot);
  });

  test("plug", () => {
    expect(switchBot.plug(deviceId)).toBeInstanceOf(SwitchBotPlug);
  });
});
