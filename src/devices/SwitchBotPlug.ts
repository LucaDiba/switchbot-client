import {
  BaseDeviceGetDeviceBody,
  BaseDeviceWithPowerStatusBody,
} from "../types.js";
import { DEVICE_TYPES } from "../utils/constant.js";
import { DeviceWithPower } from "./Device.js";

type DeviceType = typeof DEVICE_TYPES.PLUG;

export type GetDeviceBody = BaseDeviceGetDeviceBody<DeviceType>;

export type StatusBody = BaseDeviceWithPowerStatusBody<DeviceType>;

export type CommandBody = any; // TODO: Figure out what this is

export default class SwitchBotPlug extends DeviceWithPower<
  StatusBody,
  CommandBody
> {}
