import { Deps } from "../../types";
import { getMockedCommandResponse } from "../../utils/tests";
import SwitchBotRobotVacuumCleaner from "../SwitchBotRobotVacuumCleaner";

const deviceId = "deviceId";

let device: SwitchBotRobotVacuumCleaner;
let deps: Deps;
let mockCommandResponse = getMockedCommandResponse({ deviceId });

beforeEach(() => {
  deps = {
    getRequest: jest.fn(),
    postRequest: jest.fn(),
  };
  device = new SwitchBotRobotVacuumCleaner(deviceId, deps);
  mockCommandResponse = getMockedCommandResponse({ deviceId });
});

test("start", async () => {
  deps.postRequest = jest.fn().mockReturnValueOnce(mockCommandResponse);

  await device.start();

  expect(deps.getRequest).toBeCalledTimes(0);
  expect(deps.postRequest).toBeCalledTimes(1);
  expect(deps.postRequest).toBeCalledWith(
    `/v1.1/devices/${deviceId}/commands`,
    { command: "start", commandType: "command", parameter: "default" }
  );
});

test("stop", async () => {
  deps.postRequest = jest.fn().mockReturnValueOnce(mockCommandResponse);

  await device.stop();

  expect(deps.getRequest).toBeCalledTimes(0);
  expect(deps.postRequest).toBeCalledTimes(1);
  expect(deps.postRequest).toBeCalledWith(
    `/v1.1/devices/${deviceId}/commands`,
    { command: "stop", commandType: "command", parameter: "default" }
  );
});

test("dock", async () => {
  deps.postRequest = jest.fn().mockReturnValueOnce(mockCommandResponse);

  await device.dock();

  expect(deps.getRequest).toBeCalledTimes(0);
  expect(deps.postRequest).toBeCalledTimes(1);
  expect(deps.postRequest).toBeCalledWith(
    `/v1.1/devices/${deviceId}/commands`,
    { command: "dock", commandType: "command", parameter: "default" }
  );
});
