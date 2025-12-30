import {
  BaseDeviceGetDeviceBody,
  BaseDeviceWithPowerBrightnessColorStatusBody,
} from "../types";
import { DEVICE_TYPES } from "../utils/constant";
import { DeviceWithPowerToggleBrightnessColor } from "./Device";

type DeviceType = typeof DEVICE_TYPES.STRIP_LIGHT;

export type GetDeviceBody = BaseDeviceGetDeviceBody<DeviceType>;

export type StatusBody =
  BaseDeviceWithPowerBrightnessColorStatusBody<DeviceType>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CommandBody = any; // TODO: Figure out what this is

export default class SwitchBotStripLight extends DeviceWithPowerToggleBrightnessColor<
  StatusBody,
  CommandBody
> {}
