import { Deps, DeviceStatusReponse } from "../../types";
import { getMockedStatusResponse } from "../../utils/tests";
import SwitchBotMeter from "../SwitchBotMeter";

const deviceId = "deviceId";
const EXPECTED_TEMPERATURE = 22.2;
const EXPECTED_HUMIDITY = 45;

let device: SwitchBotMeter;
let deps: Deps;
let mockStatusResponse: DeviceStatusReponse<{
  temperature: number;
  humidity: number;
}>;

beforeEach(() => {
  deps = {
    getRequest: jest.fn(),
    postRequest: jest.fn(),
  };
  device = new SwitchBotMeter(deviceId, deps);
  mockStatusResponse = getMockedStatusResponse({
    body: {
      temperature: EXPECTED_TEMPERATURE,
      humidity: EXPECTED_HUMIDITY,
    },
  });
  deps.getRequest = jest.fn().mockReturnValueOnce(mockStatusResponse);
});

it("should get temperature", async () => {
  const temperature = await device.getTemperature();

  expect(temperature).toEqual(EXPECTED_TEMPERATURE);

  expect(deps.getRequest).toBeCalledTimes(1);
  expect(deps.postRequest).toBeCalledTimes(0);
});

it("should get humidity", async () => {
  const humidity = await device.getHumidity();

  expect(humidity).toEqual(EXPECTED_HUMIDITY);

  expect(deps.getRequest).toBeCalledTimes(1);
  expect(deps.postRequest).toBeCalledTimes(0);
});
