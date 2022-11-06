import { DeviceId } from "../types";
import { SWITCHBOT_RESPONSE_STATUS_OK } from "./constant";

export const getMockedCommandResponse = ({
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
  itemStatus?: any;
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
  };
};
