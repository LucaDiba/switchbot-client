import {
  BaseDeviceGetDeviceBody,
  BaseDeviceWithPowerBrightnessColorStatusBody,
} from "../types.js";
import { DEVICE_TYPES } from "../utils/constant.js";
import { DeviceWithPowerToggleBrightnessColor } from "./Device.js";

type DeviceType = typeof DEVICE_TYPES.STRIP_LIGHT;

export type GetDeviceBody = BaseDeviceGetDeviceBody<DeviceType>;

export type StatusBody =
  BaseDeviceWithPowerBrightnessColorStatusBody<DeviceType>;

export type CommandBody = any; // TODO: Figure out what this is

export default class SwitchBotStripLight extends DeviceWithPowerToggleBrightnessColor<
  StatusBody,
  CommandBody
> {}
