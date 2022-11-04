import { Deps } from "../../types";
import SwitchBotBot from "../SwitchBotBot";

const deviceId = "deviceId";

let device: SwitchBotBot;
let deps: Deps;

beforeEach(() => {
  deps = {
    getRequest: jest.fn(),
    postRequest: jest.fn(),
  };
  device = new SwitchBotBot(deviceId, deps);
});

test("press", async () => {
  deps.postRequest = jest.fn().mockReturnValueOnce({
    statusCode: 100,
    body: {},
    message: "success",
  });

  await device.press();

  expect(deps.getRequest).toBeCalledTimes(0);
  expect(deps.postRequest).toBeCalledTimes(1);
  expect(deps.postRequest).toBeCalledWith(
    `/v1.1/devices/${deviceId}/commands`,
    { command: "press", commandType: "command", parameter: "default" }
  );
});
