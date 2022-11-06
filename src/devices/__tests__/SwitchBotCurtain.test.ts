import { Deps } from "../../types";
import { getMockedCommandResponse } from "../../utils/tests";
import SwitchBotCurtain from "../SwitchBotCurtain";

const deviceId = "deviceId";

let device: SwitchBotCurtain;
let deps: Deps;
let mockCommandResponse = getMockedCommandResponse({ deviceId });

beforeEach(() => {
  deps = {
    getRequest: jest.fn(),
    postRequest: jest.fn(),
  };
  device = new SwitchBotCurtain(deviceId, deps);
  mockCommandResponse = getMockedCommandResponse({ deviceId });
});

describe("setPosition", () => {
  beforeEach(() => {
    deps.postRequest = jest.fn().mockReturnValueOnce(mockCommandResponse);
  });

  it("should send command to switchbot", async () => {
    await device.setPosition(50);

    const expectedParameter =
      "0," + // index0
      "ff," + // mode: 0 (Performance Mode), 1 (Silent Mode), ff (default mode)
      "50"; // position: 0~100 (0 means opened, 100 means closed)

    expect(deps.getRequest).toBeCalledTimes(0);
    expect(deps.postRequest).toBeCalledTimes(1);
    expect(deps.postRequest).toHaveBeenCalledWith(
      `/v1.1/devices/${deviceId}/commands`,
      {
        command: "setPosition",
        parameter: expectedParameter,
        commandType: "command",
      }
    );
  });

  it("should throw error if position is less than 0", async () => {
    await expect(async () => {
      await device.setPosition(-1);
    }).rejects.toThrowError("Position must be between 0 and 100");

    expect(deps.getRequest).toBeCalledTimes(0);
    expect(deps.postRequest).toBeCalledTimes(0);
  });

  it("should throw error if position is greater than 100", async () => {
    await expect(async () => {
      await device.setPosition(101);
    }).rejects.toThrowError("Position must be between 0 and 100");

    expect(deps.getRequest).toBeCalledTimes(0);
    expect(deps.postRequest).toBeCalledTimes(0);
  });
});

test("open", async () => {
  deps.postRequest = jest.fn().mockReturnValueOnce(mockCommandResponse);

  await device.open();

  expect(deps.getRequest).toBeCalledTimes(0);
  expect(deps.postRequest).toBeCalledTimes(1);
  expect(deps.postRequest).toBeCalledWith(
    `/v1.1/devices/${deviceId}/commands`,
    { command: "turnOn", commandType: "command", parameter: "default" }
  );
});

test("open", async () => {
  deps.postRequest = jest.fn().mockReturnValueOnce(mockCommandResponse);

  await device.close();

  expect(deps.getRequest).toBeCalledTimes(0);
  expect(deps.postRequest).toBeCalledTimes(1);
  expect(deps.postRequest).toBeCalledWith(
    `/v1.1/devices/${deviceId}/commands`,
    { command: "turnOff", commandType: "command", parameter: "default" }
  );
});
