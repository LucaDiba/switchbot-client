import { DeviceStatusReponse } from "../types.js";
import { SWITCHBOT_RESPONSE_STATUS_OK } from "./constant.js";

export const returnDeviceStatusBodyOrThrow = <T>(
  response: DeviceStatusReponse<T>
) => {
  if (response.statusCode === SWITCHBOT_RESPONSE_STATUS_OK) {
    return response.body;
  }

  throw new Error(response.message);
};
