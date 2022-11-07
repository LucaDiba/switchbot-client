import {
  BaseDeviceGetDeviceBody,
  BaseDeviceWithPowerBrightnessColorTemperatureStatusBody,
} from "../types.js";
import { DEVICE_TYPES } from "../utils/constant.js";
import { DeviceWithPowerToggleBrightnessColorTemperature } from "./Device.js";

type DeviceType =
  | typeof DEVICE_TYPES.CEILING_LIGHT
  | typeof DEVICE_TYPES.CEILING_LIGHT_PRO;

export type GetDeviceBody = BaseDeviceGetDeviceBody<DeviceType>;

export type StatusBody =
  BaseDeviceWithPowerBrightnessColorTemperatureStatusBody<DeviceType>;

export type CommandBody = any; // TODO: Figure out what this is

export default class SwitchBotCeilingLight extends DeviceWithPowerToggleBrightnessColorTemperature<
  StatusBody,
  CommandBody
> {}
