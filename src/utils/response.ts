import { DeviceCommandResponse, DeviceStatusReponse } from "../types.js";
import { SWITCHBOT_RESPONSE_STATUS_OK } from "./constant.js";

export const returnDeviceStatusBodyOrThrow = <T>(
  response: DeviceStatusReponse<T>
) => {
  if (response.statusCode === SWITCHBOT_RESPONSE_STATUS_OK) {
    return response.body;
  }

  throw new Error(response.message);
};

export const returnDeviceCommandBodyOrThrow = <T>(
  response: DeviceCommandResponse<T>
) => {
  if (response.statusCode !== SWITCHBOT_RESPONSE_STATUS_OK) {
    const { statusCode, message } = response;
    throw new Error(`Error ${statusCode}: ${message}`);
  }

  const { body } = response;

  if (body.items.length !== 1) {
    throw new Error(`Unexpected items length: ${body.items.length}`);
  }

  const item = body.items[0];
  const { code, status } = item;

  if (code !== SWITCHBOT_RESPONSE_STATUS_OK) {
    const { deviceId, message } = item;
    throw new Error(`Error ${code} from device ${deviceId}: ${message}`);
  }

  return status;
};
