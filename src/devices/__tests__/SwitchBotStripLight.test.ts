import { Deps } from "../../types";
import { getMockedCommandResponse } from "../../utils/tests";
import SwitchBotStripLight from "../SwitchBotStripLight";

const deviceId = "deviceId";

let device: SwitchBotStripLight;
let deps: Deps;
let mockCommandResponse = getMockedCommandResponse({ deviceId });

beforeEach(() => {
  deps = {
    getRequest: jest.fn(),
    postRequest: jest.fn(),
  };
  device = new SwitchBotStripLight(deviceId, deps);
  mockCommandResponse = getMockedCommandResponse({ deviceId });
});

test("turn on", async () => {
  deps.postRequest = jest.fn().mockReturnValueOnce(mockCommandResponse);

  await device.turnOn();

  expect(deps.getRequest).toBeCalledTimes(0);
  expect(deps.postRequest).toBeCalledTimes(1);
  expect(deps.postRequest).toBeCalledWith(
    `/v1.1/devices/${deviceId}/commands`,
    { command: "turnOn", commandType: "command", parameter: "default" }
  );
});

test("turn off", async () => {
  deps.postRequest = jest.fn().mockReturnValueOnce(mockCommandResponse);

  await device.turnOff();

  expect(deps.getRequest).toBeCalledTimes(0);
  expect(deps.postRequest).toBeCalledTimes(1);
  expect(deps.postRequest).toBeCalledWith(
    `/v1.1/devices/${deviceId}/commands`,
    { command: "turnOff", commandType: "command", parameter: "default" }
  );
});

test("toggle", async () => {
  deps.postRequest = jest.fn().mockReturnValueOnce(mockCommandResponse);

  await device.toggle();

  expect(deps.getRequest).toBeCalledTimes(0);
  expect(deps.postRequest).toBeCalledTimes(1);
  expect(deps.postRequest).toBeCalledWith(
    `/v1.1/devices/${deviceId}/commands`,
    { command: "toggle", commandType: "command", parameter: "default" }
  );
});

test("set brightness", async () => {
  deps.postRequest = jest.fn().mockReturnValueOnce(mockCommandResponse);
  const BRIGHTNESS = 45;

  await device.setBrightness(BRIGHTNESS);

  expect(deps.getRequest).toBeCalledTimes(0);
  expect(deps.postRequest).toBeCalledTimes(1);
  expect(deps.postRequest).toBeCalledWith(
    `/v1.1/devices/${deviceId}/commands`,
    { command: "setBrightness", commandType: "command", parameter: BRIGHTNESS }
  );
});

test("set color", async () => {
  deps.postRequest = jest.fn().mockReturnValueOnce(mockCommandResponse);
  const COLOR = { red: 100, green: 50, blue: 10 } as const;

  await device.setColor([COLOR.red, COLOR.green, COLOR.blue]);

  expect(deps.getRequest).toBeCalledTimes(0);
  expect(deps.postRequest).toBeCalledTimes(1);
  expect(deps.postRequest).toBeCalledWith(
    `/v1.1/devices/${deviceId}/commands`,
    {
      command: "setColor",
      commandType: "command",
      parameter: `${COLOR.red}:${COLOR.green}:${COLOR.blue}`,
    }
  );
});
