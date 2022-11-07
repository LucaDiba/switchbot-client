import { BaseDeviceGetDeviceBody } from "../types.js";
import { DEVICE_TYPES } from "../utils/constant.js";
import { Device } from "./Device.js";

type DeviceType =
  | typeof DEVICE_TYPES.HUB
  | typeof DEVICE_TYPES.HUB_PLUS
  | typeof DEVICE_TYPES.HUB_MINI;

export type GetDeviceBody = BaseDeviceGetDeviceBody<DeviceType>;

export type StatusBody = never;

export type CommandBody = never;

export default class SwitchBotHub extends Device {}
