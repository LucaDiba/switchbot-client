import {
  BaseDeviceGetDeviceBody,
  BaseDeviceWithPowerBrightnessColorTemperatureStatusBody,
} from "../types";
import { DEVICE_TYPES } from "../utils/constant";
import { DeviceWithPowerToggleBrightnessColorTemperature } from "./Device";

type DeviceType =
  | typeof DEVICE_TYPES.CEILING_LIGHT
  | typeof DEVICE_TYPES.CEILING_LIGHT_PRO;

export type GetDeviceBody = BaseDeviceGetDeviceBody<DeviceType>;

export type StatusBody =
  BaseDeviceWithPowerBrightnessColorTemperatureStatusBody<DeviceType>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CommandBody = any; // TODO: Figure out what this is

export default class SwitchBotCeilingLight extends DeviceWithPowerToggleBrightnessColorTemperature<
  StatusBody,
  CommandBody
> {}
