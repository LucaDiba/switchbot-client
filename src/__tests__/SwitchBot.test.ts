import SwitchBot from "..";
import SwitchBotBot from "../devices/SwitchBotBot";
import SwitchBotCurtain from "../devices/SwitchBotCurtain";
import SwitchBotLock from "../devices/SwitchBotLock";
import SwitchBotPlug from "../devices/SwitchBotPlug";
import SwitchBotPlugMini from "../devices/SwitchBotPlugMini";
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
  test("Bot", () => {
    expect(switchBot.bot(deviceId)).toBeInstanceOf(SwitchBotBot);
  });

  test("Plug", () => {
    expect(switchBot.plug(deviceId)).toBeInstanceOf(SwitchBotPlug);
  });

  test("Plug Mini", () => {
    expect(switchBot.plugMini(deviceId)).toBeInstanceOf(SwitchBotPlugMini);
  });

  test("Curtain", () => {
    expect(switchBot.curtain(deviceId)).toBeInstanceOf(SwitchBotCurtain);
  });

  test("Lock", () => {
    expect(switchBot.lock(deviceId)).toBeInstanceOf(SwitchBotLock);
  });
});
