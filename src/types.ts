import { GetDeviceBody as GetDeviceBodyBot } from "./devices/SwitchBotBot";
import { GetDeviceBody as GetDeviceBodyCamera } from "./devices/SwitchBotCamera";
import { GetDeviceBody as GetDeviceBodyCeilingLight } from "./devices/SwitchBotCeilingLight";
import { GetDeviceBody as GetDeviceBodyColorBulb } from "./devices/SwitchBotColorBulb";
import { GetDeviceBody as GetDeviceBodyContactSensor } from "./devices/SwitchBotContactSensor";
import { GetDeviceBody as GetDeviceBodyCurtain } from "./devices/SwitchBotCurtain";
import { GetDeviceBody as GetDeviceBodyHub } from "./devices/SwitchBotHub";
import { GetDeviceBody as GetDeviceBodyHumidifier } from "./devices/SwitchBotHumidifier";
import { GetDeviceBody as GetDeviceBodyKeypad } from "./devices/SwitchBotKeypad";
import { GetDeviceBody as GetDeviceBodyLock } from "./devices/SwitchBotLock";
import { GetDeviceBody as GetDeviceBodyMeter } from "./devices/SwitchBotMeter";
import { GetDeviceBody as GetDeviceBodyMotionSensor } from "./devices/SwitchBotMotionSensor";
import { GetDeviceBody as GetDeviceBodyPlug } from "./devices/SwitchBotPlug";
import { GetDeviceBody as GetDeviceBodyPlugMini } from "./devices/SwitchBotPlugMini";
import { GetDeviceBody as GetDeviceBodyRemote } from "./devices/SwitchBotRemote";
import { GetDeviceBody as GetDeviceBodyRobotVacuumCleaner } from "./devices/SwitchBotRobotVacuumCleaner";
import { GetDeviceBody as GetDeviceBodyStripLight } from "./devices/SwitchBotStripLight";
import { DEVICE_TYPES_ARRAY } from "./utils/constant";

export type Deps = {
  getRequest: <T>(path: string) => Promise<T>;
  postRequest: <T>(path: string, body: any) => Promise<T>;
};

export type DeviceId = string;

export type SceneId = string;

export type SwitchBotResponse<T> = {
  statusCode: number;
  message: string;
  body: T;
};

export type GetAllDevicesResponse = SwitchBotResponse<{
  deviceList: Array<
    | GetDeviceBodyBot
    | GetDeviceBodyCamera
    | GetDeviceBodyCeilingLight
    | GetDeviceBodyColorBulb
    | GetDeviceBodyContactSensor
    | GetDeviceBodyCurtain
    | GetDeviceBodyHub
    | GetDeviceBodyHumidifier
    | GetDeviceBodyKeypad
    | GetDeviceBodyLock
    | GetDeviceBodyMeter
    | GetDeviceBodyMotionSensor
    | GetDeviceBodyPlug
    | GetDeviceBodyPlugMini
    | GetDeviceBodyRemote
    | GetDeviceBodyRobotVacuumCleaner
    | GetDeviceBodyStripLight
  >;
  infraredRemoteList: Array<{
    deviceId: DeviceId;
    deviceName: string;
    remoteType: string;
    hubDeviceId: DeviceId;
  }>;
}>;

export type GetAllScenesResponse = SwitchBotResponse<
  { sceneId: string; sceneName: string; }[]
>;

export type SceneExecuteResponse<T> = SwitchBotResponse<T>;

export type DeviceStatusResponse<T> = SwitchBotResponse<T>;

export type DeviceCommandResponse<T> = SwitchBotResponse<{
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

export type BaseDeviceWithPowerBrightnessStatusBody<DeviceType> =
  BaseDeviceWithPowerStatusBody<DeviceType> & {
    brightness: number;
  };

export type BaseDeviceWithPowerBrightnessColorStatusBody<DeviceType> =
  BaseDeviceWithPowerBrightnessStatusBody<DeviceType> & {
    color: string;
  };

export type BaseDeviceWithPowerBrightnessColorTemperatureStatusBody<
  DeviceType
> = BaseDeviceWithPowerBrightnessStatusBody<DeviceType> & {
  colorTemperature: number;
};

export type BaseDeviceWithTemperatureHumidityStatusBody<DeviceType> =
  BaseDeviceStatusBody<DeviceType> & {
    temperature: number;
    humidity: number;
  };

export type BaseDeviceWithMotionBrightnessStatusBody<DeviceType> =
  BaseDeviceStatusBody<DeviceType> & {
    moveDetected: boolean;
    brightness: "bright" | "dim";
  };

export type BaseDeviceGetDeviceBody<DeviceType> =
  BaseDeviceStatusBody<DeviceType> & {
    deviceName: string;
    enableCloudService: boolean;
  };
