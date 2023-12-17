import { DeviceCommandResponse, DeviceId, DeviceStatusResponse } from "../types";
import { SWITCHBOT_RESPONSE_STATUS_OK } from "./constant";

export const getMockedStatusResponse = <T>({
  statusCode,
  message,
  body,
}: {
  statusCode?: number;
  message?: string;
  body?: T;
}) => {
  return {
    statusCode: statusCode ?? SWITCHBOT_RESPONSE_STATUS_OK,
    message: message ?? "success",
    body: body ?? {},
  } as DeviceStatusResponse<T>;
};

export const getMockedCommandResponse = <T>({
  deviceId,

  mainStatusCode,
  mainMessage,

  itemCode,
  itemMessage,
  itemStatus,
}: {
  deviceId: DeviceId;
  mainStatusCode?: number;
  mainMessage?: string;
  itemCode?: number;
  itemMessage?: string;
  itemStatus?: T;
}) => {
  return {
    statusCode: mainStatusCode ?? SWITCHBOT_RESPONSE_STATUS_OK,
    message: mainMessage ?? "success",
    body: {
      items: [
        {
          code: itemCode ?? SWITCHBOT_RESPONSE_STATUS_OK,
          message: itemMessage ?? "success",
          deviceId,
          status: itemStatus ?? {},
        },
      ],
    },
  } as DeviceCommandResponse<T>;
};
