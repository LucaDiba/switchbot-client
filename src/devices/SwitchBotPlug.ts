import {
  BaseDeviceGetDeviceBody,
  BaseDeviceWithPowerStatusBody,
} from "../types.js";
import { DEVICE_TYPES } from "../utils/constant.js";
import { DeviceWithPower } from "./Device.js";

type GetDeviceBody = BaseDeviceGetDeviceBody;

type StatusBody = BaseDeviceWithPowerStatusBody & {
  deviceType: typeof DEVICE_TYPES.BOT;
};

type CommandBody = any; // TODO: Figure out what this is

export default class SwitchBotPlug extends DeviceWithPower<
  StatusBody,
  CommandBody
> {}

export type SwitchBotPlugGetDeviceBody = GetDeviceBody;
export type SwitchBotPlugStatusBody = StatusBody;
export type SwitchBotPlugCommandBody = CommandBody;
