import {
  BaseDeviceStatusBody,
  BaseDeviceWithPowerStatusBody,
  BaseDeviceWithTemperatureHumidityStatusBody,
  Deps,
} from "../../types";
import { DEVICE_TYPES_ARRAY } from "../../utils/constant";
import {
  getMockedCommandResponse,
  getMockedStatusResponse,
} from "../../utils/tests";
import {
  DeviceWithStatus,
  DeviceWithPower,
  DeviceWithPowerToggle,
  DeviceWithTemperatureHumidity,
} from "../Device";

type DeviceTypes = typeof DEVICE_TYPES_ARRAY[number];

const deviceId = "deviceId";
const hubDeviceId = "hubDeviceId";

let deps: Deps;
let mockCommandResponse = getMockedCommandResponse({ deviceId });

beforeEach(() => {
  deps = {
    getRequest: jest.fn(),
    postRequest: jest.fn(),
  };
  mockCommandResponse = getMockedCommandResponse({ deviceId });
});

describe("Device", () => {
  let device: DeviceWithStatus<BaseDeviceStatusBody<DeviceTypes>, {}>;

  beforeEach(() => {
    deps = {
      getRequest: jest.fn(),
      postRequest: jest.fn(),
    };
    device = new DeviceWithStatus(deviceId, deps);
  });

  describe("getStatus", () => {
    test("getStatus", async () => {
      deps.getRequest = jest.fn().mockReturnValueOnce({
        statusCode: 100,
        body: {
          deviceId,
          deviceType: "Bot",
          power: "on",
          hubDeviceId,
        },
        message: "success",
      });

      const botStatus = await device.getStatus();
      expect(botStatus).toEqual({
        deviceId,
        deviceType: "Bot",
        hubDeviceId,
        power: "on",
      });

      expect(deps.getRequest).toBeCalledTimes(1);
      expect(deps.postRequest).toBeCalledTimes(0);
      expect(deps.getRequest).toBeCalledWith(
        `/v1.1/devices/${deviceId}/status`
      );
    });

    test("getStatus with forceRefresh = true refreshes the cache", async () => {
      deps.getRequest = jest
        .fn()
        .mockReturnValueOnce({
          statusCode: 100,
          body: {
            deviceId,
            deviceType: "Bot",
            cacheValueTest: "value1", // First request returns "value1"
            hubDeviceId,
          },
          message: "success",
        })
        .mockReturnValueOnce({
          statusCode: 100,
          body: {
            deviceId,
            deviceType: "Bot",
            cacheValueTest: "value2", // Second request returns "value2"
            hubDeviceId,
          },
          message: "success",
        });

      const firstStatus = await device.getStatus();
      expect((firstStatus as any).cacheValueTest).toEqual("value1");

      const secondStatus = await device.getStatus({ forceRefresh: true });
      expect((secondStatus as any).cacheValueTest).toEqual("value2");

      expect(deps.getRequest).toBeCalledTimes(2);
      expect(deps.postRequest).toBeCalledTimes(0);
      expect(deps.getRequest).toBeCalledWith(
        `/v1.1/devices/${deviceId}/status`
      );
    });

    test("getStatus with default forceRefresh does not refresh the cache", async () => {
      deps.getRequest = jest
        .fn()
        .mockReturnValueOnce({
          statusCode: 100,
          body: {
            deviceId,
            deviceType: "Bot",
            cacheValueTest: "value1", // First request returns "value1"
            hubDeviceId,
          },
          message: "success",
        })
        .mockReturnValueOnce({
          statusCode: 100,
          body: {
            deviceId,
            deviceType: "Bot",
            cacheValueTest: "value2", // Second request returns "value2"
            hubDeviceId,
          },
          message: "success",
        });

      const firstStatus = await device.getStatus();
      expect((firstStatus as any).cacheValueTest).toEqual("value1");

      const secondStatus = await device.getStatus();
      expect((secondStatus as any).cacheValueTest).toEqual("value1");

      expect(deps.getRequest).toBeCalledTimes(1);
      expect(deps.postRequest).toBeCalledTimes(0);
      expect(deps.getRequest).toBeCalledWith(
        `/v1.1/devices/${deviceId}/status`
      );
    });
  });

  test("getHubDeviceId", async () => {
    deps.getRequest = jest.fn().mockReturnValueOnce({
      statusCode: 100,
      body: {
        deviceId,
        deviceType: "Bot",
        hubDeviceId,
      },
      message: "success",
    });

    const hubDeviceIdStatus = await device.getHubDeviceId();
    expect(hubDeviceIdStatus).toEqual(hubDeviceId);

    expect(deps.getRequest).toBeCalledTimes(1);
    expect(deps.postRequest).toBeCalledTimes(0);
    expect(deps.getRequest).toBeCalledWith(`/v1.1/devices/${deviceId}/status`);
  });
});

describe("DeviceWithPower", () => {
  let device: DeviceWithPower<BaseDeviceWithPowerStatusBody<DeviceTypes>, {}>;

  beforeEach(() => {
    deps = {
      getRequest: jest.fn(),
      postRequest: jest.fn(),
    };
    device = new DeviceWithPower(deviceId, deps);
  });

  describe("GET requests", () => {
    afterEach(() => {
      expect(deps.getRequest).toBeCalledTimes(1);
      expect(deps.postRequest).toBeCalledTimes(0);
      expect(deps.getRequest).toBeCalledWith(
        `/v1.1/devices/${deviceId}/status`
      );
    });

    test("get turned on power status", async () => {
      deps.getRequest = jest.fn().mockReturnValueOnce({
        statusCode: 100,
        body: {
          deviceId,
          deviceType: "Bot",
          power: "on",
          hubDeviceId,
        },
        message: "success",
      });

      const devicePowerStatus = await device.getPowerStatus();
      expect(devicePowerStatus).toEqual("on");
    });

    test("get turned off power status", async () => {
      deps.getRequest = jest.fn().mockReturnValueOnce({
        statusCode: 100,
        body: {
          deviceId,
          deviceType: "Bot",
          power: "off",
          hubDeviceId,
        },
        message: "success",
      });

      const devicePowerStatus = await device.getPowerStatus();
      expect(devicePowerStatus).toEqual("off");
    });

    test("get invalid power status", async () => {
      const INVALID_STATUS = "invalid";

      deps.getRequest = jest.fn().mockReturnValueOnce({
        statusCode: 100,
        body: {
          deviceId,
          deviceType: "Bot",
          power: INVALID_STATUS,
          hubDeviceId,
        },
        message: "success",
      });

      await expect(async () => {
        await device.getPowerStatus();
      }).rejects.toThrowError(`Unexpected power status: ${INVALID_STATUS}`);
    });
  });

  describe("POST requests", () => {
    beforeEach(() => {
      deps.postRequest = jest.fn().mockReturnValueOnce(mockCommandResponse);
    });

    afterEach(() => {
      expect(deps.getRequest).toBeCalledTimes(0);
      expect(deps.postRequest).toBeCalledTimes(1);
    });

    test("turn on", async () => {
      await device.turnOn();

      expect(deps.postRequest).toBeCalledWith(
        `/v1.1/devices/${deviceId}/commands`,
        {
          command: "turnOn",
          parameter: "default",
          commandType: "command",
        }
      );
    });

    test("turn off", async () => {
      await device.turnOff();

      expect(deps.postRequest).toBeCalledWith(
        `/v1.1/devices/${deviceId}/commands`,
        {
          command: "turnOff",
          parameter: "default",
          commandType: "command",
        }
      );
    });
  });
});

describe("DeviceWithPowerToggle", () => {
  let device: DeviceWithPowerToggle<
    BaseDeviceWithPowerStatusBody<DeviceTypes>,
    {}
  >;

  beforeEach(() => {
    deps = {
      getRequest: jest.fn(),
      postRequest: jest.fn(),
    };
    device = new DeviceWithPowerToggle(deviceId, deps);
  });

  describe("POST requests", () => {
    beforeEach(() => {
      deps.postRequest = jest.fn().mockReturnValueOnce(mockCommandResponse);
    });

    afterEach(() => {
      expect(deps.getRequest).toBeCalledTimes(0);
      expect(deps.postRequest).toBeCalledTimes(1);
    });

    test("toggle", async () => {
      await device.toggle();

      expect(deps.postRequest).toBeCalledWith(
        `/v1.1/devices/${deviceId}/commands`,
        {
          command: "toggle",
          parameter: "default",
          commandType: "command",
        }
      );
    });
  });
});

describe("DeviceWithPowerLevel", () => {
  const EXPECTED_TEMPERATURE = 22.2;
  const EXPECTED_HUMIDITY = 45;

  let device: DeviceWithTemperatureHumidity<
    BaseDeviceWithTemperatureHumidityStatusBody<DeviceTypes>,
    {}
  >;

  beforeEach(() => {
    deps = {
      getRequest: jest.fn(),
      postRequest: jest.fn(),
    };
    device = new DeviceWithTemperatureHumidity(deviceId, deps);
    deps.getRequest = jest.fn().mockReturnValueOnce(
      getMockedStatusResponse({
        body: {
          temperature: EXPECTED_TEMPERATURE,
          humidity: EXPECTED_HUMIDITY,
        },
      })
    );
  });

  test("get temperature", async () => {
    const temperature = await device.getTemperature();

    expect(temperature).toEqual(EXPECTED_TEMPERATURE);

    expect(deps.getRequest).toBeCalledTimes(1);
    expect(deps.postRequest).toBeCalledTimes(0);
  });

  test("get humidity", async () => {
    const humidity = await device.getHumidity();

    expect(humidity).toEqual(EXPECTED_HUMIDITY);

    expect(deps.getRequest).toBeCalledTimes(1);
    expect(deps.postRequest).toBeCalledTimes(0);
  });
});
