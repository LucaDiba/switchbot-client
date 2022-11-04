import { Deps } from "../../types";
import SwitchBotLock from "../SwitchBotLock";

const deviceId = "deviceId";

let device: SwitchBotLock;
let deps: Deps;

beforeEach(() => {
  deps = {
    getRequest: jest.fn(),
    postRequest: jest.fn(),
  };
  device = new SwitchBotLock(deviceId, deps);
});

test("lock", async () => {
  deps.postRequest = jest.fn().mockReturnValueOnce({
    statusCode: 100,
    body: {},
    message: "success",
  });

  await device.lock();

  expect(deps.getRequest).toBeCalledTimes(0);
  expect(deps.postRequest).toBeCalledTimes(1);
  expect(deps.postRequest).toBeCalledWith(
    `/v1.1/devices/${deviceId}/commands`,
    { command: "lock", commandType: "command", parameter: "default" }
  );
});

test("unlock", async () => {
  deps.postRequest = jest.fn().mockReturnValueOnce({
    statusCode: 100,
    body: {},
    message: "success",
  });

  await device.unlock();

  expect(deps.getRequest).toBeCalledTimes(0);
  expect(deps.postRequest).toBeCalledTimes(1);
  expect(deps.postRequest).toBeCalledWith(
    `/v1.1/devices/${deviceId}/commands`,
    { command: "unlock", commandType: "command", parameter: "default" }
  );
});
