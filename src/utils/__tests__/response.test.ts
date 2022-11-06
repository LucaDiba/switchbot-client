import {
  returnDeviceStatusBodyOrThrow,
  returnDeviceCommandBodyOrThrow,
} from "../response";
import { DeviceStatusReponse } from "../../types";
import { SWITCHBOT_RESPONSE_STATUS_OK } from "../constant";
import { getMockedCommandResponse } from "../tests";

describe("returnDeviceStatusBodyOrThrow", () => {
  it("should return body", () => {
    const response: DeviceStatusReponse<string> = {
      statusCode: SWITCHBOT_RESPONSE_STATUS_OK,
      body: "body",
      message: "message",
    };

    expect(returnDeviceStatusBodyOrThrow(response)).toBe("body");
  });

  it("should throw error", () => {
    const ERROR_MESSAGE = "error message";

    const response: DeviceStatusReponse<string> = {
      statusCode: 400,
      body: "body",
      message: ERROR_MESSAGE,
    };

    expect(() =>
      returnDeviceStatusBodyOrThrow(response)
    ).toThrowErrorMatchingInlineSnapshot(`"error message"`);
  });
});

describe("returnDeviceCommandBodyOrThrow", () => {
  it("should return status", () => {
    const response = getMockedCommandResponse({
      deviceId: "deviceId",
      itemStatus: "status",
    });

    expect(returnDeviceCommandBodyOrThrow(response)).toBe("status");
  });

  it("should throw error on main body", () => {
    const response = getMockedCommandResponse({
      deviceId: "deviceId",
      mainStatusCode: 400,
      mainMessage: "error message",
    });

    expect(() =>
      returnDeviceCommandBodyOrThrow(response)
    ).toThrowErrorMatchingInlineSnapshot(`"Error 400: error message"`);
  });

  it("should throw error on item", () => {
    const response = getMockedCommandResponse({
      deviceId: "deviceId",
      itemCode: 400,
      itemMessage: "error message",
    });

    expect(() =>
      returnDeviceCommandBodyOrThrow(response)
    ).toThrowErrorMatchingInlineSnapshot(
      `"Error 400 from device deviceId: error message"`
    );
  });

  it("should throw error if number of items is not 1", () => {
    const response = {
      statusCode: SWITCHBOT_RESPONSE_STATUS_OK,
      message: "success",
      body: {
        items: [],
      },
    };

    expect(() =>
      returnDeviceCommandBodyOrThrow(response)
    ).toThrowErrorMatchingInlineSnapshot(`"Unexpected items length: 0"`);
  });
});
