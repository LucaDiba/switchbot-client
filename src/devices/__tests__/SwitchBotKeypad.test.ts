import { Deps } from "../../types";
import { getMockedCommandResponse } from "../../utils/tests";
import SwitchBotKeypad from "../SwitchBotKeypad";

const deviceId = "deviceId";

let device: SwitchBotKeypad;
let deps: Deps;
let mockCommandResponse = getMockedCommandResponse({ deviceId });

beforeEach(() => {
  deps = {
    getRequest: jest.fn(),
    postRequest: jest.fn(),
  };
  device = new SwitchBotKeypad(deviceId, deps);
  mockCommandResponse = getMockedCommandResponse({ deviceId });
});

describe("create key", () => {
  test("permanent key", async () => {
    deps.postRequest = jest.fn().mockReturnValueOnce(mockCommandResponse);
    const key = {
      name: "name",
      type: "permanent",
      password: "123456",
    } as const;

    await device.createKey(key);

    expect(deps.getRequest).toHaveBeenCalledTimes(0);
    expect(deps.postRequest).toHaveBeenCalledTimes(1);
    expect(deps.postRequest).toHaveBeenCalledWith(
      `/v1.1/devices/${deviceId}/commands`,
      { command: "createKey", commandType: "command", parameter: key }
    );
  });

  test("urgent key", async () => {
    deps.postRequest = jest.fn().mockReturnValueOnce(mockCommandResponse);
    const key = {
      name: "name",
      type: "urgent",
      password: "123456",
    } as const;

    await device.createKey(key);

    expect(deps.getRequest).toHaveBeenCalledTimes(0);
    expect(deps.postRequest).toHaveBeenCalledTimes(1);
    expect(deps.postRequest).toHaveBeenCalledWith(
      `/v1.1/devices/${deviceId}/commands`,
      { command: "createKey", commandType: "command", parameter: key }
    );
  });

  test("timeLimit key", async () => {
    deps.postRequest = jest.fn().mockReturnValueOnce(mockCommandResponse);

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const params = {
      name: "name",
      type: "timeLimit",
      password: "123456",
      startTime: today,
      endTime: tomorrow,
    } as const;

    await device.createKey(params);

    expect(deps.getRequest).toHaveBeenCalledTimes(0);
    expect(deps.postRequest).toHaveBeenCalledTimes(1);
    expect(deps.postRequest).toHaveBeenCalledWith(
      `/v1.1/devices/${deviceId}/commands`,
      {
        command: "createKey",
        commandType: "command",
        parameter: {
          ...params,
          startTime: today.getTime(),
          endTime: tomorrow.getTime(),
        },
      }
    );
  });

  test("disposable key", async () => {
    deps.postRequest = jest.fn().mockReturnValueOnce(mockCommandResponse);

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const params = {
      name: "name",
      type: "disposable",
      password: "123456",
      startTime: today,
      endTime: tomorrow,
    } as const;

    await device.createKey(params);

    expect(deps.getRequest).toHaveBeenCalledTimes(0);
    expect(deps.postRequest).toHaveBeenCalledTimes(1);
    expect(deps.postRequest).toHaveBeenCalledWith(
      `/v1.1/devices/${deviceId}/commands`,
      {
        command: "createKey",
        commandType: "command",
        parameter: {
          ...params,
          startTime: today.getTime(),
          endTime: tomorrow.getTime(),
        },
      }
    );
  });

  test("invalid type", async () => {
    deps.postRequest = jest.fn().mockReturnValueOnce(mockCommandResponse);

    await expect(() =>
      device.createKey({
        name: "name",
        // @ts-expect-error
        type: "invalid",
        password: "123456",
      })
    ).toThrowErrorMatchingInlineSnapshot(`"Invalid type"`);

    expect(deps.getRequest).toHaveBeenCalledTimes(0);
    expect(deps.postRequest).toHaveBeenCalledTimes(0);
  });
});

test("delete key", async () => {
  deps.postRequest = jest.fn().mockReturnValueOnce(mockCommandResponse);
  const KEY_ID = 3;

  await device.deleteKey(KEY_ID);

  expect(deps.getRequest).toHaveBeenCalledTimes(0);
  expect(deps.postRequest).toHaveBeenCalledTimes(1);
  expect(deps.postRequest).toHaveBeenCalledWith(
    `/v1.1/devices/${deviceId}/commands`,
    { command: "deleteKey", commandType: "command", parameter: { id: KEY_ID } }
  );
});
