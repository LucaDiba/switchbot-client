import { Deps } from "../../types";
import { getMockedCommandResponse } from "../../utils/tests";
import SwitchBotBlindTilt from "../SwitchBotBlindTilt";

const deviceId = "deviceId";

let device: SwitchBotBlindTilt;
let deps: Deps;
let mockCommandResponse = getMockedCommandResponse({ deviceId });

beforeEach(() => {
  deps = {
    getRequest: jest.fn(),
    postRequest: jest.fn(),
  };
  device = new SwitchBotBlindTilt(deviceId, deps);
  mockCommandResponse = getMockedCommandResponse({ deviceId });
});

describe("setPosition", () => {
  beforeEach(() => {
    deps.postRequest = jest.fn().mockReturnValueOnce(mockCommandResponse);
  });

  it.each(["up", "down"] as const)(
    "should set position to 42 %s",
    async (direction) => {
      await device.setPosition(42, direction);

      const expectedParameter = `${direction},42`;

      expect(deps.getRequest).toHaveBeenCalledTimes(0);
      expect(deps.postRequest).toHaveBeenCalledTimes(1);
      expect(deps.postRequest).toHaveBeenCalledWith(
        `/v1.1/devices/${deviceId}/commands`,
        {
          command: "setPosition",
          parameter: expectedParameter,
          commandType: "command",
        }
      );
    }
  );

  it("should set position to an even number if odd number is provided", async () => {
    await device.setPosition(43, "up");

    const expectedParameter = `up,42`;

    expect(deps.getRequest).toHaveBeenCalledTimes(0);
    expect(deps.postRequest).toHaveBeenCalledTimes(1);
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
      await device.setPosition(-1, "up");
    }).rejects.toThrowErrorMatchingInlineSnapshot(`"Position must be between 0 and 100"`);

    expect(deps.getRequest).toHaveBeenCalledTimes(0);
    expect(deps.postRequest).toHaveBeenCalledTimes(0);
  });

  it("should throw error if position is greater than 100", async () => {
    await expect(async () => {
      await device.setPosition(101, "up");
    }).rejects.toThrowErrorMatchingInlineSnapshot(`"Position must be between 0 and 100"`);

    expect(deps.getRequest).toHaveBeenCalledTimes(0);
    expect(deps.postRequest).toHaveBeenCalledTimes(0);
  });
});

test("open", async () => {
  deps.postRequest = jest.fn().mockReturnValueOnce(mockCommandResponse);

  await device.open();

  expect(deps.getRequest).toHaveBeenCalledTimes(0);
  expect(deps.postRequest).toHaveBeenCalledTimes(1);
  expect(deps.postRequest).toHaveBeenCalledWith(
    `/v1.1/devices/${deviceId}/commands`,
    { command: "fullyOpen", commandType: "command", parameter: "default" }
  );
});

test("close up", async () => {
  deps.postRequest = jest.fn().mockReturnValueOnce(mockCommandResponse);

  await device.closeUp();

  expect(deps.getRequest).toHaveBeenCalledTimes(0);
  expect(deps.postRequest).toHaveBeenCalledTimes(1);
  expect(deps.postRequest).toHaveBeenCalledWith(
    `/v1.1/devices/${deviceId}/commands`,
    { command: "closeUp", commandType: "command", parameter: "default" }
  );
});

test("close down", async () => {
  deps.postRequest = jest.fn().mockReturnValueOnce(mockCommandResponse);

  await device.closeDown();

  expect(deps.getRequest).toHaveBeenCalledTimes(0);
  expect(deps.postRequest).toHaveBeenCalledTimes(1);
  expect(deps.postRequest).toHaveBeenCalledWith(
    `/v1.1/devices/${deviceId}/commands`,
    { command: "closeDown", commandType: "command", parameter: "default" }
  );
});
