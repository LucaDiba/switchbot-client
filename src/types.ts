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

export type BaseDeviceStatusBody = {
  deviceId: DeviceId;
  deviceType: typeof DEVICE_TYPES_ARRAY[number];
  hubDeviceId: DeviceId;
};

export type BaseDeviceWithPowerStatusBody = BaseDeviceStatusBody & {
  power: "on" | "off";
};
