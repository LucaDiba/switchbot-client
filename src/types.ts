import { DEVICE_TYPES_ARRAY } from "./utils/constant";

export type Deps = {
  getRequest: <T>(path: string) => Promise<T>;
  postRequest: <T>(path: string, body: any) => Promise<T>;
};

export type DeviceId = string;

export type DeviceStatusReponse<T> = {
  statusCode: number;
  message: string;
  body: T;
};

export type DeviceCommandResponse<T> = DeviceStatusReponse<{
  items: {
    code: number;
    deviceId: DeviceId;
    message: string;
    status: T;
  }[];
}>;

export type BaseDeviceStatusBody<DeviceType> = {
  deviceId: DeviceId;
  deviceType: DeviceType & typeof DEVICE_TYPES_ARRAY[number];
  hubDeviceId: DeviceId;
};

export type BaseDeviceWithPowerStatusBody<DeviceType> =
  BaseDeviceStatusBody<DeviceType> & {
    power: "on" | "off";
  };

export type BaseDeviceGetDeviceBody<DeviceType> =
  BaseDeviceStatusBody<DeviceType> & {
    deviceName: string;
    enableCloudService: boolean;
  };
