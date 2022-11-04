import { returnDeviceStatusBodyOrThrow } from "../response";
import { DeviceStatusReponse } from "../../types";
import { SWITCHBOT_RESPONSE_STATUS_OK } from "../constant";

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

    expect(() => returnDeviceStatusBodyOrThrow(response)).toThrowError(
      ERROR_MESSAGE
    );
  });
});
