import SwitchBot from "../..";
export const BASE_URL = "https://api.switch-bot.com";

const nock = require("nock");

const switchBot = new SwitchBot({
  openToken: "openToken",
  secretKey: "secretKey",
});
const deviceId = "deviceId";
const hubDeviceId = "hubDeviceId";

describe("Bot", () => {
  describe("status", () => {
    beforeEach(() => {
      nock.cleanAll();
      nock(BASE_URL)
        .get(`/v1.1/devices/${deviceId}/status`)
        .reply(200, {
          statusCode: 100,
          body: {
            deviceId,
            deviceType: "Bot",
            power: "on",
            hubDeviceId,
          },
          message: "success",
        });
    });

    describe("getStatus", () => {
      test("getStatus", async () => {
        const botStatus = await switchBot.bot(deviceId).getStatus();
        expect(botStatus).toEqual({
          deviceId,
          deviceType: "Bot",
          hubDeviceId,
          power: "on",
        });
      });

      test("getStatus forceRefresh = true", async () => {
        nock.cleanAll();
        nock(BASE_URL)
          .get(`/v1.1/devices/${deviceId}/status`)
          .reply(200, {
            statusCode: 100,
            body: {
              deviceId,
              deviceType: "Bot",
              power: "on", // First request returns "on"
              hubDeviceId,
            },
            message: "success",
          })
          .get(`/v1.1/devices/${deviceId}/status`)
          .reply(200, {
            statusCode: 100,
            body: {
              deviceId,
              deviceType: "Bot",
              power: "off", // Second request returns "off"
              hubDeviceId,
            },
            message: "success",
          });

        const bot = switchBot.bot(deviceId);

        const firstStatus = await bot.getStatus();
        expect(firstStatus.power).toEqual("on");

        const secondStatus = await bot.getStatus({ forceRefresh: true });
        expect(secondStatus.power).toEqual("off");
      });

      test("getStatus forceRefresh = false", async () => {
        nock.cleanAll();
        nock(BASE_URL)
          .get(`/v1.1/devices/${deviceId}/status`)
          .reply(200, {
            statusCode: 100,
            body: {
              deviceId,
              deviceType: "Bot",
              power: "on", // First request returns "on"
              hubDeviceId,
            },
            message: "success",
          })
          .get(`/v1.1/devices/${deviceId}/status`)
          .reply(200, {
            statusCode: 100,
            body: {
              deviceId,
              deviceType: "Bot",
              power: "off", // Second request returns "off"
              hubDeviceId,
            },
            message: "success",
          });

        const bot = switchBot.bot(deviceId);

        const firstStatus = await bot.getStatus();
        expect(firstStatus.power).toEqual("on");

        const secondStatus = await bot.getStatus();
        expect(secondStatus.power).toEqual("on");
      });
    });

    test("getHubDeviceId", async () => {
      nock.cleanAll();
      nock(BASE_URL)
        .get(`/v1.1/devices/${deviceId}/status`)
        .reply(200, {
          statusCode: 100,
          body: {
            deviceId,
            deviceType: "Bot",
            power: "on",
            hubDeviceId,
          },
          message: "success",
        });

      const botHubDeviceId = await switchBot.bot(deviceId).getHubDeviceId();
      expect(botHubDeviceId).toEqual(hubDeviceId);
    });
  });

  describe("turnOn", () => {
    beforeEach(() => {
      nock(BASE_URL)
        .post(`/v1.1/devices/${deviceId}/commands`, {
          command: "turnOn",
          parameter: "default",
          commandType: "command",
        })
        .reply(200, {
          statusCode: 100,
          body: {},
          message: "success",
        });
    });

    test("turn on", async () => {
      await switchBot.bot(deviceId).turnOn();
    });
  });

  describe("turnOff", () => {
    beforeEach(() => {
      nock(BASE_URL)
        .post(`/v1.1/devices/${deviceId}/commands`, {
          command: "turnOff",
          parameter: "default",
          commandType: "command",
        })
        .reply(200, {
          statusCode: 100,
          body: {},
          message: "success",
        });
    });

    test("turn off", async () => {
      await switchBot.bot(deviceId).turnOff();
    });
  });

  describe("press", () => {
    beforeEach(() => {
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
    });

    test("press", async () => {
      await switchBot.bot(deviceId).press();
    });
  });
});
