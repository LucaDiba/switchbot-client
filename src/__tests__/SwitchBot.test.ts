import { createHmac } from "crypto";
import nock from "nock";
import SwitchBot from "..";
import SwitchBotBot from "../devices/SwitchBotBot";
import SwitchBotCamera from "../devices/SwitchBotCamera";
import SwitchBotContactSensor from "../devices/SwitchBotContactSensor";
import SwitchBotCurtain from "../devices/SwitchBotCurtain";
import SwitchBotHub from "../devices/SwitchBotHub";
import SwitchBotHumidifier from "../devices/SwitchBotHumidifier";
import SwitchBotKeypad from "../devices/SwitchBotKeypad";
import SwitchBotLock from "../devices/SwitchBotLock";
import SwitchBotMeter from "../devices/SwitchBotMeter";
import SwitchBotMotionSensor from "../devices/SwitchBotMotionSensor";
import SwitchBotPlug from "../devices/SwitchBotPlug";
import SwitchBotPlugMini from "../devices/SwitchBotPlugMini";
import SwitchBotRobotVacuumCleaner from "../devices/SwitchBotRobotVacuumCleaner";
import { getMockedCommandResponse } from "../utils/tests";

const BASE_URL = "https://api.switch-bot.com";
const OPEN_TOKEN = "openToken";
const SECRET_KEY = "secretKey";

const switchBot = new SwitchBot({
  openToken: OPEN_TOKEN,
  secretKey: SECRET_KEY,
});
const deviceId = "deviceId";

describe("requests", () => {
  test("get", async () => {
    const mockStatusResponse = {
      statusCode: 100,
      body: {
        deviceList: [
          {
            deviceId: "deviceId",
            deviceName: "deviceName",
            deviceType: "Bot",
            hubDeviceId: "hubDeviceId",
            enableCloudService: true,
          },
        ],
        infraredRemoteList: [],
      },
      message: "success",
    };

    nock(BASE_URL).get(`/v1.1/devices`).reply(200, mockStatusResponse);

    const response = await switchBot.devices();

    expect(response).toEqual(mockStatusResponse.body);
  });

  test("post", async () => {
    const mockCommandResponse = getMockedCommandResponse({ deviceId });

    nock(BASE_URL)
      .post(`/v1.1/devices/${deviceId}/commands`, {
        command: "press",
        parameter: "default",
        commandType: "command",
      })
      .reply(200, mockCommandResponse);

    const response = await switchBot.bot(deviceId).press();

    expect(response).toEqual(mockCommandResponse.body.items[0].status);
  });

  describe("headers", () => {
    const getExpectedSign = (t: string, nonce: string) => {
      const data = OPEN_TOKEN + t + nonce;
      return createHmac("sha256", SECRET_KEY)
        .update(Buffer.from(data, "utf-8"))
        .digest()
        .toString("base64");
    };

    test("get", async () => {
      nock(BASE_URL)
        .get(`/v1.1/devices/${deviceId}/status`)
        .reply(function (uri, body, callback) {
          const { sign, nonce, t } = this.req.headers;

          if (sign !== getExpectedSign(t, nonce)) {
            return callback(new Error("Invalid signature"), [
              400,
              "Invalid signature",
            ]);
          }

          callback(null, [200, getMockedCommandResponse({ deviceId })]);
        });

      try {
        const response = await switchBot.bot(deviceId).getStatus();
        expect(response).toMatchInlineSnapshot(`
          {
            "items": [
              {
                "code": 100,
                "deviceId": "deviceId",
                "message": "success",
                "status": {},
              },
            ],
          }
        `);
      } catch (e) {
        throw new Error(e as any);
      }
    });

    test("post", async () => {
      nock(BASE_URL)
        .post(`/v1.1/devices/${deviceId}/commands`)
        .reply(function (uri, body, callback) {
          const { sign, nonce, t } = this.req.headers;

          if (sign !== getExpectedSign(t, nonce)) {
            return callback(new Error("Invalid signature"), [
              400,
              "Invalid signature",
            ]);
          }

          if (this.req.headers["content-type"] !== "application/json") {
            return callback(new Error("Invalid content type"), [
              400,
              "Invalid content type",
            ]);
          }

          callback(null, [200, getMockedCommandResponse({ deviceId })]);
        });

      try {
        const response = await switchBot.bot(deviceId).press();
        expect(response).toMatchInlineSnapshot(`{}`);
      } catch (e) {
        throw new Error(e as any);
      }
    });
  });
});

describe("instantiate devices", () => {
  test("Bot", () => {
    expect(switchBot.bot(deviceId)).toBeInstanceOf(SwitchBotBot);
  });

  test("Camera", () => {
    expect(switchBot.camera(deviceId)).toBeInstanceOf(SwitchBotCamera);
  });

  test("ContactSensor", () => {
    expect(switchBot.contactSensor(deviceId)).toBeInstanceOf(
      SwitchBotContactSensor
    );
  });

  test("Curtain", () => {
    expect(switchBot.curtain(deviceId)).toBeInstanceOf(SwitchBotCurtain);
  });

  test("Hub", () => {
    expect(switchBot.hub(deviceId)).toBeInstanceOf(SwitchBotHub);
  });

  test("Humidifier", () => {
    expect(switchBot.humidifier(deviceId)).toBeInstanceOf(SwitchBotHumidifier);
  });

  test("Keypad", () => {
    expect(switchBot.keypad(deviceId)).toBeInstanceOf(SwitchBotKeypad);
  });

  test("Lock", () => {
    expect(switchBot.lock(deviceId)).toBeInstanceOf(SwitchBotLock);
  });

  test("Meter", () => {
    expect(switchBot.meter(deviceId)).toBeInstanceOf(SwitchBotMeter);
  });

  test("MotionSensor", () => {
    expect(switchBot.motionSensor(deviceId)).toBeInstanceOf(
      SwitchBotMotionSensor
    );
  });

  test("Plug", () => {
    expect(switchBot.plug(deviceId)).toBeInstanceOf(SwitchBotPlug);
  });

  test("Plug Mini", () => {
    expect(switchBot.plugMini(deviceId)).toBeInstanceOf(SwitchBotPlugMini);
  });

  test("Robot Vacuum Cleaner", () => {
    expect(switchBot.robotVacuumCleaner(deviceId)).toBeInstanceOf(
      SwitchBotRobotVacuumCleaner
    );
  });
});
