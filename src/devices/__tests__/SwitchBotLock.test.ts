import { Deps } from "../../types";
import { getMockedCommandResponse } from "../../utils/tests";
import SwitchBotLock from "../SwitchBotLock";

const deviceId = "deviceId";

let device: SwitchBotLock;
let deps: Deps;
let mockCommandResponse = getMockedCommandResponse({ deviceId });

beforeEach(() => {
  deps = {
    getRequest: jest.fn(),
    postRequest: jest.fn(),
  };
  device = new SwitchBotLock(deviceId, deps);
  mockCommandResponse = getMockedCommandResponse({ deviceId });
});

test("lock", async () => {
  deps.postRequest = jest.fn().mockReturnValueOnce(mockCommandResponse);

  await device.lock();

  expect(deps.getRequest).toHaveBeenCalledTimes(0);
  expect(deps.postRequest).toHaveBeenCalledTimes(1);
  expect(deps.postRequest).toHaveBeenCalledWith(
    `/v1.1/devices/${deviceId}/commands`,
    { command: "lock", commandType: "command", parameter: "default" }
  );
});

test("unlock", async () => {
  deps.postRequest = jest.fn().mockReturnValueOnce(mockCommandResponse);

  await device.unlock();

  expect(deps.getRequest).toHaveBeenCalledTimes(0);
  expect(deps.postRequest).toHaveBeenCalledTimes(1);
  expect(deps.postRequest).toHaveBeenCalledWith(
    `/v1.1/devices/${deviceId}/commands`,
    { command: "unlock", commandType: "command", parameter: "default" }
  );
});
