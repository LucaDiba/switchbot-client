import { BaseDeviceGetDeviceBody } from "../types";
import { DEVICE_TYPES } from "../utils/constant";
import { Device } from "./Device";

type DeviceType =
  | typeof DEVICE_TYPES.HUB
  | typeof DEVICE_TYPES.HUB_PLUS
  | typeof DEVICE_TYPES.HUB_MINI;

export type GetDeviceBody = BaseDeviceGetDeviceBody<DeviceType>;

export type StatusBody = never;

export type CommandBody = never;

export default class SwitchBotHub extends Device {}
