import { BaseDeviceWithPowerStatusBody } from "../types.js";
import { DEVICE_TYPES } from "../utils/constant.js";
import { DeviceWithPower } from "./Device.js";

type StatusBody = BaseDeviceWithPowerStatusBody & {
  deviceType: typeof DEVICE_TYPES.BOT;
};

type CommandBody = {};

export default class SwitchBotPlug extends DeviceWithPower<StatusBody> {}

export type SwitchBotPlugStatusBody = StatusBody;
export type SwitchBotPlugCommandBody = CommandBody;
