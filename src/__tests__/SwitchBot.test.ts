import { createHmac } from "crypto";
import nock from "nock";

import SwitchBot from "..";
import SwitchBotBlindTilt from "../devices/SwitchBotBlindTilt";
import SwitchBotBot from "../devices/SwitchBotBot";
import SwitchBotCamera from "../devices/SwitchBotCamera";
import SwitchBotCeilingLight from "../devices/SwitchBotCeilingLight";
import SwitchBotColorBulb from "../devices/SwitchBotColorBulb";
import SwitchBotContactSensor from "../devices/SwitchBotContactSensor";
import SwitchBotCurtain from "../devices/SwitchBotCurtain";
import SwitchBotCurtain3 from "../devices/SwitchBotCurtain3";
import SwitchBotHub from "../devices/SwitchBotHub";
import SwitchBotHub2 from "../devices/SwitchBotHub2";
import SwitchBotHumidifier from "../devices/SwitchBotHumidifier";
import SwitchBotKeypad from "../devices/SwitchBotKeypad";
import SwitchBotLock from "../devices/SwitchBotLock";
import SwitchBotMeter from "../devices/SwitchBotMeter";
import SwitchBotMotionSensor from "../devices/SwitchBotMotionSensor";
import SwitchBotPlug from "../devices/SwitchBotPlug";
import SwitchBotPlugMini from "../devices/SwitchBotPlugMini";
import SwitchBotRemote from "../devices/SwitchBotRemote";
import SwitchBotRobotVacuumCleaner from "../devices/SwitchBotRobotVacuumCleaner";
import SwitchBotStripLight from "../devices/SwitchBotStripLight";
import Scene from "../scenes/Scene";
import {
  getMockedCommandResponse,
  getMockedSceneExecuteResponse,
  getMockedScenesListResponse,
} from "../utils/tests";

const BASE_URL = "https://api.switch-bot.com";
const OPEN_TOKEN = "openToken";
const SECRET_KEY = "secretKey";

const switchBot = new SwitchBot({
  openToken: OPEN_TOKEN,
  secretKey: SECRET_KEY,
});
const deviceId = "deviceId";
const sceneId = "sceneId";
const sceneName = "sceneName";

function getExpectedSign(t: string, nonce: string) {
  const data = OPEN_TOKEN + t + nonce;
  return createHmac("sha256", SECRET_KEY)
    .update(Buffer.from(data, "utf-8"))
    .digest()
    .toString("base64");
}

describe("devices requests", () => {
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

    expect(response).toEqual(mockCommandResponse.body.items[0]!.status);
  });

  describe("headers", () => {
    test("get", async () => {
      nock(BASE_URL)
        .get(`/v1.1/devices/${deviceId}/status`)
        .reply(function (uri, body, callback) {
          const { sign, nonce, t } = this.req.headers;

          if (sign !== getExpectedSign(t!, nonce!)) {
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

          if (sign !== getExpectedSign(t!, nonce!)) {
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
  test("Blind Tilt", () => {
    expect(switchBot.blindTilt(deviceId)).toBeInstanceOf(SwitchBotBlindTilt);
  });

  test("Bot", () => {
    expect(switchBot.bot(deviceId)).toBeInstanceOf(SwitchBotBot);
  });

  test("Camera", () => {
    expect(switchBot.camera(deviceId)).toBeInstanceOf(SwitchBotCamera);
  });

  test("Ceiling Light", () => {
    expect(switchBot.ceilingLight(deviceId)).toBeInstanceOf(
      SwitchBotCeilingLight
    );
  });

  test("Color Bulb", () => {
    expect(switchBot.colorBulb(deviceId)).toBeInstanceOf(SwitchBotColorBulb);
  });

  test("Contact Sensor", () => {
    expect(switchBot.contactSensor(deviceId)).toBeInstanceOf(
      SwitchBotContactSensor
    );
  });

  test("Curtain", () => {
    expect(switchBot.curtain(deviceId)).toBeInstanceOf(SwitchBotCurtain);
  });

  test("Curtain 3", () => {
    expect(switchBot.curtain3(deviceId)).toBeInstanceOf(SwitchBotCurtain3);
  });

  test("Hub", () => {
    expect(switchBot.hub(deviceId)).toBeInstanceOf(SwitchBotHub);
  });

  test("Hub 2", () => {
    expect(switchBot.hub2(deviceId)).toBeInstanceOf(SwitchBotHub2);
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

  test("Motion Sensor", () => {
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

  test("Remote", () => {
    expect(switchBot.remote(deviceId)).toBeInstanceOf(SwitchBotRemote);
  });

  test("Robot Vacuum Cleaner", () => {
    expect(switchBot.robotVacuumCleaner(deviceId)).toBeInstanceOf(
      SwitchBotRobotVacuumCleaner
    );
  });

  test("Strip Light", () => {
    expect(switchBot.stripLight(deviceId)).toBeInstanceOf(SwitchBotStripLight);
  });
});

describe("scenes requests", () => {
  test("get", async () => {
    const mockStatusResponse = {
      statusCode: 100,
      body: [
        { sceneId: "scene1", sceneName: "Scene 1" },
        { sceneId: "scene2", sceneName: "Scene 2" },
        { sceneId: "scene3", sceneName: "Scene 3" },
      ],
      message: "success",
    };

    nock(BASE_URL).get(`/v1.1/scenes`).reply(200, mockStatusResponse);

    const response = await switchBot.scenes();

    expect(response).toEqual(mockStatusResponse.body);
  });

  test("post", async () => {
    const mockStatusResponse = {
      statusCode: 100,
      body: {},
      message: "success",
    };

    nock(BASE_URL)
      .post(`/v1.1/scenes/${sceneId}/execute`)
      .reply(200, mockStatusResponse);

    const response = await switchBot.scene(sceneId).execute();

    expect(response).toEqual(mockStatusResponse.body);
  });

  describe("headers", () => {
    test("get", async () => {
      nock(BASE_URL)
        .get(`/v1.1/scenes`)
        .reply(function (uri, body, callback) {
          const { sign, nonce, t } = this.req.headers;

          if (sign !== getExpectedSign(t!, nonce!)) {
            return callback(new Error("Invalid signature"), [
              400,
              "Invalid signature",
            ]);
          }

          callback(null, [
            200,
            getMockedScenesListResponse({ sceneId, sceneName }),
          ]);
        });

      try {
        const response = await switchBot.scenes();
        expect(response).toMatchInlineSnapshot(`
          [
            {
              "sceneId": "sceneId",
              "sceneName": "sceneName",
            },
          ]
        `);
      } catch (e) {
        throw new Error(e as any);
      }
    });

    test("post", async () => {
      nock(BASE_URL)
        .post(`/v1.1/scenes/${sceneId}/execute`)
        .reply(function (uri, body, callback) {
          const { sign, nonce, t } = this.req.headers;

          if (sign !== getExpectedSign(t!, nonce!)) {
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

          callback(null, [200, getMockedSceneExecuteResponse({ sceneId })]);
        });

      try {
        const response = await switchBot.scene(sceneId).execute();
        expect(response).toMatchInlineSnapshot(`{}`);
      } catch (e) {
        throw new Error(e as any);
      }
    });
  });
});

describe("instantiate scenes", () => {
  test("Scene", () => {
    expect(switchBot.scene(sceneId)).toBeInstanceOf(Scene);
  });
});
