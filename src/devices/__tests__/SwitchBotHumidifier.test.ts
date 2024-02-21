import { Deps } from "../../types";
import { getMockedCommandResponse } from "../../utils/tests";
import SwitchBotHumidifier from "../SwitchBotHumidifier";

const deviceId = "deviceId";

let device: SwitchBotHumidifier;
let deps: Deps;
let mockCommandResponse = getMockedCommandResponse({ deviceId });

beforeEach(() => {
  deps = {
    getRequest: jest.fn(),
    postRequest: jest.fn(),
  };
  device = new SwitchBotHumidifier(deviceId, deps);
  mockCommandResponse = getMockedCommandResponse({ deviceId });
});

describe("set mode", () => {
  test("auto", async () => {
    deps.postRequest = jest.fn().mockReturnValueOnce(mockCommandResponse);

    await device.setMode("auto");

    expect(deps.getRequest).toHaveBeenCalledTimes(0);
    expect(deps.postRequest).toHaveBeenCalledTimes(1);
    expect(deps.postRequest).toHaveBeenCalledWith(
      `/v1.1/devices/${deviceId}/commands`,
      { command: "setMode", commandType: "command", parameter: "auto" }
    );
  });

  test("number between 0 and 100", async () => {
    deps.postRequest = jest.fn().mockReturnValueOnce(mockCommandResponse);

    await device.setMode(45);

    expect(deps.getRequest).toHaveBeenCalledTimes(0);
    expect(deps.postRequest).toHaveBeenCalledTimes(1);
    expect(deps.postRequest).toHaveBeenCalledWith(
      `/v1.1/devices/${deviceId}/commands`,
      { command: "setMode", commandType: "command", parameter: "45" }
    );
  });

  test("throw error if the number is not between 0 and 100", async () => {
    deps.postRequest = jest.fn().mockReturnValueOnce(mockCommandResponse);

    await expect(device.setMode(101)).rejects.toThrow(
      "Atomization efficiency must be between 0 and 100"
    );

    expect(deps.getRequest).toHaveBeenCalledTimes(0);
    expect(deps.postRequest).toHaveBeenCalledTimes(0);
  });
});
