import { BaseDeviceWithPowerStatusBody } from "../types.js";
import { DEVICE_TYPES } from "../utils/constant.js";
import { DeviceWithPowerToggle } from "./Device.js";

type StatusBody = BaseDeviceWithPowerStatusBody & {
  deviceType:
    | typeof DEVICE_TYPES.PLUG_MINI_US
    | typeof DEVICE_TYPES.PLUG_MINI_JP;
};

type CommandBody = {};

export default class SwitchBotPlug extends DeviceWithPowerToggle<
  StatusBody,
  CommandBody
> {}

export type SwitchBotPlugStatusBody = StatusBody;
export type SwitchBotPlugCommandBody = CommandBody;
