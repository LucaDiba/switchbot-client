import { Deps } from "../../types";
import { getMockedCommandResponse } from "../../utils/tests";
import SwitchBotBot from "../SwitchBotBot";

const deviceId = "deviceId";

let device: SwitchBotBot;
let deps: Deps;
let mockCommandResponse = getMockedCommandResponse({ deviceId });

beforeEach(() => {
  deps = {
    getRequest: jest.fn(),
    postRequest: jest.fn(),
  };
  device = new SwitchBotBot(deviceId, deps);
  mockCommandResponse = getMockedCommandResponse({ deviceId });
});

test("press", async () => {
  deps.postRequest = jest.fn().mockReturnValueOnce(mockCommandResponse);

  await device.press();

  expect(deps.getRequest).toHaveBeenCalledTimes(0);
  expect(deps.postRequest).toHaveBeenCalledTimes(1);
  expect(deps.postRequest).toHaveBeenCalledWith(
    `/v1.1/devices/${deviceId}/commands`,
    { command: "press", commandType: "command", parameter: "default" }
  );
});
